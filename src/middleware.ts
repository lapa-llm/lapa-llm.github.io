// Every external link opens in a new tab (target="_blank" rel="noopener noreferrer").
// Runs at build time for the static pages (and in dev), so it works without JavaScript
// and nobody has to remember to add the attributes by hand.
import { defineMiddleware } from 'astro:middleware';

const EXTERNAL_A = /<a\b([^>]*?)\shref="(https?:\/\/[^"]+)"([^>]*)>/g;

export const onRequest = defineMiddleware(async (ctx, next) => {
  const res = await next();
  if (!res.headers.get('content-type')?.includes('text/html')) return res;
  const own = ctx.site?.origin;
  const html = (await res.text()).replace(EXTERNAL_A, (tag, before: string, url: string, after: string) => {
    if (/\starget=/.test(before + after) || (own && url.startsWith(own))) return tag;
    return `<a${before} href="${url}"${after} target="_blank" rel="noopener noreferrer">`;
  });
  return new Response(html, { status: res.status, statusText: res.statusText, headers: res.headers });
});
