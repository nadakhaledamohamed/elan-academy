import type { Config } from 'tailwindcss';

const c = (v: string) => `rgb(var(--${v}) / <alpha-value>)`;

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: c('bg'), bg2: c('bg2'), card: c('card'), ink: c('ink'), muted: c('muted'),
        line: c('line'), emerald: c('emerald'), accent: c('accent'), gold: c('gold'),
      },
      fontFamily: { sans: ['var(--font-body)'], display: ['var(--font-display)'] },
      maxWidth: { page: '1200px' },
      transitionTimingFunction: { elan: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
} satisfies Config;
