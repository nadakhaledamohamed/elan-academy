// Business data. Stage 3 replaces courses and plans with API calls at build time;
// until then this file is the single source, and prices are never typed into components.

export const contact = {
  email: 'Enaselsayedmokhtar@gmail.com',
  phoneDisplay: '+20 10 9298 9541',
  whatsapp: '201092989541',
};

export type CourseSlug = 'foundation' | 'tajweed' | 'hifz' | 'arabic' | 'islamic-studies';

/** `fold` picks the constructed emblem for each subject (4-, 6-, 8-, 10- or 12-fold). */
export const courses: Array<{ slug: CourseSlug; fold: number; step: number }> = [
  { slug: 'foundation', fold: 4, step: 1 },
  { slug: 'tajweed', fold: 6, step: 1 },
  { slug: 'hifz', fold: 8, step: 3 },
  { slug: 'arabic', fold: 10, step: 3 },
  { slug: 'islamic-studies', fold: 12, step: 5 },
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
