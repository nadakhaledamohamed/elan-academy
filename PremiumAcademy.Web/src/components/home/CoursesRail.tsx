'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { courses } from '@/content/site';
import { Rosette } from '@/components/geometry/Rosette';
import { SectionLabel } from '@/components/ui/SectionLabel';

/** Vertical scrolling drives a horizontal gallery on desktop; on touch screens it is a native swipe row. */
export function CoursesRail() {
  const t = useTranslations('courses');
  const rtl = useLocale() === 'ar';
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const measure = () => {
      const wide = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;
      setPinned(wide && !reduce);
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, rtl ? distance : -distance]);

  return (
    <section ref={section} className="relative" style={{ height: pinned ? `calc(100vh + ${distance}px)` : undefined }}>
      <div className={pinned ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden' : 'py-24'}>
        <div className="container-page flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="III">{t('label')}</SectionLabel>
            <h2 className="display-lg mt-6">{t('title')}</h2>
          </div>
          <Link href="/courses" className="link-quiet">{t('all')}</Link>
        </div>
        <motion.div
          ref={track}
          style={pinned ? { x } : undefined}
          className={
            'mt-12 flex gap-6 px-6 md:px-12 ' + (pinned ? 'w-max' : 'snap-x snap-mandatory overflow-x-auto pb-6')
          }
        >
          {courses.map((c, i) => (
            <Link
              key={c.slug}
              href="/courses"
              className="group relative flex w-[78vw] max-w-[400px] shrink-0 snap-start flex-col border border-line bg-surface/40 p-7 transition-colors duration-500 hover:border-brass"
            >
              <div className="flex items-baseline justify-between text-sm text-muted">
                <span className="font-display text-2xl text-brass">{String(i + 1).padStart(2, '0')}</span>
                <span>{t(`items.${c.slug}.level`)}</span>
              </div>
              <div className="mx-auto my-8 w-[62%] rounded-t-full border border-line p-3 transition-colors duration-500 group-hover:border-brass">
                <Rosette fold={c.fold} step={c.step} tone="ink" className="block w-full text-accent transition-transform duration-[1200ms] ease-elan group-hover:rotate-[30deg]" />
              </div>
              <h3 className="display-md">{t(`items.${c.slug}.name`)}</h3>
              <p className="mt-2 text-sm text-muted">{t(`items.${c.slug}.audience`)}</p>
              <p className="mt-5 flex-1 leading-relaxed text-muted">{t(`items.${c.slug}.desc`)}</p>
              <span className="mt-7 flex items-center gap-2 border-t border-line pt-5 text-sm uppercase tracking-[0.18em]">
                {t('view')}
                <ArrowUpRight size={16} strokeWidth={1.25} aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
