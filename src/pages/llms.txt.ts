import type { APIRoute } from 'astro';
import { buildLlmsTxt, PRODUCTION_SITE_ORIGIN } from '../seo/clinicSeo';

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(buildLlmsTxt(PRODUCTION_SITE_ORIGIN), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
