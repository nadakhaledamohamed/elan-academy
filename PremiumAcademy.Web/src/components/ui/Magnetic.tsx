'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import type { PointerEvent, ReactNode } from 'react';

/** Pulls its child a few pixels toward a mouse pointer. Touch and reduced-motion users get a plain element. */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  if (reduce) return <span className="inline-block">{children}</span>;
  const move = (e: PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.span className="inline-block" style={{ x, y }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.span>
  );
}
