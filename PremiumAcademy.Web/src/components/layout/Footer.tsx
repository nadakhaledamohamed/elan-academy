import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { contact } from '@/content/site';
import { Wordmark } from './Header';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Wordmark />
          <p className="max-w-xs text-muted">{t('footer.tagline')}</p>
        </div>
        <nav aria-label={t('footer.explore')} className="flex flex-col gap-3">
          <p className="label mb-2">{t('footer.explore')}</p>
          <Link href="/courses" className="hover:underline">{t('nav.courses')}</Link>
          <Link href="/about" className="hover:underline">{t('nav.about')}</Link>
          <Link href="/tutor" className="hover:underline">{t('nav.tutor')}</Link>
          <Link href="/book" className="hover:underline">{t('nav.book')}</Link>
        </nav>
        <div className="flex flex-col gap-3">
          <p className="label mb-2">{t('footer.contact')}</p>
          <a href={`mailto:${contact.email}`} className="break-all hover:underline">{contact.email}</a>
          <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
            WhatsApp <span dir="ltr">{contact.phoneDisplay}</span>
          </a>
          <Link href="/contact" className="hover:underline">{t('nav.contact')}</Link>
        </div>
        <nav aria-label={t('footer.legal')} className="flex flex-col gap-3">
          <p className="label mb-2">{t('footer.legal')}</p>
          <Link href="/contact" className="hover:underline">{t('footer.privacy')}</Link>
          <Link href="/contact" className="hover:underline">{t('footer.terms')}</Link>
          <Link href="/contact" className="hover:underline">{t('footer.refunds')}</Link>
        </nav>
      </div>
      <div className="container-page border-t border-line py-6 text-sm text-muted">{t('footer.rights', { year: String(year) })}</div>
    </footer>
  );
}
