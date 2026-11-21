# Lapa: website

The site for **Lapa**, open AI for the Ukrainian language. It's built with Astro and Tailwind and served from GitHub Pages at https://lapa-llm.github.io/.

Ukrainian is the default language, served at `/`. English lives at `/en/`.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Edit content

| What | Where |
|---|---|
| Models, datasets, classifiers, news, team, grants, links, code snippets | `src/data/site.ts` |
| All page text (uk + en) | `src/i18n/ui.ts` |
| Page layouts | `src/components/pages/*.astro` |
| Research papers | index cards in `pages/Research.astro`; one page per paper: `ResearchLapa.astro` (`/research/lapa/`), `ResearchMatt.astro` (`/research/matt/`) |
| Header, footer, `<head>` | `src/layouts/Base.astro` |
| Colors and fonts | `src/styles/global.css` |

To add a news item, add an entry at the top of `news` in `src/data/site.ts`.

To add a team photo, run `scripts/team-photo.sh <image> <slug>` (macOS). It writes a square 192×192 JPEG to `public/team/<slug>.jpg`; then set `photo: 'team/<slug>.jpg'` on that person in `team`. Without a photo, the card shows a small loss landscape with initials. The team map places people by their affiliation's city (`orgCity` in `src/data/site.ts`); set `city` on a person to override it. Borders come from Natural Earth via `world-atlas`, drawn at build time, with Crimea shown as part of Ukraine. Hide someone for now with `hidden: true`. Mark someone who has left with `past: true`: their card gets a small "past contributor" tag.

## Deploy (not live until you choose)

Pushing code does **not** publish anything. The workflow `.github/workflows/deploy.yml` only runs when started by hand.

To go live:
1. Make sure the repo is named **`lapa-llm.github.io`** in the `lapa-llm` org. That name gives the URL https://lapa-llm.github.io/; any other name puts the site under a sub-path, and `site`/`base` in `astro.config.mjs` would need updating.
2. Go to **Settings → Pages → Source** and choose **GitHub Actions**.
3. Go to **Actions → Deploy to GitHub Pages → Run workflow**.

To auto-deploy on every push to `main` later, add `push: { branches: [main] }` under `on:` in the workflow.

For a custom domain: add `public/CNAME` containing the domain, change `site` in `astro.config.mjs`, and set up DNS as described in the GitHub Pages docs.

## Brand

- **Colours:** a black background with the Lapa logo's sky blue (`--brand: #1c8dde`). Tokens are in `src/styles/global.css`.
- **Wordmark:** `src/components/Wordmark.astro` ("LAPA / LANGUAGE MODEL").
- **Type:** Fixel by MacPaw, self-hosted in `public/fonts/fixel/` under the SIL Open Font License.
- **Loss landscape:** `src/components/ContourField.astro` together with `src/lib/contours.ts`. It's a small, subtle game.
  - **Terrain:** a new random map on every page load. One global minimum, 1–3 side valleys, 6–8 little dips, 2–3 peaks and a ravine, with everything sloping toward the minimum. Before a map is shown, five quick test descents run in the background, and the map is rerolled (up to 12 times, about 30 ms in total) until at least two of them reach the global minimum.
  - **The run:** one optimizer at a time, using SGD with momentum and a little noise, with a fading trail and a readout. It shows `loss …` while descending, `local min · …` when stuck in a side valley, and `✓ converged · …` at the bottom.
  - **You:** the cursor raises a hill and leaves a fading wake that ripples the terrain. Push a stuck run out of a side valley and, if it then reaches the bottom, that counts as `rescued`. Clicking empty space restarts the run from that spot. A corner hint turns into a score (`runs · converged · rescued`).
  - **Lava motion (`lava`):** hills and valleys slowly rise, sink, drift and swell like wax in a lava lamp, in calm 30–55 s cycles. The global minimum stays fixed. This motion eases to a stop while the cursor is moving over the landscape and resumes about 1 s after it stops, so the two effects never overlap.
  - **Where it's used:** the home hero, the inner page headers and the 404 page. Animation only runs while visible, and it stops for visitors who have reduced motion turned on.
