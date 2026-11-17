// Builds the Martin and Finch logo as pure-path SVGs (no font needed to view them).
const opentype = require('opentype.js'); const fs = require('fs'); const path = require('path');
const [fontFile, outDir] = process.argv.slice(2);
const font = opentype.loadSync(fontFile);
const NAVY = '#0b2a4a', GOLD = '#b08f4e', CREAM = '#f6efe0';

// Monogram, drawn in a 140 x 100 box. N in navy; the F's upright is a finch.
function mark(nColor, fColor, eyeColor, wingColor) {
  return `
  <g fill="${nColor}">
    <path d="M1 2 H23 L77 98 H57 Z"/>
    <path d="M7.5 18 H12.5 V93 H7.5 Z"/>
    <path d="M0 92.5 H21 V98 H0 Z"/>
  </g>
  <mask id="mf-wing" maskUnits="userSpaceOnUse" x="0" y="0" width="140" height="100"><rect width="140" height="100" fill="#fff"/><path d="M79.5 58 C73 49 72.5 35 78.5 24" fill="none" stroke="#000" stroke-width="2.2" stroke-linecap="round"/></mask>
  <g fill="${fColor}" mask="url(#mf-wing)">
    <path d="M80 93 V62 L59 47 C61 30 66 17 75 10 C80 5.5 86 3 92 3 H139 L131 12 C125 16 118 19 108 19 H103 C98 21 96 28 96 36 V93 Z"/>
    <path d="M96 46 H130 L124 59 H96 Z"/>
    <path d="M75.5 92.5 H100.5 V98 H75.5 Z"/>
  </g>
  <circle cx="89" cy="13.5" r="2.4" fill="${eyeColor}"/>`;
}

function word(text, x, y, size) {
  const p = font.getPath(text, x, y, size, { kerning: true });
  return { d: p.toPathData(2), w: font.getAdvanceWidth(text, size, { kerning: true }) };
}

// Wordmark: "Martin and Finch", "and" smaller and gold, baseline at 70 to sit beside the mark
function wordmark(x0, mainColor, andColor) {
  const S = 58, s = 37, base = 70, gap = 9;
  const m = word('Martin', x0, base, S);
  const a = word('and', x0 + m.w + gap, base, s);
  const f = word('Finch', x0 + m.w + gap + a.w + gap, base, S);
  const width = m.w + gap + a.w + gap + f.w;
  return { svg: `<path fill="${mainColor}" d="${m.d}"/><path fill="${andColor}" d="${a.d}"/><path fill="${mainColor}" d="${f.d}"/>`, width };
}

function write(name, w, h, body, bg) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w.toFixed(1)} ${h}" width="${Math.round(w * 4)}" height="${h * 4}" role="img" aria-label="Martin and Finch">${bg ? `<rect width="100%" height="100%" fill="${bg}"/>` : ''}${body}</svg>\n`;
  fs.writeFileSync(path.join(outDir, name), svg);
  console.log(name, Math.round(w), 'x', h);
}

const wmX = 162;
const wm = wordmark(wmX, NAVY, GOLD);
write('logo.svg', wmX + wm.width + 2, 100, mark(NAVY, GOLD, NAVY, '#ffffff') + wm.svg);
const wmR = wordmark(wmX, CREAM, GOLD);
write('logo-reverse.svg', wmX + wmR.width + 2, 100, mark(CREAM, GOLD, NAVY, NAVY) + wmR.svg);
write('mark.svg', 140, 100, mark(NAVY, GOLD, NAVY, '#ffffff'));
write('mark-reverse.svg', 140, 100, mark(CREAM, GOLD, NAVY, NAVY));
// Square: the mark centred on navy, for LinkedIn, social and app icons
fs.writeFileSync(path.join(outDir, 'square.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="800" height="800" role="img" aria-label="Martin and Finch"><rect width="200" height="200" fill="${NAVY}"/><g transform="translate(30 50)">${mark(CREAM, GOLD, NAVY, NAVY)}</g></svg>\n`);
// Favicon: the mark on a rounded navy tile
fs.writeFileSync(path.join(outDir, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><rect width="160" height="160" rx="30" fill="${NAVY}"/><g transform="translate(10 30)">${mark(CREAM, GOLD, NAVY, NAVY)}</g></svg>\n`);
console.log('square.svg, favicon.svg');
