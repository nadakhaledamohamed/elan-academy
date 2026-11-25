import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Stub } from '@/components/Stub';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'nav' });
  return <Stub title={t('about')} />;
}
