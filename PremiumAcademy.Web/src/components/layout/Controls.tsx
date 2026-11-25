'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
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
      className="min-h-[44px] px-2 text-sm underline-offset-[6px] hover:underline"
    >
      {next === 'ar' ? t('toArabic') : t('toEnglish')}
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
    <button
      type="button"
      aria-label={t('switchTheme')}
      aria-pressed={dark}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 text-sm"
    >
      {dark ? <Sun size={18} strokeWidth={1.25} aria-hidden="true" /> : <Moon size={18} strokeWidth={1.25} aria-hidden="true" />}
      <span className="hidden xl:inline">{dark ? t('themeLight') : t('themeDark')}</span>
    </button>
  );
}
