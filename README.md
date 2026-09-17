# Shriya Pant — Cultural Communications

Single-page site, ported from the original Claude artifact to Vite + React.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
npm run preview   # serve the production build
```

## Structure

- `src/App.jsx` — page markup, slideshow (5s autoplay, prev/next, dots) and scroll progress line
- `src/index.css` — all styles, copied verbatim from the original, plus self-hosted `@font-face` rules
- `public/fonts/` — Barlow and Barlow Condensed woff2 files (same files the original embedded)
- `public/images/` — slideshow photos and the grain texture

To add or change slides or clients, edit the `SLIDES` / `CLIENTS` arrays at the top of `src/App.jsx`.

## Deploy to Vercel

Import the repo at vercel.com/new — it auto-detects Vite (build `npm run build`, output `dist`). Or from the CLI: `npx vercel`.
