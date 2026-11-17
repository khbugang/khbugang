import type { APIRoute } from 'astro';
import { buildSitemapXml, PRODUCTION_SITE_ORIGIN } from '../seo/clinicSeo';

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(buildSitemapXml(PRODUCTION_SITE_ORIGIN), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
