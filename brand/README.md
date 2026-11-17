# Brand files

Rebuilt as vectors on 2026-11-17 from the logo the owner started in GoDaddy's logo maker (version 2, traced on the original's pixel grid). Monogram: a tapered navy N, and a gold F drawn as a finch: an outlined head with an eye, a thin curved back ending in a tail, the beak as the F's top bar, the neck flowing into the upright, and the middle arm floating free. The eye is navy on light backgrounds and cream on dark ones. Wordmark: "Martin" and "Finch" in Source Serif 4 Semibold and "and" in Source Serif 4 Regular, condensed to 85%, turned into outlines so no font is needed to view it.

| File | Use |
|---|---|
| `logo.svg` / `logo-2000.png` | Full logo on light backgrounds (PNG is transparent) |
| `logo-reverse.svg` / `logo-reverse-2000.png` | Full logo on navy or dark backgrounds |
| `mark.svg` / `mark-1000.png` | Monogram alone, light backgrounds |
| `mark-reverse.svg` | Monogram alone, dark backgrounds |
| `square.svg` / `square-800.png` | Monogram on navy: LinkedIn logo, social profiles, app icon |
| `favicon.svg` | Browser tab icon |
| `linkedin-profile-banner-1584x396.png` | Personal LinkedIn banner |
| `linkedin-company-cover-1128x191.png` | LinkedIn Company Page cover |

Colours: navy `#0B2A4A`, gold `#B08F4E`, cream `#F6EFE0`.

`source/build-logo.cjs` regenerates the SVGs: `node build-logo.cjs SourceSerif4-Semibold.ttf SourceSerif4-Regular.ttf <outdir>`. It needs `opentype.js`.
