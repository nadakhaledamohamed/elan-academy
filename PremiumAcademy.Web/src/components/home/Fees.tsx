'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { durations, plans, planId, type Duration } from '@/content/site';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { cn } from '@/lib/cn';

/** Packages and pricing as one printed schedule. Prices are read from content, never typed here. */
export function Fees() {
  const t = useTranslations('fees');
  const [duration, setDuration] = useState<Duration>(30);
  // US-dollar amounts read the same in both languages: $17, never 17 US$.
  const money = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(n);

  return (
    <section id="fees" className="container-page grid gap-12 py-28 md:py-40 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <SectionLabel index="VIII">{t('label')}</SectionLabel>
        <h2 className="display-lg mt-8">{t('title')}</h2>
        <p className="mt-6 max-w-sm leading-relaxed text-muted">{t('note')}</p>
        <p className="mt-4 max-w-sm text-sm text-clay">{t('draft')}</p>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <fieldset className="flex flex-wrap items-center gap-4">
          <legend className="label mb-4">{t('length')}</legend>
          {durations.map((d) => (
            <label key={d} className={cn('relative flex min-h-[48px] cursor-pointer items-center border px-6 pt-[3px] transition-colors duration-300', duration === d ? 'border-brass bg-primary text-on-primary' : 'border-line hover:border-brass')}>
              <input type="radio" name="duration" value={d} checked={duration === d} onChange={() => setDuration(d)} className="sr-only" />
              {t('minutes', { count: d })}
            </label>
          ))}
        </fieldset>
        <ul className="mt-10">
          {plans.map((p) => (
            <li key={p.perWeek} className="border-t border-line last:border-b">
              <Link
                href={{ pathname: '/book', query: { plan: planId(p.perWeek, duration) } }}
                aria-label={t('choose', { price: money(p.price[duration]), perWeek: p.perWeek, minutes: duration })}
                className="group relative grid grid-cols-[1fr_auto_auto] items-baseline gap-4 py-6 md:gap-10"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-brass/10 transition-transform duration-500 ease-elan group-hover:scale-x-100 rtl:origin-right" aria-hidden="true" />
                <span className="relative">
                  <span className="font-display text-2xl md:text-3xl">{t('perWeek', { count: p.perWeek })}</span>
                  <span className="mt-1 block text-sm text-muted">{t('perMonth', { count: p.perWeek * 4 })}</span>
                </span>
                <span className="relative overflow-hidden font-display text-3xl md:text-5xl" dir="ltr">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span key={duration} className="block" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                      {money(p.price[duration])}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <ArrowRight size={20} strokeWidth={1.25} aria-hidden="true" className="relative self-center text-brass transition-transform duration-500 group-hover:translate-x-2 rtl:-scale-x-100 rtl:group-hover:-translate-x-2" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
