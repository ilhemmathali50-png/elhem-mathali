# ELHEM MATHELI — THE CREATIVE EDITIONS (V8)

Mobile-first PWA portfolio rebuilt around a coherent four-screen experience: animated splash, portrait Welcome, actual intro film, then interactive Art Book.

## What runs live

- `index.html` is a **self-contained production bundle**. The custom CSS, JavaScript, two user-supplied photos and intro film are embedded to prevent missing media from the earlier deployment.
- `manifest.webmanifest`, `app-icon.svg`, `service-worker.js` provide installable PWA behavior.
- Bottom tabs: Éditions, Logos, Vidéo, À propos. Project brief is available from the header or About page.
- 4 case studies: Élya Natura, MÉTALLUX, ForceClean, TrackSolid Pro, each with its own color identity, project goal, design decision, and mini palette.
- Project mockups and labels are not yet uploaded, and are **clearly marked as awaiting originals**. The visual studies in the Logo Atelier are typography-based placeholders, not actual client logo files.
- The brief form prepares a draft for copying. It **does not** send contact messages without a verified recipient.

## Editing / source

For a maintainable copy with separate assets and readable CSS/JS, use the V8 ZIP created in ChatGPT. Older `styles.css` / `app.js` / `content.js` files remain in this repository only as historical material and are not referenced by the current `index.html`.

**Design tokens:** Cherry #A42E48, Lilac #C9B3F4, Ivory #FAF7F2, Graphite #2D2A2E. Fonts: Fraunces, Manrope, Amiri.

## Publishing

GitHub Pages runs on `main`. It is backed by `.github/workflows/pages.yml`.
