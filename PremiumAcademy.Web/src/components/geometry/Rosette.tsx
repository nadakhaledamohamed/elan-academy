import { circle, ringOfCircles, star, ticks, rays } from '@/lib/geometry';

/** The brand figure: a rosette built from circles and star polygons, its layers turning against each other. */
export function Rosette({ fold = 16, step = 7, id = 'gold', className }: { fold?: number; step?: number; id?: string; className?: string }) {
  const stroke = `url(#${id})`;
  return (
    <svg viewBox="-270 -270 540 540" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--gold-hi)" />
          <stop offset="0.5" stopColor="var(--gold-lo)" />
          <stop offset="1" stopColor="var(--gold-hi)" />
        </linearGradient>
      </defs>
      <g className="spin-slow">
        <path d={ticks(243, 144, 6, 14, 9) + circle(0, 0, 243) + circle(0, 0, 262)} stroke={stroke} strokeWidth={0.8} opacity={0.6} />
      </g>
      <path d={circle(0, 0, 235)} stroke={stroke} strokeWidth={1.4} />
      <g className="spin-slow">
        <path d={ringOfCircles(fold, 117.5, 117.5)} stroke={stroke} strokeWidth={0.9} opacity={0.75} />
      </g>
      <g className="spin-rev">
        <path d={star(235, fold, step) + star(235, fold, step - 2)} stroke={stroke} strokeWidth={1.5} />
      </g>
      <g className="spin-mid">
        <path d={ringOfCircles(8, 58, 58) + star(96, 8, 3)} stroke={stroke} strokeWidth={1.2} />
      </g>
      <circle r={6} fill="var(--gold-hi)" />
    </svg>
  );
}

/** Faint construction lines used as a background layer. */
export function Halo({ className }: { className?: string }) {
  return (
    <svg viewBox="-353 -353 706 706" fill="none" aria-hidden="true" className={className}>
      <g className="spin-slow">
        <path d={ticks(243, 144, 6, 14, 9) + circle(0, 0, 243) + circle(0, 0, 262) + circle(0, 0, 330) + rays(16, 262, 352)} stroke="currentColor" strokeWidth={1} />
      </g>
    </svg>
  );
}
