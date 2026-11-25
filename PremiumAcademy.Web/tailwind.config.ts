import type { Config } from 'tailwindcss';

const c = (v: string) => `rgb(var(--${v}) / <alpha-value>)`;

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: c('bg'),
        surface: c('surface'),
        ink: c('ink'),
        muted: c('muted'),
        primary: c('primary'),
        'on-primary': c('on-primary'),
        accent: c('accent'),
        brass: c('brass'),
        clay: c('clay'),
        line: c('line'),
        arch: c('arch'),
        'on-arch': c('on-arch'),
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-body)'],
      },
      maxWidth: { page: '1360px' },
      transitionTimingFunction: { elan: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
} satisfies Config;
