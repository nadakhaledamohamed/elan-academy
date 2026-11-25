'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Languages, Moon, Sun } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { LOCALE_STORAGE_KEY } from '@/i18n/routing';

export function LocaleSwitch() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const next = locale === 'ar' ? 'en' : 'ar';
  return (
    <button
      type="button"
      aria-label={t('switchLanguage')}
      lang={next}
      onClick={() => {
        try {
          localStorage.setItem(LOCALE_STORAGE_KEY, next);
        } catch {}
        router.replace(pathname, { locale: next });
      }}
      className="flex h-11 items-center gap-2 rounded-full px-3 text-[0.88rem] font-medium hover:bg-white/10"
    >
      <Languages size={17} aria-hidden="true" />
      <span>{next === 'ar' ? t('toArabic') : t('toEnglish')}</span>
    </button>
  );
}

export function ThemeToggle() {
  const t = useTranslations('nav');
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === 'dark';
  return (
    <button type="button" aria-label={t('switchTheme')} aria-pressed={dark} onClick={() => setTheme(dark ? 'light' : 'dark')} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10">
      {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
