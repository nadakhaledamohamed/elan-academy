'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CalendarClock, Check, Gift, MessageCircle, Plus, Quote, Route, UserCheck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { contact, courses } from '@/content/site';
import { CourseEmblem } from '@/components/geometry/CourseEmblem';
import { Halo, Rosette } from '@/components/geometry/Rosette';
import { Counter, Magnetic, Reveal, Stagger, StaggerItem, Tilt, ease } from '@/components/motion';
import { Parallax, RevealText, useScrub } from '@/components/scroll';
import { cn } from '@/lib/cn';

type TD = { t: string; d: string };

function Heading({ label, title, lead, center }: { label: string; title: string; lead?: string; center?: boolean }) {
  return (
    <div className={cn('flex max-w-2xl flex-col gap-4', center && 'mx-auto items-center text-center')}>
      <Reveal><p className="eyebrow">{label}</p></Reveal>
      <RevealText text={title} className="h-section" />
      {lead && <Reveal delay={0.15}><p className="lead">{lead}</p></Reveal>}
    </div>
  );
}

/** A moving band of subjects under the hero. */
export function Marquee() {
  const t = useTranslations('courses');
  const names = courses.map((c) => t(`items.${c.slug}.name`));
  const row = [...names, ...names, ...names, ...names];
  return (
    <div className="on-emerald overflow-hidden border-y border-white/10 bg-bg py-5" dir="ltr" aria-hidden="true">
      <div className="marquee flex w-max items-center gap-10 whitespace-nowrap text-[1.05rem] font-semibold text-ink/70">
        {[...row, ...row].map((n, i) => (
          <span key={i} className="flex items-center gap-10">
            {n}
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Animated counters. Every figure describes the service itself; none is an invented result. */
export function Stats() {
  const t = useTranslations();
  const items = t.raw('stats.items') as Array<{ n: number; s: string; l: string }>;
  return (
    <section className="section !pb-0">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Heading label={t('intro.label')} title={t('intro.title')} lead={t('intro.p1')} />
        <Stagger className="grid grid-cols-2 gap-4">
          {items.map((it) => (
            <StaggerItem key={it.l}>
              <Tilt className="glass h-full rounded-3xl p-6" max={5}>
                <p className="gold-text on-light text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold leading-none tracking-[-0.04em]">
                  <Counter value={it.n} suffix={it.s} />
                </p>
                <p className="mt-3 text-[0.95rem] leading-snug text-muted">{it.l}</p>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

const hoverArt: Record<string, string> = {
  foundation: 'group-hover:-translate-y-3 group-hover:scale-105',
  tajweed: 'group-hover:scale-x-110',
  hifz: 'group-hover:scale-110 group-hover:-translate-y-1',
  arabic: 'group-hover:rotate-[8deg] group-hover:scale-105',
  'islamic-studies': 'group-hover:scale-110',
};

/** Courses as a bento grid. Each card has its own colour, cover art, glow and hover behaviour. */
export function Courses() {
  const t = useTranslations();
  return (
    <section className="section" id="courses">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading label={t('courses.label')} title={t('courses.title')} />
          <Reveal>
            <Link href="/courses" className="btn btn-ghost">{t('courses.all')}<ArrowRight size={17} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
          </Reveal>
        </div>
        <Stagger className="mt-12 grid gap-5 lg:grid-cols-6" gap={0.12}>
          {courses.map((c, i) => {
            const wide = i < 2;
            const outcomes = t.raw(`outcomes.${c.slug}`) as string[];
            return (
              <StaggerItem key={c.slug} className={wide ? 'lg:col-span-3' : 'lg:col-span-2'}>
                <Tilt className="on-emerald group h-full rounded-[28px] border border-white/10 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]" max={6}>
                  <Link href="/courses" className={cn('relative flex h-full flex-col', wide && 'sm:flex-row')} style={{ background: `linear-gradient(155deg, ${c.from} 0%, ${c.to} 78%)` }}>
                    <div className={cn('relative flex items-center justify-center overflow-hidden p-6', wide ? 'sm:w-[44%]' : 'h-52')}>
                      <div className="absolute h-56 w-56 rounded-full opacity-50 blur-3xl transition-opacity duration-700 group-hover:opacity-90" style={{ background: c.glow }} aria-hidden="true" />
                      <Parallax distance={22} className="relative h-full max-h-56 w-full">
                        <CourseEmblem slug={c.slug} className={cn('h-full w-full text-white transition-transform duration-700 ease-elan', hoverArt[c.slug])} />
                      </Parallax>
                    </div>
                    <div className="relative flex flex-1 flex-col gap-4 p-7">
                      <div className="flex flex-wrap items-center gap-2 text-[0.78rem] font-medium">
                        <span className="rounded-full bg-black/25 px-3 py-1" style={{ color: c.glow }}>{String(i + 1).padStart(2, '0')}</span>
                        <span className="rounded-full bg-white/10 px-3 py-1">{t(`courses.items.${c.slug}.level`)}</span>
                        <span className="rounded-full bg-white/10 px-3 py-1">{t(`courses.items.${c.slug}.audience`)}</span>
                      </div>
                      <h3 className="text-[1.5rem] font-bold leading-tight tracking-[-0.02em]">{t(`courses.items.${c.slug}.name`)}</h3>
                      <p className="text-[0.96rem] leading-relaxed text-white/75">{t(`courses.items.${c.slug}.desc`)}</p>
                      <ul className="mt-1 flex flex-col gap-2 border-t border-white/10 pt-4 text-[0.9rem]">
                        {outcomes.map((o) => (
                          <li key={o} className="flex items-start gap-2.5">
                            <Check size={16} className="mt-0.5 shrink-0" style={{ color: c.glow }} aria-hidden="true" />
                            {o}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-auto flex items-center gap-2 pt-3 text-[0.92rem] font-semibold" style={{ color: c.glow }}>
                        {t('courses.view')}
                        <ArrowUpRight size={17} aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Tilt>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

const whyIcons = [UserCheck, Route, Gift, CalendarClock];

/** Why Élan: spotlight glass cards. */
export function Why() {
  const t = useTranslations();
  const items = t.raw('why.items') as TD[];
  return (
    <section className="section bg-bg2">
      <div className="container-page">
        <Heading label={t('why.label')} title={t('why.title')} lead={t('intro.p2')} center />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => {
            const Icon = whyIcons[i % whyIcons.length];
            return (
              <StaggerItem key={it.t}>
                <Tilt className="glass h-full rounded-3xl p-7" max={5}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-[#1b1403]" style={{ background: 'linear-gradient(135deg, var(--gold-hi), var(--gold-lo))' }}>
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="h-card mt-5">{it.t}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{it.d}</p>
                </Tilt>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/** The journey: a line fills as you scroll past four steps. */
export function Journey() {
  const t = useTranslations('how');
  const steps = t.raw('steps') as TD[];
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  const halo = useScrub<HTMLDivElement>({ rotate: -25, scale: 0.9 }, { rotate: 35, scale: 1.1 });
  return (
    <section className="section">
      <div className="container-page">
        <div className="on-emerald emerald-panel relative overflow-hidden rounded-[36px] border border-white/10 p-7 md:p-14">
          <div ref={halo} className="pointer-events-none absolute -end-56 -top-40 w-[700px]"><Halo className="w-full text-white/10" /></div>
          <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Heading label={t('label')} title={t('title')} />
              <Reveal className="mt-8">
                <Link href="/book" className="btn btn-gold">{steps[0].t}<ArrowRight size={18} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
              </Reveal>
            </div>
            <ol ref={ref} className="relative flex flex-col gap-5 ps-12">
              <span className="absolute bottom-3 start-[17px] top-3 w-px bg-white/15" aria-hidden="true" />
              <motion.span className="absolute bottom-3 start-[17px] top-3 w-px origin-top" style={{ scaleY: fill, background: 'linear-gradient(var(--gold-hi), var(--gold-lo))' }} aria-hidden="true" />
              {steps.map((s, i) => (
                <motion.li key={s.t} className="relative" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 0.8, ease }}>
                  <span className="absolute -start-12 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 bg-[#062019] text-[0.85rem] font-bold text-gold">{i + 1}</span>
                  <div className="glass rounded-3xl p-6">
                    <h3 className="h-card">{s.t}</h3>
                    <p className="mt-2 text-[0.96rem] leading-relaxed text-muted">{s.d}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Tutor: typography and geometry only. Bracketed items are placeholders. */
export function Tutor() {
  const t = useTranslations('tutor');
  const creds = t.raw('creds') as string[];
  return (
    <section className="section !pt-0">
      <div className="container-page">
        <Reveal>
          <div className="rounded-[36px] p-px" style={{ background: 'linear-gradient(135deg, var(--gold-hi), transparent 35%, transparent 65%, var(--gold-lo))' }}>
            <div className="glass relative grid items-center gap-10 overflow-hidden rounded-[35px] !bg-bg p-8 md:grid-cols-[1fr_auto] md:p-14">
              <div className="flex flex-col gap-5">
                <p className="eyebrow">{t('label')}</p>
                <RevealText text={t('name')} className="h-section" />
                <p className="text-lg font-semibold text-accent">{t('role')}</p>
                <p className="lead max-w-xl">{t('body')}</p>
                <ul className="flex flex-wrap gap-2.5">
                  {creds.map((c) => (
                    <li key={c} className="hairline rounded-full border px-4 py-2 text-[0.9rem] text-muted">{c}</li>
                  ))}
                </ul>
                <Link href="/tutor" className="btn btn-ghost self-start">{t('link')}<ArrowRight size={17} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
              </div>
              <div className="relative mx-auto h-56 w-56 md:h-72 md:w-72">
                <div className="glow absolute inset-4 rounded-full" style={{ background: 'radial-gradient(circle, rgb(217 169 63 / 0.35), transparent 70%)', filter: 'blur(24px)' }} aria-hidden="true" />
                <Rosette id="gold-tutor" fold={12} step={5} className="relative h-full w-full" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Testimonials: the layout is ready, but the cards are labelled placeholders. Nothing here is presented as a real review. */
export function Testimonials() {
  const t = useTranslations('testimonials');
  return (
    <section className="section bg-bg2">
      <div className="container-page">
        <Heading label={t('label')} title={t('title')} center />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <StaggerItem key={i}>
              <Tilt className="glass flex h-full flex-col gap-5 rounded-3xl border-dashed p-7" max={4}>
                <div className="flex items-center justify-between">
                  <Quote size={28} className="text-gold" aria-hidden="true" />
                  <span className="rounded-full border border-dashed border-gold/60 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-gold">{t('note')}</span>
                </div>
                <p className="flex-1 text-[0.98rem] leading-relaxed text-muted">{t('slot')}</p>
                <div className="hairline border-t pt-4">
                  <p className="font-semibold">{t('who')}</p>
                  <p className="text-[0.85rem] text-muted">{t('sub')}</p>
                </div>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function Faq() {
  const t = useTranslations('faq');
  const items = t.raw('items') as Array<{ q: string; a: string }>;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Heading label={t('label')} title={t('title')} />
        <Stagger className="flex flex-col gap-3" gap={0.06}>
          {items.map((it, i) => {
            const on = open === i;
            return (
              <StaggerItem key={it.q}>
                <div className={cn('glass rounded-2xl transition-colors duration-300', on && '!border-gold/50')}>
                  <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : i)} className="flex min-h-[64px] w-full items-center justify-between gap-5 px-6 py-4 text-start text-[1.02rem] font-semibold">
                    {it.q}
                    <motion.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: 0.35, ease }} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Plus size={17} aria-hidden="true" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden">
                        <p className="px-6 pb-6 text-[0.98rem] leading-relaxed text-muted">{it.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

export function Cta() {
  const t = useTranslations('cta');
  return (
    <section className="section !pt-0">
      <div className="container-page">
        <Reveal>
          <div className="on-emerald emerald-panel relative overflow-hidden rounded-[36px] border border-white/10 px-6 py-20 text-center md:py-28">
            <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="glow pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgb(217 169 63 / 0.28), transparent 65%)' }} aria-hidden="true" />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <h2 className="h-hero !text-[clamp(2.1rem,4.4vw,3.6rem)]"><span className="gold-text">{t('title')}</span></h2>
              <p className="lead">{t('body')}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Magnetic>
                  <Link href="/book" className="btn btn-gold">{t('button')}<ArrowRight size={18} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
                </Magnetic>
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><MessageCircle size={18} aria-hidden="true" />{t('whatsapp')}</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
