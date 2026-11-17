// Martin and Finch logo, version 3: the monogram is redrawn from the owner's reference image
// (a white finch head with an eye, outlined in gold: the outline arcs over the head into the F's top
// bar, the beak hooks under the bar, and the throat curves down into the F's upright).
// Units: the monogram is 47.3 x 32.5. The wordmark keeps the v2 outlines (source/wordmark.json),
// moved 1.5 units right to keep the reference's gap after the wider monogram.
// Usage: node build-logo.cjs <outdir>
const fs = require('fs'); const path = require('path');
const outDir = process.argv[2] || path.join(__dirname, '..');
const NAVY = '#0b2a4a', GOLD = '#b08f4e', CREAM = '#f6efe0';

const N_DIAGONAL = 'M0.3 0.05H9.3L25.5 25.8V32.5H23L10.5 13.1C6.5 6.9 3.5 2.4 0.3 0.05Z';
const N_STEM = 'M3.6 7.35H4.4L6 9.9V25.5C6 28.5 8 31 10 32.5H0.3C2 31.2 3.6 28.6 3.6 25.5Z';
// Head outline arcing into the top bar, with the upper beak point under the bar
const F_HEAD_BAR = 'M29.8 0.05H47.3L44 5.6H37.9L37.4 6.55C35 4.2 33.2 2.2 30.4 2.2C26 2.2 22.6 8.5 21.5 14L21.1 14.9C20.4 14.4 19.6 13.6 19.75 12.6C20.9 6.5 25 1.6 29.8 0.05Z';
// Lower beak hook, throat, and the upright with its foot
const F_NECK = 'M39.45 7.25C38.8 7.6 38 7.55 37.5 7.6C34.8 8 32.8 10.5 32.8 14.3V28.3C32.8 30.5 33.6 31.6 34.7 32.5H27.35V21.5C27.3 16.5 30.5 9.2 36.2 6.85C37 6.6 37.5 6.4 37.9 5.95C38.4 6.1 39.1 6.7 39.45 7.25Z';
const F_ARM = 'M34.7 16.1H41.4C42.4 16.1 43.3 15.85 44 15.5C43.3 17 42.2 18.8 41.15 20.1L40.6 19.7H34.7Z';
const EYE = { cx: 30.75, cy: 5.55, r: 1.22 };

function mark(n, g, eye) {
  return `
  <g fill="${n}">
    <path d="${N_DIAGONAL}"/>
    <path d="${N_STEM}"/>
  </g>
  <g fill="${g}">
    <path d="${F_HEAD_BAR}"/>
    <path d="${F_NECK}"/>
    <path d="${F_ARM}"/>
  </g>
  <circle cx="${EYE.cx}" cy="${EYE.cy}" r="${EYE.r}" fill="${eye}"/>`;
}

const WM = JSON.parse(fs.readFileSync(path.join(__dirname, 'wordmark.json'), 'utf8'));
const SHIFT = 1.5;
const wordmark = (main, andC) => `
  <g transform="translate(${SHIFT} 0)"><path fill="${main}" d="${WM.martin}"/><path fill="${andC}" d="${WM.and}"/><path fill="${main}" d="${WM.finch}"/></g>`;

function svg(name, vb, w, h, body, bg) {
  fs.writeFileSync(path.join(outDir, name), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}" role="img" aria-label="Martin and Finch">${bg ? `<rect x="-100" y="-100" width="1000" height="1000" fill="${bg}"/>` : ''}${body}</svg>\n`);
}

const W = 172 + SHIFT, H = 33;
svg('logo.svg', `-0.5 -0.5 ${W} ${H}`, W * 12, H * 12, mark(NAVY, GOLD, NAVY) + wordmark(NAVY, GOLD));
svg('logo-reverse.svg', `-0.5 -0.5 ${W} ${H}`, W * 12, H * 12, mark(CREAM, GOLD, CREAM) + wordmark(CREAM, GOLD));
svg('mark.svg', '-0.5 -0.5 48.5 33.5', 582, 402, mark(NAVY, GOLD, NAVY));
svg('mark-reverse.svg', '-0.5 -0.5 48.5 33.5', 582, 402, mark(CREAM, GOLD, CREAM));
svg('square.svg', '-16.35 -24 80 80', 800, 800, mark(CREAM, GOLD, CREAM), NAVY);
fs.writeFileSync(path.join(outDir, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-5.35 -13 58 58"><rect x="-5.35" y="-13" width="58" height="58" rx="11" fill="${NAVY}"/>${mark(CREAM, GOLD, CREAM)}</svg>\n`);
console.log('logo', W, 'x', H);
