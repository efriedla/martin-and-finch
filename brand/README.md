# Brand files

Version 3 (2026-11-17): the monogram is redrawn as vectors from the owner's reference image. Monogram: a navy N with a flared stem and a curved top-left serif, and a gold F drawn as a finch: a white head with an eye, outlined by a gold arc that runs over the head into the F's top bar; a small hooked beak under the bar; the throat curving down into the upright; and a free middle arm with a flicked tip. The eye is navy on light backgrounds and cream on dark ones. Wordmark: "Martin" and "Finch" in Source Serif 4 Semibold and "and" in Source Serif 4 Regular, condensed to 85%, kept as outlines so no font is needed to view it.

| File | Use |
|---|---|
| `logo.svg` / `logo-2000.png` | Full logo on light backgrounds (PNG is transparent) |
| `logo-reverse.svg` / `logo-reverse-2000.png` | Full logo on navy or dark backgrounds |
| `logo-animated.svg` / `logo-animated-reverse.svg` | Site header: "Click into place" (the pieces settle in, the finch blinks, the words rise; about 1.7 s, once per page load). The animation is inside the SVG, so a plain `<img>` plays it; Reduce Motion shows the still logo |
| `mark.svg` / `mark-1000.png` | Monogram alone, light backgrounds |
| `mark-reverse.svg` | Monogram alone, dark backgrounds |
| `square.svg` / `square-800.png` | Monogram on navy: LinkedIn logo, social profiles, app icon |
| `favicon.svg` | Browser tab icon |
| `linkedin-profile-banner-1584x396.png` | Personal LinkedIn banner |
| `linkedin-company-cover-1128x191.png` | LinkedIn Company Page cover |

Colours: navy `#0B2A4A`, gold `#B08F4E`, cream `#F6EFE0`.

`source/build-logo.cjs` regenerates the SVGs into `brand/`: `node brand/source/build-logo.cjs`. It needs nothing installed. The wordmark outlines are frozen in `source/wordmark.json`, because newer Source Serif 4 releases set the words wider. The PNGs were exported from the SVGs with headless Chrome. The LinkedIn banners have no source file: the new logo was painted over the old one in place.
