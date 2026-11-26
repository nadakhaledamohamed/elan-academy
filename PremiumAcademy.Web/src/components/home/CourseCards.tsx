'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { courses } from '@/content/site';
import { circle, star } from '@/lib/geometry';
import { Halo } from '@/components/geometry/Rosette';
import { Reveal, ease } from '@/components/motion';
import { RevealText, Parallax } from '@/components/scroll';

/** Fine gold corner bracket, mirrored into each corner it is used in. */
function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className={className}>
      <path d="M2 118V2h116" stroke="#b8862b" strokeWidth="1.2" />
      <path d="M10 70V10h60M10 30h20V10M22 22h16v16H22z" stroke="#b8862b" strokeWidth="1" opacity="0.8" />
    </svg>
  );
}

/** Small rosette used on the closing rule. */
function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="-20 -20 40 40" fill="none" aria-hidden="true" className={className}>
      <path d={star(17, 8, 3) + circle(0, 0, 6)} stroke="#b8862b" strokeWidth="1.1" />
    </svg>
  );
}

/**
 * Courses as a library display: a parchment section with one photographed still life per course.
 * Cards rise in sequence; on hover a card lifts, its picture eases closer and the link underlines.
 */
export function CourseCards() {
  const t = useTranslations('courses');
  const reduce = useReducedMotion();
  return (
    <section className="library section mt-20 md:mt-28" id="courses">
      <Corner className="pointer-events-none absolute start-5 top-5 hidden h-24 w-24 md:block rtl:-scale-x-100" />
      <Corner className="pointer-events-none absolute bottom-5 start-5 hidden h-24 w-24 -scale-y-100 md:block rtl:-scale-x-100" />
      <Halo className="pointer-events-none absolute -end-40 -top-44 w-[640px] text-[#b8862b]/25" />

      <div className="container-page relative !max-w-[1320px]">
        <div className="flex max-w-3xl flex-col gap-5">
          <Reveal>
            <p className="text-[0.82rem] font-semibold uppercase tracking-[0.2em] text-[#8a6114]">{t('label')}</p>
            <span className="mt-3 block h-px w-14 bg-[#b8862b]" aria-hidden="true" />
          </Reveal>
          <RevealText text={t('title')} className="serif text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.08] text-[#12382c]" />
          <Reveal delay={0.15}><p className="max-w-2xl text-[1.08rem] leading-[1.7] text-[#3a4338]">{t('lead')}</p></Reveal>
          <Reveal delay={0.2}>
            <Link href="/courses" className="course-link min-h-[44px] text-[1rem] hover:[&::after]:scale-x-100 hover:[&_svg]:translate-x-1">
              {t('all')}
              <ArrowRight size={17} aria-hidden="true" className="rtl:-scale-x-100" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {courses.map((c, i) => (
            <motion.li
              key={c.slug}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.11, ease }}
            >
              <Link href="/courses" className="course-card group">
                <div className="course-photo">
                  <Parallax distance={14} className="h-full w-full">
                    <img src={`/img/courses/${c.slug}.jpg`} alt="" loading="lazy" width={449} height={548} className="-mt-[6%]" />
                  </Parallax>
                </div>
                <div className="flex flex-1 flex-col gap-3 px-4 pb-5 pt-5">
                  <h3 className="serif text-[1.55rem] leading-[1.15] text-[#12382c]">{t(`items.${c.slug}.name`)}</h3>
                  <p className="flex-1 text-[0.95rem] leading-[1.6] text-[#3a4338]">{t(`items.${c.slug}.desc`)}</p>
                  <span className="course-link mt-2 self-start text-[0.98rem]">
                    {t('view')}
                    <ArrowRight size={16} aria-hidden="true" className="rtl:-scale-x-100" />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="mt-12 flex items-center gap-5" aria-hidden="true">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b8862b]" />
          <Seal className="h-9 w-9" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b8862b]" />
        </div>
      </div>
    </section>
  );
}
