'use client';

import { useEffect, useRef, type ReactNode, type PointerEvent } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';

export const ease = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 34, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
};

/** Scroll reveal for a single block. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} variants={item} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} transition={{ delay }}>
      {children}
    </motion.div>
  );
}

/** Parent that reveals its <StaggerItem> children one after another. */
export function Stagger({ children, className, gap = 0.1 }: { children: ReactNode; className?: string; gap?: number }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}>
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/** Counts up to `value` the first time it scrolls into view. */
export function Counter({ value, prefix = '', suffix = '', decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = false; // entrance, hover and pointer motion always run; scroll.tsx handles reduced-motion
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(reduce ? value : 0, value, {
      duration: reduce ? 0 : 1.6,
      ease,
      onUpdate: (v) => (node.textContent = prefix + v.toFixed(decimals) + suffix),
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix, decimals, reduce]);
  return (
    <span ref={ref} dir="ltr">
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Springs smoothly to a changing number (used by the plan builder). */
export function SpringNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const mv = useSpring(value, { stiffness: 140, damping: 20 });
  const text = useTransform(mv, (v) => format(v));
  useEffect(() => mv.set(value), [mv, value]);
  return <motion.span dir="ltr">{text}</motion.span>;
}

/** 3D tilt toward the pointer plus a gold spotlight that follows it. */
export function Tilt({ children, className, max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = false; // entrance, hover and pointer motion always run; scroll.tsx handles reduced-motion
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    e.currentTarget.style.setProperty('--mx', `${px * 100}%`);
    e.currentTarget.style.setProperty('--my', `${py * 100}%`);
    if (reduce || e.pointerType !== 'mouse') return;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
  };
  return (
    <motion.div className={cn('spot', className)} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }} onPointerMove={move} onPointerLeave={leave} whileHover={{ y: -6 }} transition={{ duration: 0.4, ease }}>
      {children}
    </motion.div>
  );
}

/** Pulls its child a few pixels toward the mouse. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const reduce = false; // entrance, hover and pointer motion always run; scroll.tsx handles reduced-motion
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  if (reduce) return <span className="inline-block">{children}</span>;
  return (
    <motion.span
      className="inline-block"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
