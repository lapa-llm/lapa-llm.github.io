// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Org site: repo `lapa-llm/lapa-llm.github.io` → https://lapa-llm.github.io/
// For a custom domain later: change `site` and add public/CNAME.
export default defineConfig({
  site: 'https://lapa-llm.github.io',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'uk', locales: { uk: 'uk-UA', en: 'en-US' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
