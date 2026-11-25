'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { LocaleSwitch, ThemeToggle } from './Controls';
import { Halo } from '@/components/geometry/Rosette';
import { cn } from '@/lib/cn';

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
    <Link href="/" className="flex items-baseline gap-3" aria-label="Élan Academy">
      <span lang="en" className="text-[2.1rem] leading-none text-accent" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
        Élan
      </span>
      <span lang="en" className="text-[11px] uppercase text-ink" style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: '0.24em' }}>
        Academy
      </span>
    </Link>
  );
}

export function Header() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 24));

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
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-3 focus:text-on-primary">
        {t('skip')}
      </a>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 text-ink transition-[background-color,border-color] duration-500',
          open && 'menu-open',
          solid && !open ? 'border-b border-line bg-bg/90 backdrop-blur' : 'border-b border-transparent',
        )}
      >
        <div className="container-page flex h-[72px] items-center justify-between">
          <Wordmark />
          <nav aria-label="Primary" className="hidden items-center gap-9 text-sm lg:flex">
            {links.slice(1, 4).map((l) => (
              <Link key={l.key} href={l.href} className="underline-offset-[8px] decoration-brass hover:underline">
                {t(l.key)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1 md:gap-3">
            <LocaleSwitch />
            <ThemeToggle />
            <Link href="/book" className="ms-3 hidden min-h-[44px] items-center border border-brass px-5 pt-[3px] text-[12px] uppercase tracking-[0.18em] transition-colors hover:bg-primary hover:text-on-primary md:inline-flex">
              {t('bookTrial')}
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
              className="ms-2 flex min-h-[44px] items-center gap-3 text-sm"
            >
              <span>{open ? t('close') : t('menu')}</span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span className={cn('absolute inset-x-0 top-0 h-px bg-ink transition-transform duration-500', open && 'translate-y-[6px] rotate-45')} />
                <span className={cn('absolute inset-x-0 bottom-0 h-px bg-ink transition-transform duration-500', open && '-translate-y-[5px] -rotate-45')} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t('menu')}
            className="fixed inset-0 z-40 overflow-y-auto bg-arch text-on-arch"
            initial={{ clipPath: 'circle(0% at 50% 0%)' }}
            animate={{ clipPath: 'circle(150% at 50% 0%)' }}
            exit={{ clipPath: 'circle(0% at 50% 0%)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Halo className="pointer-events-none absolute -end-40 top-1/2 w-[720px] -translate-y-1/2 text-on-arch/20" />
            <nav aria-label="Menu" className="container-page relative flex min-h-full flex-col justify-center gap-1 pb-16 pt-28">
              {links.map((l, i) => (
                <motion.div
                  key={l.key}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={l.href} onClick={() => setOpen(false)} className="group flex items-baseline gap-6 border-b border-on-arch/15 py-4">
                    <span className="w-8 text-sm text-on-arch/60">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-[clamp(2rem,6vw,4rem)] font-light leading-tight transition-transform duration-500 ease-elan group-hover:translate-x-3 rtl:group-hover:-translate-x-3">
                      {t(l.key)}
                    </span>
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
