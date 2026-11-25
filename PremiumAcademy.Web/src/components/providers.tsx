'use client';

import { ThemeProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';
import { ScrollProgress, SmoothScroll } from './scroll';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} storageKey="elan-theme">
      <MotionConfig reducedMotion="never">
        <SmoothScroll>
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </MotionConfig>
    </ThemeProvider>
  );
}
