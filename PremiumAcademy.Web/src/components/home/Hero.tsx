'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Gift, Video } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Rosette } from '@/components/geometry/Rosette';
import { Magnetic, ease } from '@/components/motion';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } } };
const item = { hidden: { opacity: 0, y: 30, filter: 'blur(8px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease } } };

export function Hero() {
  const t = useTranslations('hero');
  const trust = useTranslations('trust');
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const facts = t.raw('facts') as string[];
  const trustItems = trust.raw('items') as string[];

  // Scroll parallax: the artwork drifts and fades as the hero leaves.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.86]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Pointer parallax: layers move by different amounts for depth.
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 16 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 16 });
  const near = { x: useTransform(mx, (v) => v * 34), y: useTransform(my, (v) => v * 34) };
  const far = { x: useTransform(mx, (v) => v * -16), y: useTransform(my, (v) => v * -16) };
  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section ref={ref} onPointerMove={onMove} className="on-emerald emerald-panel relative overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="glow pointer-events-none absolute -top-40 end-[-10%] h-[620px] w-[620px] rounded-full" style={{ background: 'radial-gradient(circle, rgb(30 190 140 / 0.35), transparent 65%)' }} aria-hidden="true" />

      <div className="container-page relative grid min-h-[100svh] items-center gap-12 pb-28 pt-32 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={container} initial="hidden" animate="show" style={{ y: copyY, opacity: fade }} className="flex flex-col items-start gap-6">
          <motion.p variants={item} className="glass inline-flex items-center gap-3 rounded-full py-2 pe-5 ps-3 text-[0.85rem] font-medium">
            <span className="ping relative inline-block h-2 w-2 rounded-full bg-accent text-accent" />
            {t('badge')}
          </motion.p>
          <motion.h1 variants={item} className="h-hero max-w-[15ch]">
            {t.rich('title', { em: (c) => <em className="gold-text">{c}</em> })}
          </motion.h1>
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
            <Link href="/courses" className="btn btn-ghost">{t('secondary')}</Link>
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

        {/* Artwork: glow, rotating rosette and two floating glass cards on separate depth layers. */}
        <motion.div className="relative mx-auto aspect-square w-full max-w-[520px]" style={{ y: artY, scale: artScale }} initial={{ opacity: 0, scale: 0.8, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.6, ease, delay: 0.2 }}>
          <div className="glow absolute inset-[8%] rounded-full" style={{ background: 'radial-gradient(circle, rgb(217 169 63 / 0.42), rgb(16 120 92 / 0.25) 45%, transparent 70%)', filter: 'blur(30px)' }} aria-hidden="true" />
          <motion.div className="absolute inset-0" style={far}>
            <div className="absolute inset-[6%] rounded-full border border-white/10" style={{ background: 'radial-gradient(circle at 35% 30%, rgb(255 255 255 / 0.1), rgb(255 255 255 / 0.02) 60%)', WebkitBackdropFilter: 'blur(6px)', backdropFilter: 'blur(6px)' }} />
            <Rosette className="absolute inset-0 h-full w-full" />
          </motion.div>
          <motion.div className="absolute -start-2 top-[12%] sm:-start-8" style={near}>
            <div className="glass float flex items-center gap-3 rounded-2xl p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, var(--gold-hi), var(--gold-lo))', color: '#1b1403' }}><Gift size={20} aria-hidden="true" /></span>
              <span><span className="block text-[0.98rem] font-semibold">{t('card1t')}</span><span className="block text-[0.82rem] text-muted">{t('card1d')}</span></span>
            </div>
          </motion.div>
          <motion.div className="absolute -end-2 bottom-[14%] sm:-end-6" style={near}>
            <div className="glass float-2 flex items-center gap-3 rounded-2xl p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20 text-accent"><Video size={20} aria-hidden="true" /></span>
              <span><span className="block text-[0.98rem] font-semibold" dir="ltr">{t('card2t')}</span><span className="block text-[0.82rem] text-muted">{t('card2d')}</span></span>
            </div>
          </motion.div>
        </motion.div>
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
