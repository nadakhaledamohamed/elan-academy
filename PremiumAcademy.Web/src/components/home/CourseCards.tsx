'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { courses, type CourseSlug } from '@/content/site';
import { circle, star } from '@/lib/geometry';
import { Halo } from '@/components/geometry/Rosette';
import { ease } from '@/components/motion';
import { useScrub } from '@/components/scroll';

const view = { once: true, margin: '-90px' } as const;

/* ---- Heading block: label, gold rule, headline, subtitle and link arrive in order ---- */
const head: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease } },
};
const rule: Variants = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease } } };
const headline: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const wordUp: Variants = { hidden: { y: '115%', rotate: 5 }, show: { y: 0, rotate: 0, transition: { duration: 0.9, ease } } };

/* ---- Cards: fade up with a stagger; inside each, picture then text then link ---- */
const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 64, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.95, ease, staggerChildren: 0.1, delayChildren: 0.25 } },
};
const photo: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0% round 12px)', scale: 1.12 },
  show: { clipPath: 'inset(0% 0% 0% 0% round 12px)', scale: 1, transition: { duration: 1.2, ease } },
};
const inner: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };

/** Fine gold corner bracket that draws itself. */
function Corner({ className }: { className: string }) {
  const draw: Variants = { hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { duration: 1.6, ease } } };
  return (
    <motion.svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className={className} initial="hidden" whileInView="show" viewport={view}>
      <motion.path d="M2 118V2h116" stroke="#b8862b" strokeWidth="1.2" variants={draw} />
      <motion.path d="M10 70V10h60M10 30h20V10M22 22h16v16H22z" stroke="#b8862b" strokeWidth="1" opacity="0.8" variants={draw} />
    </motion.svg>
  );
}

/** One course card: pointer tilt with a moving sheen, on top of the entrance animation. */
function Card({ slug, name, desc, cta, reduce }: { slug: CourseSlug; name: string; desc: string; cta: string; reduce: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const px = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const py = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const rotateY = useTransform(px, (v) => v * 9);
  const rotateX = useTransform(py, (v) => v * -9);
  const imgX = useTransform(px, (v) => v * -12);
  const imgY = useTransform(py, (v) => v * -12);
  const gx = useTransform(px, (v) => 50 + v * 90);
  const gy = useTransform(py, (v) => 50 + v * 90);
  const sheen = useMotionTemplate`radial-gradient(240px circle at ${gx}% ${gy}%, rgb(255 244 210 / 0.5), transparent 65%)`;
  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };
  return (
    <motion.li ref={ref} variants={reduce ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } } : card} onPointerMove={onMove} onPointerLeave={reset} style={{ perspective: 1000 }}>
      <motion.div className="h-full" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} whileTap={{ scale: 0.985 }}>
        <Link href="/courses" className="course-card group">
          <motion.div className="course-photo" variants={reduce ? undefined : photo}>
            <motion.img src={`/img/courses/${slug}.jpg`} alt="" loading="lazy" width={449} height={548} style={{ x: imgX, y: imgY, scale: 1.08 }} />
            <motion.span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: sheen }} aria-hidden="true" />
          </motion.div>
          <div className="flex flex-1 flex-col gap-3 px-4 pb-5 pt-5">
            <motion.h3 variants={inner} className="serif text-[1.55rem] leading-[1.15] text-[#12382c]">{name}</motion.h3>
            <motion.p variants={inner} className="flex-1 text-[0.95rem] leading-[1.6] text-[#3a4338]">{desc}</motion.p>
            <motion.span variants={inner} className="course-link mt-2 self-start text-[0.98rem]">
              {cta}
              <ArrowRight size={16} aria-hidden="true" className="rtl:-scale-x-100" />
            </motion.span>
          </div>
        </Link>
      </motion.div>
    </motion.li>
  );
}

/**
 * Courses as a library display on parchment. Everything here is scroll-triggered:
 * the heading block arrives line by line, the cards fade up one after another,
 * and each card's picture unveils before its text.
 */
export function CourseCards() {
  const t = useTranslations('courses');
  const reduce = !!useReducedMotion();
  const words = t('title').split(' ');
  // GSAP ScrollTrigger: the background figure turns slowly as the section passes.
  const halo = useScrub<HTMLDivElement>({ rotate: -20, y: -40 }, { rotate: 30, y: 60 });

  return (
    <section className="library section mt-20 md:mt-28" id="courses">
      <Corner className="pointer-events-none absolute start-5 top-5 hidden h-24 w-24 md:block rtl:-scale-x-100" />
      <Corner className="pointer-events-none absolute bottom-5 start-5 hidden h-24 w-24 -scale-y-100 md:block rtl:-scale-x-100" />
      <div ref={halo} className="pointer-events-none absolute -end-40 -top-44 w-[640px]">
        <Halo className="w-full text-[#b8862b]/25" />
      </div>

      <div className="container-page relative !max-w-[1320px]">
        <motion.div className="flex max-w-3xl flex-col gap-5" variants={head} initial="hidden" whileInView="show" viewport={view}>
          <div>
            <motion.p variants={fadeUp} className="text-[0.82rem] font-semibold uppercase tracking-[0.2em] text-[#8a6114]">{t('label')}</motion.p>
            <motion.span variants={rule} className="mt-3 block h-px w-14 origin-left bg-[#b8862b] rtl:origin-right" aria-hidden="true" />
          </div>
          <motion.h2 variants={headline} aria-label={t('title')} className="serif text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.08] text-[#12382c]">
            {words.map((w, i) => (
              <span key={i} aria-hidden="true" className="me-[0.26em] inline-block overflow-hidden pb-[0.14em] align-bottom last:me-0">
                <motion.span variants={wordUp} className="inline-block">{w}</motion.span>
              </span>
            ))}
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-[1.08rem] leading-[1.7] text-[#3a4338]">{t('lead')}</motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/courses" className="course-link min-h-[44px] text-[1rem] hover:[&::after]:scale-x-100 hover:[&_svg]:translate-x-1">
              {t('all')}
              <ArrowRight size={17} aria-hidden="true" className="rtl:-scale-x-100" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.ul className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5" variants={grid} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px', amount: 0.08 }}>
          {courses.map((c) => (
            <Card key={c.slug} slug={c.slug} name={t(`items.${c.slug}.name`)} desc={t(`items.${c.slug}.desc`)} cta={t('view')} reduce={reduce} />
          ))}
        </motion.ul>

        {/* Closing rule: the lines grow outward from the seal, which turns into place. */}
        <motion.div className="mt-12 flex items-center gap-5" aria-hidden="true" initial="hidden" whileInView="show" viewport={view} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}>
          <motion.span className="h-px flex-1 origin-right bg-gradient-to-r from-transparent to-[#b8862b]" variants={rule} />
          <motion.svg viewBox="-20 -20 40 40" fill="none" className="h-9 w-9" variants={{ hidden: { opacity: 0, rotate: -120, scale: 0.4 }, show: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 1.1, ease } } }}>
            <path d={star(17, 8, 3) + circle(0, 0, 6)} stroke="#b8862b" strokeWidth="1.1" />
          </motion.svg>
          <motion.span className="h-px flex-1 origin-left bg-gradient-to-l from-transparent to-[#b8862b]" variants={rule} />
        </motion.div>
      </div>
    </section>
  );
}
