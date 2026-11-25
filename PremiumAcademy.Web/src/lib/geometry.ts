// Compass-and-straightedge figures as SVG path data. Everything on the site
// that looks drawn is generated here, so there are no image assets to load.
const f = (n: number) => n.toFixed(1);
const TAU = Math.PI * 2;

export const circle = (cx: number, cy: number, r: number) =>
  `M${f(cx - r)} ${f(cy)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

/** n circles of radius r whose centres sit on a ring of radius R. */
export const ringOfCircles = (n: number, R: number, r: number) =>
  Array.from({ length: n }, (_, i) =>
    circle(R * Math.cos((TAU * i) / n - Math.PI / 2), R * Math.sin((TAU * i) / n - Math.PI / 2), r),
  ).join('');

/** Star polygon {n/k}: join every k-th of n points on a circle. */
export const star = (r: number, n: number, k: number) => {
  const pts = Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (TAU * ((i * k) % n)) / n;
    return `${f(r * Math.cos(a))} ${f(r * Math.sin(a))}`;
  });
  return `M${pts.join('L')}Z`;
};

/** Graduated scale: n ticks outward from radius r, every `every`-th one long. */
export const ticks = (r: number, n: number, short: number, long: number, every: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = (TAU * i) / n;
    const l = i % every === 0 ? long : short;
    return `M${f(r * Math.cos(a))} ${f(r * Math.sin(a))}L${f((r + l) * Math.cos(a))} ${f((r + l) * Math.sin(a))}`;
  }).join('');

export const rays = (n: number, r1: number, r2: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = (TAU * i) / n;
    return `M${f(r1 * Math.cos(a))} ${f(r1 * Math.sin(a))}L${f(r2 * Math.cos(a))} ${f(r2 * Math.sin(a))}`;
  }).join('');
