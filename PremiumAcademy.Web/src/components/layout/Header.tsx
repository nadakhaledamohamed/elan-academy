'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { LocaleSwitch, ThemeToggle } from './Controls';

const links = [
  { href: '/', key: 'home' },
  { href: '/courses', key: 'courses' },
  { href: '/about', key: 'about' },
  { href: '/tutor', key: 'tutor' },
  { href: '/book', key: 'book' },
  { href: '/contact', key: 'contact' },
] as const;

export function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Élan Academy">
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
        <defs>
          <linearGradient id="lm-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#15805F" /><stop offset="1" stopColor="#052A20" /></linearGradient>
          <linearGradient id="lm-au" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F6DE9E" /><stop offset="1" stopColor="#C8962E" /></linearGradient>
        </defs>
        <rect x="1" y="1" width="38" height="38" rx="11" fill="url(#lm-bg)" stroke="url(#lm-au)" strokeWidth="1.2" />
        {/* Mushaf: an open book on its stand */}
        <g fill="none" stroke="url(#lm-au)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 14.5c-3.2-2.6-8-2.9-11.5-1.3v13.6c3.5-1.6 8.3-1.3 11.5 1.3 3.2-2.6 8-2.9 11.5-1.3V13.2c-3.5-1.6-8.3-1.3-11.5 1.3z" fill="rgb(246 222 158 / 0.14)" />
          <path d="M20 14.5v13.6" />
          <path d="M12 17.2c1.8-.5 3.6-.4 5.2.2M12 21c1.8-.5 3.6-.4 5.2.2M22.8 17.4c1.6-.6 3.4-.7 5.2-.2M22.8 21.2c1.6-.6 3.4-.7 5.2-.2" strokeWidth="1.3" />
          <path d="M12.5 33l7.5-4.9 7.5 4.9" />
        </g>
        <path d="M20 5.2l1.9 1.9-1.9 1.9-1.9-1.9z" fill="url(#lm-au)" />
      </svg>
      <span lang="en" className="text-[1.15rem] font-bold tracking-[-0.02em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Élan <span className="font-medium opacity-70">Academy</span>
      </span>
    </Link>
  );
}

/** A floating glass bar. It always uses the emerald palette so it reads on every section in both themes. */
export function Header() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-gold focus:px-4 focus:py-3 focus:text-black">
        {t('skip')}
      </a>
      <motion.header
        className="on-emerald fixed inset-x-0 top-3 z-50 px-3"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="mx-auto flex h-[60px] max-w-page items-center justify-between rounded-full border border-white/10 ps-5 pe-2 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)]"
          style={{ background: 'rgb(5 26 20 / 0.86)', WebkitBackdropFilter: 'blur(18px) saturate(150%)', backdropFilter: 'blur(18px) saturate(150%)' }}
        >
          <Wordmark />
          <nav aria-label="Primary" className="hidden items-center gap-1 text-[0.92rem] lg:flex">
            {links.slice(1, 4).map((l) => (
              <Link key={l.key} href={l.href} className="rounded-full px-4 py-2 text-ink/80 transition-colors hover:bg-white/10 hover:text-ink">
                {t(l.key)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <LocaleSwitch />
            <ThemeToggle />
            <Link href="/book" className="btn btn-gold ms-1 hidden !min-h-[44px] !px-5 !text-[0.88rem] sm:inline-flex">
              {t('bookTrial')}
            </Link>
            <button type="button" aria-expanded={open} aria-controls="site-menu" aria-label={open ? t('close') : t('menu')} onClick={() => setOpen((v) => !v)} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10 lg:hidden">
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t('menu')}
            className="on-emerald emerald-panel fixed inset-0 z-40 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav aria-label="Menu" className="container-page flex min-h-full flex-col justify-center gap-2 pb-12 pt-28">
              {links.map((l, i) => (
                <motion.div key={l.key} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-2xl font-semibold tracking-[-0.02em]">
                    {t(l.key)}
                    <span className="text-sm font-medium text-gold">{String(i + 1).padStart(2, '0')}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
