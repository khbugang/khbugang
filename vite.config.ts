import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import * as esbuild from 'esbuild';
import fs from 'fs';
import type { IncomingMessage } from 'http';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { defineConfig, type Plugin } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function sanitizeOrigin(raw?: string | null): string {
  if (!raw) return '';
  const trimmed = raw.trim().replace(/\/+$/, '');
  if (!trimmed || trimmed === 'MY_APP_URL') return '';
  if (!/^https?:\/\//i.test(trimmed)) return '';
  return trimmed;
}

function resolveRequestOrigin(req?: IncomingMessage): string {
  if (req) {
    const forwardedProto = req.headers['x-forwarded-proto'];
    const forwardedHost = req.headers['x-forwarded-host'];
    const proto = Array.isArray(forwardedProto)
      ? forwardedProto[0]
      : forwardedProto?.split(',')[0]?.trim();
    const host = Array.isArray(forwardedHost)
      ? forwardedHost[0]
      : forwardedHost?.split(',')[0]?.trim() || req.headers.host;
    if (host) {
      return sanitizeOrigin(`${proto || 'https'}://${host}`);
    }
  }
  return sanitizeOrigin(process.env.APP_URL);
}

function injectHtmlSeoAndApp(
  html: string,
  appHtml: string,
  origin: string,
  structuredData: unknown
): string {
  const jsonLdScript = JSON.stringify(structuredData, null, 2).replace(
    /<\/script>/gi,
    '<\\/script>'
  );

  let nextHtml = html
    .replace('<!--app-html-->', appHtml)
    .replace(/%APP_ORIGIN%/g, origin);

  nextHtml = nextHtml.replace(
    /<script id="clinic-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script id="clinic-jsonld" type="application/ld+json">\n${jsonLdScript}\n    </script>`
  );

  return nextHtml;
}

function seoAndPrerenderPlugin(): Plugin {
  return {
    name: 'seo-and-prerender',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = (req.url || '/').split('?')[0];
        if (
          pathname !== '/robots.txt' &&
          pathname !== '/sitemap.xml' &&
          pathname !== '/llms.txt'
        ) {
          return next();
        }

        try {
          const origin = resolveRequestOrigin(req);
          const seoMod = (await server.ssrLoadModule(
            '/src/seo/clinicSeo.ts'
          )) as typeof import('./src/seo/clinicSeo');

          if (pathname === '/robots.txt') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end(seoMod.buildRobotsTxt(origin));
            return;
          }
          if (pathname === '/sitemap.xml') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.end(seoMod.buildSitemapXml(origin));
            return;
          }
          if (pathname === '/llms.txt') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end(seoMod.buildLlmsTxt(origin));
            return;
          }
        } catch (err) {
          return next(err);
        }
      });
    },
    transformIndexHtml: {
      order: 'post',
      async handler(html, ctx) {
        if (!ctx.server) {
          return html;
        }
        const origin =
          resolveRequestOrigin((ctx as { req?: IncomingMessage }).req) ||
          sanitizeOrigin(process.env.APP_URL);
        const entryMod = (await ctx.server.ssrLoadModule(
          '/src/entry-server.tsx'
        )) as { render: () => string };
        const seoMod = (await ctx.server.ssrLoadModule(
          '/src/seo/clinicSeo.ts'
        )) as typeof import('./src/seo/clinicSeo');

        const appHtml = entryMod.render();
        const graph = seoMod.buildStructuredDataGraph(origin);
        return injectHtmlSeoAndApp(html, appHtml, origin, graph);
      },
    },
    async closeBundle(error?: Error): Promise<void> {
      if (error) return;
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.resolve(distDir, 'index.html');
      if (!fs.existsSync(indexPath)) return;

      const tmpDir = path.resolve(__dirname, 'node_modules/.vite-prerender');
      fs.mkdirSync(tmpDir, { recursive: true });

      try {
        const entryOut = path.resolve(tmpDir, 'entry-server.mjs');
        const seoOut = path.resolve(tmpDir, 'clinicSeo.mjs');

        await Promise.all([
          esbuild.build({
            entryPoints: [path.resolve(__dirname, 'src/entry-server.tsx')],
            bundle: true,
            platform: 'node',
            format: 'esm',
            packages: 'external',
            jsx: 'automatic',
            outfile: entryOut,
          }),
          esbuild.build({
            entryPoints: [path.resolve(__dirname, 'src/seo/clinicSeo.ts')],
            bundle: true,
            platform: 'node',
            format: 'esm',
            packages: 'external',
            outfile: seoOut,
          }),
        ]);

        const cacheBust = `?t=${Date.now()}`;
        const entryMod = (await import(
          `${pathToFileURL(entryOut).href}${cacheBust}`
        )) as { render: () => string };
        const seoMod = (await import(
          `${pathToFileURL(seoOut).href}${cacheBust}`
        )) as typeof import('./src/seo/clinicSeo');

        const origin = sanitizeOrigin(process.env.APP_URL);
        const appHtml = entryMod.render();
        const graph = seoMod.buildStructuredDataGraph(origin);
        const rawHtml = fs.readFileSync(indexPath, 'utf-8');
        const finalHtml = injectHtmlSeoAndApp(rawHtml, appHtml, origin, graph);

        fs.writeFileSync(indexPath, finalHtml, 'utf-8');
        fs.writeFileSync(
          path.resolve(distDir, 'robots.txt'),
          seoMod.buildRobotsTxt(origin),
          'utf-8'
        );
        fs.writeFileSync(
          path.resolve(distDir, 'sitemap.xml'),
          seoMod.buildSitemapXml(origin),
          'utf-8'
        );
        fs.writeFileSync(
          path.resolve(distDir, 'llms.txt'),
          seoMod.buildLlmsTxt(origin),
          'utf-8'
        );
      } finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      seoAndPrerenderPlugin(),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
