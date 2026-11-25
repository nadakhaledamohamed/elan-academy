'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { durations, plans, planId, type Duration } from '@/content/site';
import { Reveal, SpringNumber, Stagger, StaggerItem, Tilt } from '@/components/motion';
import { cn } from '@/lib/cn';

// US-dollar amounts read the same in both languages: $17, never 17 US$.
const money = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: n % 1 > 0.01 ? 2 : 0, maximumFractionDigits: n % 1 > 0.01 ? 2 : 0 }).format(n);

/** Plan builder. Prices come from content/site.ts and are flagged as provisional. */
export function Pricing() {
  const t = useTranslations();
  const [duration, setDuration] = useState<Duration>(30);
  return (
    <section className="section" id="fees">
      <div className="container-page">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="eyebrow">{t('fees.label')}</p>
          <h2 className="h-section">{t('fees.title')}</h2>
          <p className="lead">{t('fees.note')}</p>
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <fieldset className="glass inline-flex rounded-full p-1.5">
            <legend className="sr-only">{t('fees.length')}</legend>
            {durations.map((d) => (
              <label key={d} className="relative cursor-pointer rounded-full px-6 py-2.5 text-[0.95rem] font-semibold">
                <input type="radio" name="duration" value={d} checked={duration === d} onChange={() => setDuration(d)} className="sr-only" />
                {duration === d && <motion.span layoutId="pill" className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg, var(--gold-hi), var(--gold-mid) 55%, var(--gold-lo))' }} transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                <span className={cn('relative transition-colors', duration === d ? 'text-[#1b1403]' : 'text-muted')}>{t('fees.minutes', { count: d })}</span>
              </label>
            ))}
          </fieldset>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" gap={0.08}>
          {plans.map((p) => (
            <StaggerItem key={p.perWeek}>
              <Tilt className="glass group h-full rounded-3xl" max={5}>
                <Link href={{ pathname: '/book', query: { plan: planId(p.perWeek, duration) } }} aria-label={t('fees.choose', { price: money(p.price[duration]), perWeek: p.perWeek, minutes: duration })} className="flex h-full flex-col gap-1 p-6">
                  <span className="text-[0.9rem] font-semibold text-gold">{t('fees.perWeek', { count: p.perWeek })}</span>
                  <span className="mt-3 text-[2.4rem] font-extrabold leading-none tracking-[-0.04em]">
                    <SpringNumber value={p.price[duration]} format={money} />
                  </span>
                  <span className="text-[0.85rem] text-muted">{t('feesx.perMonth')}</span>
                  <span className="hairline mt-5 border-t pt-4 text-[0.88rem] text-muted">{t('fees.perMonth', { count: p.perWeek * 4 })}</span>
                  <span className="mt-4 flex items-center gap-2 text-[0.9rem] font-semibold transition-colors group-hover:text-gold">
                    {t('feesx.cta')}
                    <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                  </span>
                </Link>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-6 text-center text-[0.85rem] text-muted">{t('fees.draft')}</p>
      </div>
    </section>
  );
}
