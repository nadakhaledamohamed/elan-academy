'use client';

import { useId, useMemo } from 'react';
import { motion, useReducedMotion, type MotionValue } from 'framer-motion';
import { circle, ringOfCircles, star, ticks, rays } from '@/lib/geometry';

type Props = {
  /** Number of divisions of the circle. */
  fold?: number;
  /** Star polygon step; must be coprime with `fold`. */
  step?: number;
  /** 1 circle · 2 + rosette · 3 + stars · 4 + inner figure. Used by the Method section. */
  stage?: 1 | 2 | 3 | 4;
  /** 'metal' uses the brass gradient (on the arch); 'ink' uses the current text colour. */
  tone?: 'metal' | 'ink';
  rotate?: MotionValue<number>;
  className?: string;
  delay?: number;
};

/** A rosette constructed from overlapping circles and star polygons, drawn on entry. */
export function Rosette({ fold = 16, step = 7, stage = 4, tone = 'metal', rotate, className, delay = 0 }: Props) {
  const id = useId();
  const reduce = useReducedMotion();
  const d = useMemo(
    () => ({
      outer: circle(0, 0, 235),
      ros: ringOfCircles(fold, 117.5, 117.5),
      stars: star(235, fold, step) + (fold >= 10 ? star(235, fold, step - 2) : ''),
      inner: ringOfCircles(Math.max(4, fold / 2), 58, 58) + star(96, 8, 3),
    }),
    [fold, step],
  );
  const stroke = tone === 'metal' ? `url(#${id})` : 'currentColor';
  const draw = (order: number, duration: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: '-10% 0px' },
          transition: { duration, delay: delay + order * 0.35, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <svg viewBox="-238 -238 476 476" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brass-hi)" />
          <stop offset="0.45" stopColor="var(--brass-lo)" />
          <stop offset="0.7" stopColor="var(--brass-hi)" />
          <stop offset="1" stopColor="var(--brass-lo)" />
        </linearGradient>
      </defs>
      <motion.path d={d.outer} stroke={stroke} strokeWidth={1} {...draw(0, 1.2)} />
      {stage >= 2 && <motion.path d={d.ros} stroke={stroke} strokeWidth={0.9} {...draw(1, 2.6)} />}
      {stage >= 3 && (
        <motion.g style={rotate ? { rotate } : undefined}>
          <motion.path d={d.stars} stroke={stroke} strokeWidth={1.4} {...draw(2, 2.2)} />
        </motion.g>
      )}
      {stage >= 4 && <motion.path d={d.inner} stroke={stroke} strokeWidth={1} opacity={0.85} {...draw(3, 1.8)} />}
      <circle r={4.5} fill="rgb(var(--clay))" />
    </svg>
  );
}

/** The faint construction lines that continue outside the arch: scale ring, rays and outer circle. */
export function Halo({ className }: { className?: string }) {
  const d = useMemo(
    () => ticks(243, 144, 6, 14, 9) + circle(0, 0, 243) + circle(0, 0, 262) + circle(0, 0, 330) + rays(16, 262, 352),
    [],
  );
  return (
    <svg viewBox="-353 -353 706 706" fill="none" aria-hidden="true" className={className}>
      <path d={d} stroke="currentColor" strokeWidth={1} />
    </svg>
  );
}
