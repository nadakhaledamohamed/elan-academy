'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Gift, Video } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Rosette } from '@/components/geometry/Rosette';
import { Magnetic, ease } from '@/components/motion';
import { useScrub } from '@/components/scroll';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } } };
const item = { hidden: { opacity: 0, y: 30, filter: 'blur(8px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease } } };
const word = { hidden: { y: '110%', rotate: 5 }, show: { y: 0, rotate: 0, transition: { duration: 0.95, ease } } };

// Fixed positions so the sparkles are identical on server and client.
const sparks = [
  [8, 22, 0], [18, 78, 0.6], [30, 6, 1.4], [44, 94, 2.1], [58, 3, 0.9], [72, 90, 1.7],
  [86, 16, 2.6], [94, 58, 0.3], [4, 54, 1.9], [66, 12, 3.0], [24, 92, 2.4], [90, 82, 1.1],
] as const;

export function Hero() {
  const t = useTranslations('hero');
  const trust = useTranslations('trust');
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const facts = t.raw('facts') as string[];
  const trustItems = trust.raw('items') as string[];
  // The title carries one <em>…</em> span, which becomes the gold part.
  const [before = '', emphasis = ''] = (t.raw('title') as string).split(/<\/?em>/);
  const plain = before + emphasis;

  // Framer Motion: copy drifts and fades as the hero leaves.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // GSAP ScrollTrigger: the whole figure sinks, shrinks and turns with the scroll position.
  const art = useScrub<HTMLDivElement>({ y: 0, scale: 1, rotate: 0 }, { y: 150, scale: 0.82, rotate: 40 }, { trigger: ref, start: 'top top', end: 'bottom top' });

  // Pointer: three depth layers, a 3D tilt and a light that follows the mouse.
  const mx = useSpring(useMotionValue(0), { stiffness: 55, damping: 15 });
  const my = useSpring(useMotionValue(0), { stiffness: 55, damping: 15 });
  const layer = (k: number) => ({ x: useTransform(mx, (v) => v * k), y: useTransform(my, (v) => v * k) });
  const back = layer(-22);
  const mid = layer(14);
  const front = layer(46);
  const rotateY = useTransform(mx, (v) => v * 16);
  const rotateX = useTransform(my, (v) => v * -16);
  const lx = useTransform(mx, (v) => 50 + v * 70);
  const ly = useTransform(my, (v) => 50 + v * 70);
  const light = useMotionTemplate`radial-gradient(260px circle at ${lx}% ${ly}%, rgb(246 222 158 / 0.5), transparent 70%)`;
  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="hero-panel relative overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="glow pointer-events-none absolute -top-40 end-[-10%] h-[620px] w-[620px] rounded-full" style={{ background: 'radial-gradient(circle, rgb(30 190 140 / 0.3), transparent 65%)' }} aria-hidden="true" />

      <div className="container-page relative grid min-h-[100svh] items-center gap-12 pb-28 pt-32 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={container} initial="hidden" animate="show" style={{ y: copyY, opacity: fade }} className="flex flex-col items-start gap-6">
          <motion.p variants={item} className="glass inline-flex items-center gap-3 rounded-full py-2 pe-5 ps-3 text-[0.85rem] font-medium">
            <span className="ping relative inline-block h-2 w-2 rounded-full bg-accent text-accent" />
            {t('badge')}
          </motion.p>
          {/* Headline rises word by word from behind a mask. */}
          <h1 className="h-hero max-w-[15ch]" aria-label={plain}>
            <Words text={before} />
            <Words text={emphasis} gold />
          </h1>
          <motion.p variants={item} className="lead max-w-lg !text-[1.12rem]">
            {t('body')}
          </motion.p>
          <motion.div variants={item} className="mt-2 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link href="/book" className="btn btn-gold">
                {t('primary')}
                <ArrowRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.18}>
              <Link href="/courses" className="btn btn-ghost">{t('secondary')}</Link>
            </Magnetic>
          </motion.div>
          <motion.ul variants={item} className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[0.92rem] text-muted">
            {facts.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check size={16} className="text-accent" aria-hidden="true" />
                {f}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* The living figure */}
        <div ref={art} className="relative mx-auto aspect-square w-full max-w-[520px]">
          <motion.div className="absolute inset-0" initial={{ opacity: 0, scale: 0.7, rotate: -30 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.8, ease, delay: 0.2 }}>
            {/* breathing glow and expanding rings */}
            <div className="glow absolute inset-[4%] rounded-full" style={{ background: 'radial-gradient(circle, rgb(217 169 63 / 0.5), rgb(16 120 92 / 0.28) 45%, transparent 70%)', filter: 'blur(34px)' }} aria-hidden="true" />
            <div className="ring absolute inset-[6%] rounded-full border border-gold/50" aria-hidden="true" />
            <div className="ring absolute inset-[6%] rounded-full border border-gold/40" style={{ animationDelay: '2.2s' }} aria-hidden="true" />

            {/* back layer: sparkles */}
            <motion.div className="absolute inset-[-6%]" style={back} aria-hidden="true">
              {sparks.map(([x, y, d], i) => (
                <span key={i} className="twinkle absolute h-1.5 w-1.5 rounded-full" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s`, background: 'var(--gt1)', boxShadow: '0 0 10px 2px rgb(246 222 158 / 0.7)' }} />
              ))}
            </motion.div>

            {/* middle layer: glass disc and the rosette, tilting in 3D toward the pointer */}
            <motion.div className="absolute inset-0" style={{ ...mid, rotateX, rotateY, transformPerspective: 1100 }}>
              <div className="absolute inset-[6%] rounded-full border" style={{ background: 'var(--orb)', borderColor: 'rgb(var(--line) / var(--line-a))', WebkitBackdropFilter: 'blur(6px)', backdropFilter: 'blur(6px)' }} />
              <motion.div className="absolute inset-[6%] rounded-full mix-blend-screen" style={{ background: light }} aria-hidden="true" />
              <Rosette className="absolute inset-0 h-full w-full" />
              {/* satellites orbiting the figure */}
              <div className="orbit absolute inset-[1%]" aria-hidden="true">
                <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'var(--gold-hi)', boxShadow: '0 0 18px 4px rgb(246 222 158 / 0.8)' }} />
              </div>
              <div className="orbit-rev absolute inset-[13%]" aria-hidden="true">
                <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent" style={{ boxShadow: '0 0 14px 3px rgb(70 208 162 / 0.8)' }} />
              </div>
            </motion.div>

            {/* front layer: floating glass cards */}
            <motion.div className="absolute -start-2 top-[12%] sm:-start-8" style={front}>
              <div className="glass float flex items-center gap-3 rounded-2xl p-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, var(--gold-hi), var(--gold-lo))', color: '#1b1403' }}><Gift size={20} aria-hidden="true" /></span>
                <span><span className="block text-[0.98rem] font-semibold">{t('card1t')}</span><span className="block text-[0.82rem] text-muted">{t('card1d')}</span></span>
              </div>
            </motion.div>
            <motion.div className="absolute -end-2 bottom-[14%] sm:-end-6" style={front}>
              <div className="glass float-2 flex items-center gap-3 rounded-2xl p-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20 text-accent"><Video size={20} aria-hidden="true" /></span>
                <span><span className="block text-[0.98rem] font-semibold" dir="ltr">{t('card2t')}</span><span className="block text-[0.82rem] text-muted">{t('card2d')}</span></span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Trust bar */}
      <motion.div className="container-page relative -mt-16 pb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1, ease }}>
        <ul className="glass grid gap-x-6 gap-y-3 rounded-3xl px-6 py-5 text-[0.9rem] sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((x) => (
            <li key={x} className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"><Check size={14} aria-hidden="true" /></span>
              {x}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

/** Splits text into masked words that rise in sequence. */
function Words({ text, gold }: { text: string; gold?: boolean }) {
  const parts = text.split(' ').filter(Boolean);
  return (
    <motion.span initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: gold ? 0.75 : 0.3 } } }} aria-hidden="true">
      {parts.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.14em] align-bottom me-[0.24em]">
          <motion.span variants={word} className={gold ? 'gold-text inline-block' : 'inline-block'}>
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
