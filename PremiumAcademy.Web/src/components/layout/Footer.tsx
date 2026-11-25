import { useTranslations } from 'next-intl';
import { Mail, MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { contact } from '@/content/site';
import { Wordmark } from './Header';

export function Footer() {
  const t = useTranslations();
  const year = String(new Date().getFullYear());
  return (
    <footer className="on-emerald bg-bg">
      <div className="container-page grid gap-10 border-t border-white/10 py-14 md:grid-cols-[1.5fr_1fr_1.3fr_1fr]">
        <div className="flex flex-col gap-4">
          <Wordmark />
          <p className="max-w-xs text-[0.95rem] leading-relaxed text-muted">{t('footer.tagline')}</p>
        </div>
        <nav aria-label={t('footer.explore')} className="flex flex-col gap-2.5 text-[0.95rem]">
          <p className="mb-1 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-gold">{t('footer.explore')}</p>
          <Link href="/courses" className="text-muted hover:text-ink">{t('nav.courses')}</Link>
          <Link href="/about" className="text-muted hover:text-ink">{t('nav.about')}</Link>
          <Link href="/tutor" className="text-muted hover:text-ink">{t('nav.tutor')}</Link>
          <Link href="/book" className="text-muted hover:text-ink">{t('nav.book')}</Link>
        </nav>
        <div className="flex flex-col gap-2.5 text-[0.95rem]">
          <p className="mb-1 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-gold">{t('footer.contact')}</p>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 break-all text-muted hover:text-ink"><Mail size={16} aria-hidden="true" />{contact.email}</a>
          <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted hover:text-ink"><MessageCircle size={16} aria-hidden="true" />WhatsApp <span dir="ltr">{contact.phoneDisplay}</span></a>
        </div>
        <nav aria-label={t('footer.legal')} className="flex flex-col gap-2.5 text-[0.95rem]">
          <p className="mb-1 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-gold">{t('footer.legal')}</p>
          <Link href="/contact" className="text-muted hover:text-ink">{t('footer.privacy')}</Link>
          <Link href="/contact" className="text-muted hover:text-ink">{t('footer.terms')}</Link>
          <Link href="/contact" className="text-muted hover:text-ink">{t('footer.refunds')}</Link>
        </nav>
      </div>
      <div className="container-page border-t border-white/10 py-6 text-sm text-muted">{t('footer.rights', { year })}</div>
    </footer>
  );
}
