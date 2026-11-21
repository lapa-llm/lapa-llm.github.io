# Lapa website

Source of https://lapa-llm.github.io/, the site for [Lapa LLM](https://huggingface.co/lapa-llm), an open language model for Ukrainian.

Built with Astro and Tailwind. Ukrainian is served at `/`, English at `/en/`.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run check    # type check
```

## Edit content

| What | Where |
|---|---|
| Models, datasets, classifiers, news, team, grants, links, code snippets | `src/data/site.ts` |
| Page text (uk and en) | `src/i18n/ui.ts` |
| Page layouts | `src/components/pages/*.astro` |
| Header, footer, `<head>` | `src/layouts/Base.astro` |
| Colors and fonts | `src/styles/global.css` |

- **News:** add an entry at the top of `news` in `src/data/site.ts`.
- **Team photo:** run `scripts/team-photo.sh <image> <slug>` (macOS). It writes a 192×192 JPEG to `public/team/<slug>.jpg`; then set `photo: 'team/<slug>.jpg'` on that person. Without a photo, the card shows initials.
- **Past members:** set `past: true` to add a "past contributor" tag.

## Deploy

The site is deployed to GitHub Pages by `.github/workflows/deploy.yml`, which runs only when started by hand: **Actions → Deploy to GitHub Pages → Run workflow**.

## Credits

- Font: [Fixel](https://fixel.macpaw.com/) by MacPaw, under the SIL Open Font License (`public/fonts/fixel/OFL.txt`).
- Map outlines: [Natural Earth](https://www.naturalearthdata.com/) via `world-atlas`.
