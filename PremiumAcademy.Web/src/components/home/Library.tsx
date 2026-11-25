'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { type CourseSlug } from '@/content/site';
import { circle, star, ticks } from '@/lib/geometry';
import { Reveal, ease } from '@/components/motion';
import { RevealText } from '@/components/scroll';

/** Binding colours: highlight, body, shadow. One leather per volume, one shared gold foil. */
const volumes: Array<{ slug: CourseSlug; c0: string; c1: string; c2: string; title: 'top' | 'middle' | 'bottom' }> = [
  { slug: 'foundation', c0: '#1f6b54', c1: '#12402f', c2: '#0a2a1f', title: 'bottom' },
  { slug: 'tajweed', c0: '#8c2f37', c1: '#5e1a22', c2: '#3b0f15', title: 'top' },
  { slug: 'hifz', c0: '#2c4372', c1: '#19294a', c2: '#0f1a31', title: 'bottom' },
  { slug: 'arabic', c0: '#8a6230', c1: '#5d3f1b', c2: '#3b270f', title: 'middle' },
  { slug: 'islamic-studies', c0: '#573a66', c1: '#382442', c2: '#22152a', title: 'top' },
];
const roman = ['I', 'II', 'III', 'IV', 'V'];
const F = 'currentColor';

/** Gold-foil cover artwork, drawn per subject. viewBox 208 × 304. */
function CoverArt({ slug }: { slug: CourseSlug }) {
  const p = { viewBox: '0 0 208 304', fill: 'none', 'aria-hidden': true, className: 'absolute inset-0 h-full w-full' } as const;
  if (slug === 'foundation') {
    // An arch, and inside it the first letters a beginner meets.
    return (
      <svg {...p}>
        <path d="M30 284V112a74 74 0 0 1 148 0v172z" stroke={F} strokeWidth="1.6" />
        <path d="M38 284V114a66 66 0 0 1 132 0v170" stroke={F} strokeWidth="0.7" opacity="0.7" />
        <text x="104" y="172" textAnchor="middle" fontSize="50" fill={F} style={{ fontFamily: "'Alexandria', sans-serif", fontWeight: 700 }} direction="rtl">أ ب ت</text>
        <path d="M70 196h68" stroke={F} strokeWidth="0.8" />
        {[86, 104, 122].map((x) => <rect key={x} x={x - 3} y={205} width="6" height="6" transform={`rotate(45 ${x} 208)`} fill={F} />)}
      </svg>
    );
  }
  if (slug === 'tajweed') {
    // A graduated dial with sound rings: recitation measured precisely.
    return (
      <svg {...p}>
        <rect x="22" y="18" width="164" height="268" stroke={F} strokeWidth="1.4" />
        <rect x="28" y="24" width="152" height="256" stroke={F} strokeWidth="0.6" opacity="0.7" />
        <g transform="translate(104 196)">
          <path d={ticks(54, 60, 4, 9, 5) + circle(0, 0, 54)} stroke={F} strokeWidth="0.9" />
          {[14, 26, 38].map((r) => <path key={r} d={`M${-r * 0.7} ${-r * 0.7}A${r} ${r} 0 0 1 ${r * 0.7} ${-r * 0.7}M${-r * 0.7} ${r * 0.7}A${r} ${r} 0 0 0 ${r * 0.7} ${r * 0.7}`} stroke={F} strokeWidth="1.3" />)}
          <circle r="4" fill={F} />
        </g>
      </svg>
    );
  }
  if (slug === 'hifz') {
    // Arches within arches, and markers filling one by one: returning to the same passage until it holds.
    return (
      <svg {...p}>
        <rect x="22" y="18" width="164" height="268" stroke={F} strokeWidth="1.2" />
        {[[22, 18], [186, 18], [22, 286], [186, 286]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3.5" fill={F} />)}
        {[0, 1, 2, 3, 4].map((i) => {
          const r = 60 - i * 11;
          return <path key={i} d={`M${104 - r} 176V${108 + i * 3}a${r} ${r} 0 0 1 ${2 * r} 0V176`} stroke={F} strokeWidth={i === 4 ? 1.8 : 1} opacity={0.55 + i * 0.11} />;
        })}
        <path d="M40 176h128" stroke={F} strokeWidth="0.8" />
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={61 + i * 20} y={190} width="7" height="7" transform={`rotate(45 ${64.5 + i * 20} 193.5)`} stroke={F} strokeWidth="1" fill={i < 3 ? F : 'none'} />)}
      </svg>
    );
  }
  if (slug === 'arabic') {
    // A reed pen, an inkwell and ruled lines with the calligrapher's measuring dots.
    return (
      <svg {...p}>
        <path d="M22 30h164M22 36h164M22 268h164M22 274h164" stroke={F} strokeWidth="1" />
        <g transform="translate(104 86)">
          <path d="M-44 34L30 -40l10 10L-34 44l-16 6z" stroke={F} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M-34 44l-8-8M20 -30l10 10" stroke={F} strokeWidth="1" />
          <circle cx="44" cy="40" r="11" stroke={F} strokeWidth="1.3" />
          <path d="M36 40a8 8 0 0 0 16 0z" fill={F} />
        </g>
        {[206, 226, 246].map((y, r) => (
          <g key={y}>
            <path d={`M40 ${y}h128`} stroke={F} strokeWidth="0.7" opacity="0.7" />
            {Array.from({ length: 3 - r }, (_, i) => <rect key={i} x={46 + i * 14} y={y - 9} width="6" height="6" transform={`rotate(45 ${49 + i * 14} ${y - 6})`} fill={F} />)}
          </g>
        ))}
      </svg>
    );
  }
  // islamic-studies: a central medallion with corner-pieces, as on a classical binding.
  return (
    <svg {...p}>
      <rect x="20" y="16" width="168" height="272" stroke={F} strokeWidth="1.3" />
      {[[20, 16, 0], [188, 16, 90], [188, 288, 180], [20, 288, 270]].map(([x, y, a]) => <path key={a} d="M0 34A34 34 0 0 0 34 0M0 22A22 22 0 0 0 22 0" transform={`translate(${x} ${y}) rotate(${a})`} stroke={F} strokeWidth="1" />)}
      <g transform="translate(104 192)">
        <path d={star(50, 8, 3)} stroke={F} strokeWidth="1.3" />
        <path d={star(50, 8, 2) + circle(0, 0, 21)} stroke={F} strokeWidth="0.9" />
        <path d={star(13, 8, 3)} fill={F} />
        <path d="M0 -50v-22M0 50v22" stroke={F} strokeWidth="0.9" />
        <rect x="-4" y="-80" width="8" height="8" transform="rotate(45 0 -76)" fill={F} />
        <rect x="-4" y="72" width="8" height="8" transform="rotate(45 0 76)" fill={F} />
      </g>
    </svg>
  );
}

