import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { contact } from '@/content/site';
import { Rosette, Halo } from '@/components/geometry/Rosette';
import { Reveal } from '@/components/ui/Reveal';
import { Magnetic } from '@/components/ui/Magnetic';
import { SectionLabel } from '@/components/ui/SectionLabel';

type TD = { t: string; d: string };

/** Why Élan: oversized numerals in an offset column, set like numbered notes. */
export function Why() {
  const t = useTranslations('why');
  const items = t.raw('items') as TD[];
  return (
    <section className="container-page grid gap-12 py-28 md:py-40 lg:grid-cols-12">
      <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
        <SectionLabel index="IV">{t('label')}</SectionLabel>
        <h2 className="display-lg mt-8">{t('title')}</h2>
      </div>
      <ol className="lg:col-span-7 lg:col-start-6">
        {items.map((it, i) => (
          <li key={it.t} className="border-t border-line last:border-b">
            <Reveal className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4 py-9 md:grid-cols-[7rem_1fr]">
              <span className="font-display text-6xl font-light leading-none text-brass md:text-7xl" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="display-md">{it.t}</h3>
                <p className="mt-3 max-w-lg text-lg leading-relaxed text-muted">{it.d}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Meet our tutor: typography only. Bracketed items are placeholders until the tutor's details arrive. */
export function TutorTeaser() {
  const t = useTranslations('tutor');
  const creds = t.raw('creds') as string[];
  return (
    <section className="relative overflow-hidden bg-surface">
      <Halo className="pointer-events-none absolute -start-56 top-1/2 w-[760px] -translate-y-1/2 text-line" />
      <div className="container-page relative grid gap-12 py-28 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionLabel index="V">{t('label')}</SectionLabel>
          <Reveal>
            <h2 className="display-xl mt-8">{t('name')}</h2>
            <p className="mt-4 text-xl text-accent">{t('role')}</p>
          </Reveal>
        </div>
        <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9 lg:pt-20">
          <p className="text-lg leading-relaxed text-muted">{t('body')}</p>
          <ul className="flex flex-col">
            {creds.map((c, i) => (
              <li key={c} className="border-t border-line last:border-b">
                <Reveal delay={i * 0.12} className="flex items-center gap-4 py-4">
                  <span className="h-2 w-2 rotate-45 border border-brass" aria-hidden="true" />
                  {c}
                </Reveal>
              </li>
            ))}
          </ul>
          <Link href="/tutor" className="link-quiet self-start">{t('link')}</Link>
        </div>
      </div>
    </section>
  );
}

/** Method: the same figure is constructed one layer further at each step. */
export function Method() {
  const t = useTranslations('method');
  const steps = t.raw('steps') as TD[];
  return (
    <section className="container-page py-28 md:py-40">
      <SectionLabel index="VI">{t('label')}</SectionLabel>
      <h2 className="display-lg mt-8">{t('title')}</h2>
      <ol className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.t} className="flex flex-col">
            <Rosette fold={12} step={5} stage={(i + 1) as 1 | 2 | 3 | 4} tone="ink" delay={i * 0.25} className="w-full max-w-[220px] text-accent" />
            <p className="mt-8 text-sm text-brass">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="display-md mt-2">{s.t}</h3>
            <p className="mt-3 leading-relaxed text-muted">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** How it works: four stations on one ruled line. */
export function How() {
  const t = useTranslations('how');
  const steps = t.raw('steps') as TD[];
  return (
    <section className="border-y border-line bg-surface/50">
      <div className="container-page py-28 md:py-32">
        <SectionLabel index="VII">{t('label')}</SectionLabel>
        <h2 className="display-lg mt-8 max-w-[14ch]">{t('title')}</h2>
        <ol className="relative mt-20 grid gap-12 md:grid-cols-4 md:gap-8">
          <span className="absolute inset-x-0 top-[7px] hidden h-px bg-brass/60 md:block" aria-hidden="true" />
          {steps.map((s, i) => (
            <li key={s.t}>
              <Reveal delay={i * 0.12}>
                <span className="relative block h-[15px] w-[15px] rotate-45 border border-brass bg-bg" aria-hidden="true" />
                <h3 className="mt-8 font-display text-2xl">{s.t}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** FAQ as an index page: native disclosure elements, so it works without JavaScript. */
export function Faq() {
  const t = useTranslations('faq');
  const items = t.raw('items') as Array<{ q: string; a: string }>;
  return (
    <section className="container-page grid gap-12 py-28 md:py-40 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <SectionLabel index="IX">{t('label')}</SectionLabel>
        <h2 className="display-lg mt-8">{t('title')}</h2>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        {items.map((it) => (
          <details key={it.q} className="group border-t border-line last:border-b">
            <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-2xl [&::-webkit-details-marker]:hidden">
              {it.q}
              <span aria-hidden="true" className="relative block h-4 w-4 shrink-0">
                <span className="absolute inset-x-0 top-1/2 h-px bg-brass" />
                <span className="absolute inset-y-0 left-1/2 w-px bg-brass transition-transform duration-500 group-open:rotate-90" />
              </span>
            </summary>
            <p className="max-w-xl pb-8 text-lg leading-relaxed text-muted">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Closing call to action on the arch colour, with the construction lines behind. */
export function Cta() {
  const t = useTranslations('cta');
  return (
    <section className="relative overflow-hidden bg-arch text-on-arch">
      <Halo className="pointer-events-none absolute left-1/2 top-1/2 w-[900px] -translate-x-1/2 -translate-y-1/2 text-on-arch/15" />
      <div className="container-page relative flex flex-col items-center gap-8 py-32 text-center md:py-44">
        <Reveal>
          <h2 className="display-xl max-w-[12ch]">{t('title')}</h2>
        </Reveal>
        <p className="max-w-md text-lg text-on-arch/80">{t('body')}</p>
        <Magnetic>
          <Link
            href="/book"
            className="inline-flex min-h-[52px] items-center bg-on-arch px-10 pb-[13px] pt-4 text-[13px] uppercase tracking-[0.2em] text-arch"
            style={{ boxShadow: '0 0 0 4px rgb(var(--arch)), 0 0 0 5px rgb(var(--on-arch))' }}
          >
            {t('button')}
          </Link>
        </Magnetic>
        <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-on-arch underline decoration-on-arch/50 underline-offset-[6px] hover:decoration-on-arch">
          {t('whatsapp')}
        </a>
      </div>
    </section>
  );
}
