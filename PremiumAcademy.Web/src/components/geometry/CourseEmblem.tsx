import type { CourseSlug } from '@/content/site';
import { circle, star } from '@/lib/geometry';

/** One distinct, animated artwork per subject, drawn in the tile's own light colour. */
export function CourseEmblem({ slug, className }: { slug: CourseSlug; className?: string }) {
  const common = { viewBox: '0 0 240 200', fill: 'none', 'aria-hidden': true, className } as const;
  const line = 'currentColor';
  const gold = 'var(--gold-hi)';

  if (slug === 'foundation') {
    // First letters on ruled writing lines.
    return (
      <svg {...common}>
        {[52, 100, 148].map((y) => (
          <line key={y} x1="16" x2="224" y1={y} y2={y} stroke={line} strokeOpacity="0.35" strokeDasharray="2 6" />
        ))}
        <line x1="16" x2="224" y1="148" y2="148" stroke={gold} strokeWidth="1.5" />
        <text x="120" y="146" textAnchor="middle" fontSize="112" fill={line} style={{ fontFamily: "'Alexandria', sans-serif", fontWeight: 700 }} direction="rtl">
          أ ب ت
        </text>
        <circle cx="34" cy="174" r="5" fill={gold} className="breathe" />
      </svg>
    );
  }
  if (slug === 'tajweed') {
    // A voice: bars that rise and fall like recitation.
    const bars = [34, 58, 92, 130, 96, 150, 110, 70, 124, 84, 52, 30];
    return (
      <svg {...common}>
        <line x1="12" x2="228" y1="100" y2="100" stroke={line} strokeOpacity="0.35" />
        {bars.map((h, i) => (
          <rect key={i} className="bar" style={{ animationDelay: `${i * 0.13}s` }} x={22 + i * 17} y={100 - h / 2} width="7" height={h} rx="3.5" fill={i % 4 === 1 ? gold : line} />
        ))}
      </svg>
    );
  }
  if (slug === 'hifz') {
    // Nested arches: the same passage, held more deeply with each return.
    const arches = [0, 1, 2, 3, 4, 5];
    return (
      <svg {...common}>
        {arches.map((i) => {
          const r = 96 - i * 15;
          return (
            <path key={i} className="breathe" style={{ animationDelay: `${i * 0.35}s` }} d={`M${120 - r} 188V${96 + i * 4}a${r} ${r} 0 0 1 ${2 * r} 0V188`} stroke={i === 5 ? gold : line} strokeWidth={i === 5 ? 2.5 : 1.5} />
          );
        })}
        <line x1="10" x2="230" y1="188" y2="188" stroke={line} strokeOpacity="0.5" />
      </svg>
    );
  }
  if (slug === 'arabic') {
    // One letter measured with the calligrapher's rhombic dots.
    return (
      <svg {...common}>
        <circle cx="132" cy="100" r="84" stroke={line} strokeOpacity="0.4" />
        <g className="spin-slow">
          <circle cx="132" cy="100" r="96" stroke={line} strokeOpacity="0.4" strokeDasharray="1 9" />
        </g>
        <text x="132" y="150" textAnchor="middle" fontSize="150" fill={line} style={{ fontFamily: "'Alexandria', sans-serif", fontWeight: 700 }}>
          ع
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} className="breathe" style={{ animationDelay: `${i * 0.3}s` }} x="14" y={34 + i * 30} width="14" height="14" transform={`rotate(45 21 ${41 + i * 30})`} fill={gold} />
        ))}
      </svg>
    );
  }
  // islamic-studies: the eight-pointed star, turning.
  return (
    <svg {...common} viewBox="-120 -100 240 200">
      <circle r="92" stroke={line} strokeOpacity="0.4" />
      <g className="spin-mid">
        <path d={star(88, 8, 3)} stroke={line} strokeWidth="1.5" />
      </g>
      <g className="spin-rev">
        <path d={star(88, 8, 2)} stroke={gold} strokeWidth="2.5" />
        <path d={circle(0, 0, 36)} stroke={gold} strokeWidth="1.5" />
      </g>
      <circle r="5" fill={gold} />
    </svg>
  );
}
