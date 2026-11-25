'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';

type Item = { t: string; d: string };

function Line({ item, i, n, progress }: { item: Item; i: number; n: number; progress: MotionValue<number> }) {
  const a = i / n;
  const b = (i + 1) / n;
  // Each line fades in after the previous one has gone, so two never overlap.
  // Offsets stay inside 0..1 and strictly increase: scroll-linked animations reject anything else.
  const first = i === 0;
  const last = i === n - 1;
  const range = [a, a + 0.06, b - 0.09, b - 0.03].map((v) => Math.min(1, Math.max(0, v)));
  if (first) range[1] = 0.01;
  if (last) { range[2] = 0.99; range[3] = 1; }
  const opacity = useTransform(progress, range, [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const y = useTransform(progress, range, [first ? 0 : 40, 0, 0, last ? 0 : -40]);
  return (
    <motion.div className="absolute inset-0 flex flex-col justify-center" style={{ opacity, y }}>
      <p className="font-display text-[clamp(3rem,9vw,8rem)] font-light leading-none tracking-[-0.02em]">{item.t}</p>
      <p className="mt-8 max-w-md text-lg text-on-arch/80">{item.d}</p>
    </motion.div>
  );
}

/** A pinned statement that changes three times while a compass arc sweeps a full circle. */
export function Philosophy() {
  const t = useTranslations('philosophy');
  const items = t.raw('items') as Item[];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const sweep = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  if (reduce) {
    return (
      <section className="bg-arch py-28 text-on-arch">
        <div className="container-page flex flex-col gap-14">
          <p className="label !text-on-arch/70">{t('label')}</p>
          {items.map((it) => (
            <div key={it.t}>
              <h2 className="display-lg">{it.t}</h2>
              <p className="mt-4 max-w-md text-lg text-on-arch/80">{it.d}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[320vh] bg-arch text-on-arch">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <svg viewBox="-260 -260 520 520" fill="none" aria-hidden="true" className="pointer-events-none absolute -end-[18vw] top-1/2 w-[min(90vh,80vw)] -translate-y-1/2">
          <circle r="250" stroke="rgb(var(--on-arch) / 0.14)" />
          <circle r="190" stroke="rgb(var(--on-arch) / 0.1)" />
          <motion.circle r="250" stroke="var(--brass-hi)" strokeWidth="1.5" style={{ pathLength: sweep, rotate: -90 }} />
          <circle r="4" fill="rgb(var(--clay))" />
        </svg>
        <div className="container-page relative">
          <div className="[&_.label]:!text-on-arch/70">
            <SectionLabel index="II">{t('label')}</SectionLabel>
          </div>
          <div className="relative mt-6 h-[60vh]">
            {items.map((it, i) => (
              <Line key={it.t} item={it} i={i} n={items.length} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
