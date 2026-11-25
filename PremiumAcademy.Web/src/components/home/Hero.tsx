'use client';

import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Rosette, Halo } from '@/components/geometry/Rosette';
import { Magnetic } from '@/components/ui/Magnetic';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const other = locale === 'ar' ? 'en' : 'ar';
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const archY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const haloRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -20]);
  const facts = t.raw('facts') as string[];
  const rise = (i: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: 0.15 + i * 0.12, ease } };

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="container-page grid min-h-[100svh] items-end gap-10 pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:pt-32">
        <div className="relative z-10 flex flex-col gap-7 pb-14 lg:pb-20">
          <motion.p className="label flex items-center gap-4" {...rise(0)}>
            <span className="h-px w-11 bg-brass" aria-hidden="true" />
            {t('eyebrow')}
          </motion.p>
          <motion.h1 className="display-xl max-w-[11ch] lg:max-w-[12ch]" {...rise(1)}>
            {t.rich('title', { em: (c) => <em className="text-accent">{c}</em> })}
          </motion.h1>
          <motion.p className="max-w-md text-lg leading-relaxed text-muted" {...rise(2)}>
            {t('body')}
          </motion.p>
          <motion.div className="mt-2 flex flex-wrap items-center gap-x-9 gap-y-6" {...rise(3)}>
            <Magnetic>
              <Link href="/book" className="btn-primary">{t('primary')}</Link>
            </Magnetic>
            <Link href="/courses" className="link-quiet">{t('secondary')}</Link>
          </motion.div>
          <motion.ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-5 text-sm text-muted" {...rise(4)}>
            {facts.map((f, i) => (
              <li key={f} className="flex items-baseline gap-2">
                <sup className="text-brass">{i + 1}</sup>
                {f}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* The arch: its curve is the rosette's outer circle, so artwork and architecture are one figure. */}
        <motion.div className="relative mx-auto w-full max-w-[470px] self-end" style={{ y: archY }}>
          <motion.div className="pointer-events-none absolute left-1/2 top-0 aspect-square w-[150%] -translate-x-1/2 -translate-y-[16.7%] text-line" style={{ rotate: haloRotate }}>
            <Halo className="h-full w-full" />
          </motion.div>
          <motion.div
            className="relative overflow-hidden rounded-t-full bg-arch"
            style={{ boxShadow: '0 0 0 1px rgb(var(--brass)), 0 0 0 9px rgb(var(--bg)), 0 0 0 10px rgb(var(--brass) / 0.7)' }}
            initial={reduce ? false : { clipPath: 'inset(100% 0 0 0 round 999px 999px 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 0 0)' }}
            transition={{ duration: 1.4, ease }}
          >
            <Rosette rotate={rotate} delay={0.9} className="block w-full" />
            <div className="mx-auto h-16 w-px bg-brass/70" aria-hidden="true" />
            <p
              lang={other}
              dir={other === 'ar' ? 'rtl' : 'ltr'}
              className="whitespace-pre-line px-6 pb-12 pt-5 text-center text-[1.7rem] leading-snug text-on-arch"
              style={{ fontFamily: other === 'ar' ? "'Reem Kufi', sans-serif" : "'Cormorant Garamond', serif", fontStyle: other === 'ar' ? 'normal' : 'italic', fontWeight: other === 'ar' ? 600 : 300 }}
            >
              {t('counterpart')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
