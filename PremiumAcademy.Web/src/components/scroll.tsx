'use client';

import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/cn';
import { ease } from './motion';

gsap.registerPlugin(ScrollTrigger);

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in step. Off for reduced motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduce]);
  return <>{children}</>;
}

/** A thin gold bar across the top that fills as the page is read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left rtl:origin-right"
      style={{ scaleX, background: 'linear-gradient(90deg, var(--gold-lo), var(--gold-hi), var(--gold-mid))', boxShadow: '0 0 14px rgb(217 169 63 / 0.7)' }}
    />
  );
}

/** GSAP ScrollTrigger scrub: tweens `ref` between two states as `trigger` (default: itself) crosses the viewport. */
export function useScrub<T extends Element>(from: gsap.TweenVars, to: gsap.TweenVars, opts: { trigger?: RefObject<Element | null>; start?: string; end?: string } = {}) {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, from, {
        ...to,
        ease: 'none',
        scrollTrigger: { trigger: opts.trigger?.current ?? ref.current, start: opts.start ?? 'top bottom', end: opts.end ?? 'bottom top', scrub: 0.6 },
      });
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);
  return ref;
}

/** Parallax wrapper built on useScrub: the child drifts vertically while its section scrolls past. */
export function Parallax({ children, className, distance = 40 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useScrub<HTMLDivElement>({ y: distance }, { y: -distance });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Headline that rises word by word from behind a mask when it enters the viewport. */
export function RevealText({ text, as: Tag = 'h2', className }: { text: string; as?: 'h1' | 'h2' | 'h3' | 'p'; className?: string }) {
  const words = text.split(' ');
  const MotionTag = motion[Tag];
  return (
    <MotionTag className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-70px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className={cn('inline-block overflow-hidden pb-[0.14em] align-bottom', i < words.length - 1 && 'me-[0.26em]')}>
          <motion.span className="inline-block" variants={{ hidden: { y: '110%', rotate: 4 }, show: { y: 0, rotate: 0, transition: { duration: 0.85, ease } } }}>
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
