import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function Intro() {
  const t = useTranslations('intro');
  return (
    <section className="container-page grid gap-10 py-28 md:py-40 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <SectionLabel index="I">{t('label')}</SectionLabel>
        <Reveal>
          <h2 className="display-lg mt-8 max-w-[10ch]">{t('title')}</h2>
        </Reveal>
      </div>
      <div className="flex flex-col gap-7 text-lg leading-relaxed lg:col-span-6 lg:col-start-7 lg:pt-16">
        <Reveal>
          <p className="font-display text-[1.7rem] leading-snug">{t('p1')}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-muted">{t('p2')}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <Link href="/about" className="link-quiet">{t('link')}</Link>
        </Reveal>
      </div>
    </section>
  );
}
