import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Halo } from '@/components/geometry/Rosette';

/** Temporary page body for routes that are built in the next step of Stage 2. */
export function Stub({ title }: { title: string }) {
  const t = useTranslations('stub');
  return (
    <section className="relative overflow-hidden">
      <Halo className="pointer-events-none absolute -end-48 top-1/2 w-[720px] -translate-y-1/2 text-line" />
      <div className="container-page relative flex min-h-[80svh] flex-col justify-center gap-6 pt-28">
        <p className="label">{t('label')}</p>
        <h1 className="display-xl">{title}</h1>
        <p className="font-display text-2xl">{t('title')}</p>
        <p className="max-w-md text-lg text-muted">{t('body')}</p>
        <Link href="/" className="link-quiet self-start">{t('back')}</Link>
      </div>
    </section>
  );
}
