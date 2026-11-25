import type { ReactNode } from 'react';

// The <html> element lives in [locale]/layout.tsx so lang and dir are correct per language.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
