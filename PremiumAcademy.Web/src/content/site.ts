// Business data. Stage 3 replaces courses and plans with API calls at build time;
// until then this file is the single source, and prices are never typed into components.

export const contact = {
  email: 'Enaselsayedmokhtar@gmail.com',
  phoneDisplay: '+20 10 9298 9541',
  whatsapp: '201092989541',
};

export type CourseSlug = 'foundation' | 'tajweed' | 'hifz' | 'arabic' | 'islamic-studies';

/** Each course has its own colour pair for its cover; the artwork lives in components/geometry/CourseEmblem. */
export const courses: Array<{ slug: CourseSlug; from: string; to: string; glow: string }> = [
  { slug: 'foundation', from: '#12805F', to: '#06281F', glow: '#3DD9A4' },
  { slug: 'tajweed', from: '#B4472A', to: '#33110A', glow: '#FF9A6B' },
  { slug: 'hifz', from: '#B58419', to: '#33240A', glow: '#FFD778' },
  { slug: 'arabic', from: '#176C8C', to: '#071F2A', glow: '#6FD3F5' },
  { slug: 'islamic-studies', from: '#5B43A0', to: '#150F2B', glow: '#B9A4FF' },
];

export const durations = [30, 45, 60] as const;
export type Duration = (typeof durations)[number];

/** Monthly plans in USD: lessons per week × lesson length. PLACEHOLDER figures taken from the reference site at the owner's request; confirm before launch. */
export const plans: Array<{ perWeek: number; price: Record<Duration, number> }> = [
  { perWeek: 1, price: { 30: 17, 45: 25.5, 60: 34 } },
  { perWeek: 2, price: { 30: 34, 45: 51, 60: 68 } },
  { perWeek: 3, price: { 30: 51, 45: 76, 60: 102 } },
  { perWeek: 4, price: { 30: 68, 45: 102, 60: 136 } },
  { perWeek: 5, price: { 30: 85, 45: 127, 60: 170 } },
];

export const planId = (perWeek: number, duration: Duration) => `w${perWeek}-m${duration}`;
