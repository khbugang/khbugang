import type { APIRoute } from 'astro';
import { buildRobotsTxt, PRODUCTION_SITE_ORIGIN } from '../seo/clinicSeo';

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(buildRobotsTxt(PRODUCTION_SITE_ORIGIN), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
