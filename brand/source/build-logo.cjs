// Martin and Finch logo, version 2: traced on the pixel grid of the owner's GoDaddy logo.
// Units are the original screenshot's pixels: the monogram is 46 x 32.5, the wordmark sits
// beside it with 14-unit capitals on a baseline at 24.
const opentype = require('opentype.js'); const fs = require('fs'); const path = require('path');
const [semiFile, regFile, outDir] = process.argv.slice(2);
const semi = opentype.loadSync(semiFile), reg = opentype.loadSync(regFile);
const NAVY = '#0b2a4a', GOLD = '#b08f4e', CREAM = '#f6efe0';

function mark(n, g, eye) {
  return `
  <g fill="${n}">
    <path d="M0 0 H8.9 L23.9 32.5 H21.3 Z"/>
    <path d="M2 7 L4.9 9.6 V27.6 C4.9 30 6.4 31.6 9 32.5 H0 C1.3 31.2 2 29.6 2 27.6 Z"/>
  </g>
  <g fill="${g}">
    <path d="M19.4 14.7 C17.7 13 17.5 10.4 18.6 8.3 C20 5.2 22.8 1.8 27 0 H45.1 L46.3 1.3 L43.5 4.4 L42.9 6.1 H36.9 V6.9 H35 V6.1 C34.4 4.2 33.3 3 31.9 3 H26.6 C24.6 3.9 23.1 5.7 22.5 7.9 C21.8 10.2 21.4 12.6 19.4 14.7 Z"/>
    <path d="M32 6.9 H36.9 C34.4 8.2 31.6 10.2 30.9 13 V29.6 C30.9 31.2 31.8 32 33 32.5 H25 V18.5 C25.3 13.2 28 9.2 32 6.9 Z"/>
    <path d="M33.1 16.1 H42 V19 L40.8 20.2 H33.1 Z"/>
  </g>
  <circle cx="28.6" cy="5.3" r="1.15" fill="${eye}"/>`;
}

// Glyph outlines, condensed horizontally by sx around the word's start
function word(font, text, x, base, size, sx) {
  const p = font.getPath(text, 0, base, size, { kerning: true });
  const t = (X) => (x + X * sx).toFixed(2);
  let d = '';
  for (const c of p.commands) {
    if (c.type === 'M' || c.type === 'L') d += `${c.type}${t(c.x)} ${c.y.toFixed(2)}`;
    else if (c.type === 'C') d += `C${t(c.x1)} ${c.y1.toFixed(2)} ${t(c.x2)} ${c.y2.toFixed(2)} ${t(c.x)} ${c.y.toFixed(2)}`;
    else if (c.type === 'Q') d += `Q${t(c.x1)} ${c.y1.toFixed(2)} ${t(c.x)} ${c.y.toFixed(2)}`;
    else if (c.type === 'Z') d += 'Z';
  }
  return { d, w: font.getAdvanceWidth(text, size, { kerning: true }) * sx };
}

function wordmark(main, andC) {
  const capSize = (f, cap) => cap * f.unitsPerEm / f.tables.os2.sCapHeight;
  const xSize = (f, xh) => xh * f.unitsPerEm / f.tables.os2.sxHeight;
  const S = capSize(semi, 13.6), SX = 0.85;
  const A = xSize(reg, 8.2), AX = 0.86;
  const base = 24, x0 = 51;
  const m = word(semi, 'Martin', x0, base, S, SX);
  const a = word(reg, 'and', x0 + m.w + 3.2, base, A, AX);
  const f = word(semi, 'Finch', x0 + m.w + 3.2 + a.w + 3.6, base, S, SX);
  return { svg: `<path fill="${main}" d="${m.d}"/><path fill="${andC}" d="${a.d}"/><path fill="${main}" d="${f.d}"/>`, end: x0 + m.w + 3.2 + a.w + 3.6 + f.w };
}

function svg(name, vb, w, h, body, bg) {
  fs.writeFileSync(path.join(outDir, name), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}" role="img" aria-label="Martin and Finch">${bg ? `<rect x="-100" y="-100" width="1000" height="1000" fill="${bg}"/>` : ''}${body}</svg>\n`);
}

const wm = wordmark(NAVY, GOLD), wmR = wordmark(CREAM, GOLD);
const W = Math.ceil(wm.end + 1), H = 33;
svg('logo.svg', `-0.5 -0.5 ${W} ${H}`, W * 12, H * 12, mark(NAVY, GOLD, NAVY) + wm.svg);
svg('logo-reverse.svg', `-0.5 -0.5 ${W} ${H}`, W * 12, H * 12, mark(CREAM, GOLD, CREAM) + wmR.svg);
svg('mark.svg', '-0.5 -0.5 47.5 33.5', 570, 402, mark(NAVY, GOLD, NAVY));
svg('mark-reverse.svg', '-0.5 -0.5 47.5 33.5', 570, 402, mark(CREAM, GOLD, CREAM));
svg('square.svg', '-17 -24 80 80', 800, 800, mark(CREAM, GOLD, CREAM), NAVY);
fs.writeFileSync(path.join(outDir, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -13 58 58"><rect x="-6" y="-13" width="58" height="58" rx="11" fill="${NAVY}"/>${mark(CREAM, GOLD, CREAM)}</svg>\n`);
console.log('logo', W, 'x', H, 'wordmark ends at', wm.end.toFixed(1), '(original 167)');
