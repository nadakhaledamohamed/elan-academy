import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Halo } from '@/components/geometry/Rosette';

/** Temporary page body for routes that are built in the next step of Stage 2. */
export function Stub({ title }: { title: string }) {
  const t = useTranslations('stub');
  return (
    <section className="on-emerald emerald-panel relative overflow-hidden">
      <Halo className="pointer-events-none absolute -end-48 top-1/2 w-[720px] -translate-y-1/2 text-white/10" />
      <div className="container-page relative flex min-h-[90svh] flex-col justify-center gap-5 pt-28">
        <p className="eyebrow">{t('label')}</p>
        <h1 className="h-hero">{title}</h1>
        <p className="text-xl font-semibold">{t('title')}</p>
        <p className="lead max-w-md">{t('body')}</p>
        <Link href="/" className="btn btn-ghost self-start">{t('back')}</Link>
      </div>
    </section>
  );
}