const titlePos = { top: 'top-[11%]', middle: 'top-[45%]', bottom: 'bottom-[10%]' } as const;

/** Courses as five bound volumes on an oak shelf. Hover lifts a book; click, tap or Enter opens its cover. */
export function Library() {
  const t = useTranslations();
  const locale = useLocale();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<CourseSlug | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="library section mt-20 md:mt-28" id="courses">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-2xl flex-col gap-4">
            <Reveal><p className="eyebrow">{t('courses.label')}</p></Reveal>
            <RevealText text={t('courses.title')} className="h-section" />
            <Reveal delay={0.15}><p className="lead">{t('courses.lead')}</p></Reveal>
          </div>
          <Reveal>
            <Link href="/courses" className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#16271f] px-6 text-[0.95rem] font-semibold transition-colors hover:bg-[#16271f] hover:text-[#f4ead2]">
              {t('courses.all')}
              <ArrowRight size={17} aria-hidden="true" className="rtl:-scale-x-100" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
          {volumes.map((v, i) => {
            const name = t(`courses.items.${v.slug}.name`);
            const isOpen = open === v.slug;
            return (
              <li key={v.slug} className="shelf-cell" style={{ zIndex: isOpen ? 5 : 1 }}>
                <motion.div
                  className="book-stage"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: -46, rotate: locale === 'ar' ? 3 : -3 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: '-90px' }}
                  transition={{ duration: 0.75, delay: i * 0.13, ease }}
                >
                  <div className="book" data-open={isOpen} style={{ ['--c0' as string]: v.c0, ['--c1' as string]: v.c1, ['--c2' as string]: v.c2 }}>
                    <div className="book-shadow" aria-hidden="true" />
                    <div className="book-back" aria-hidden="true" />
                    <div className="book-top" aria-hidden="true" />
                    <div className="book-edge" aria-hidden="true" />
                    <div className="book-spine" aria-hidden="true">
                      <i />
                      <span>{name}</span>
                      <i />
                    </div>

                    {/* First page: revealed when the cover opens. */}
                    <div className="book-page" id={`page-${v.slug}`} aria-hidden={!isOpen}>
                      <div className="flex items-center justify-between">
                        <span className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[#8a6114]">{roman[i]} · {t(`courses.items.${v.slug}.level`)}</span>
                        <button type="button" tabIndex={isOpen ? 0 : -1} aria-label={t('nav.close')} onClick={() => setOpen(null)} className="-m-1 flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8a6114]">
                          <X size={15} aria-hidden="true" />
                        </button>
                      </div>
                      <p className="text-[0.82rem] font-bold leading-tight sm:text-[0.98rem]">{name}</p>
                      <p className="hidden text-[0.74rem] font-medium text-[#5a5a44] sm:block">{t(`courses.items.${v.slug}.audience`)}</p>
                      <p className="hidden flex-1 text-[0.8rem] leading-[1.55] text-[#2c3a31] sm:block">{t(`courses.items.${v.slug}.desc`)}</p>
                      <span className="flex-1 sm:hidden" />
                      <Link href="/courses" tabIndex={isOpen ? 0 : -1} className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-[#16271f] px-3 text-[0.72rem] sm:gap-2 sm:px-4 sm:text-[0.82rem] font-semibold text-[#f4ead2] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a6114]">
                        {t('courses.view')}
                        <ArrowRight size={15} aria-hidden="true" className="rtl:-scale-x-100" />
                      </Link>
                    </div>

                    <div className="book-cover" aria-hidden="true">
                      <div className="cover-front">
                        <CoverArt slug={v.slug} />
                        <div className={`absolute inset-x-0 px-5 text-center sm:px-9 ${titlePos[v.title]}`}>
                          <span className="block text-[0.62rem] font-semibold tracking-[0.2em] opacity-80" dir="ltr">{roman[i]}</span>
                          <span className="mt-1 block text-[0.78rem] font-bold leading-[1.2] sm:text-[1.02rem]" style={{ textShadow: '0 1px 0 rgb(0 0 0 / 0.45)' }}>{name}</span>
                        </div>
                      </div>
                      <div className="cover-inside" />
                    </div>

                    {!isOpen && (
                      <button type="button" className="book-hit" aria-expanded={false} aria-controls={`page-${v.slug}`} aria-label={t('courses.open', { name })} onClick={() => setOpen(v.slug)} />
                    )}
                  </div>
                </motion.div>
                <div className="plank" aria-hidden="true" />
              </li>
            );
          })}
        </ul>
        {/* On phones the book is too small for its summary, so the open volume's text sits under the shelf. */}
        <div className="mt-6 min-h-[5.5rem] sm:hidden" aria-live="polite">
          {open ? (
            <motion.div key={open} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} className="rounded-2xl border border-[#865e10]/30 bg-[#fbf5e6] p-5">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#8a6114]">{t(`courses.items.${open}.level`)} · {t(`courses.items.${open}.audience`)}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-[#2c3a31]">{t(`courses.items.${open}.desc`)}</p>
            </motion.div>
          ) : (
            <p className="text-center text-[0.9rem] font-medium text-muted">{t('courses.hint')}</p>
          )}
        </div>
        <p className="mt-8 hidden text-center text-[0.9rem] font-medium text-muted sm:block">{t('courses.hint')}</p>
      </div>
    </section>
  );
}
