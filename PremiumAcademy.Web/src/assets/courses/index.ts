import type { StaticImageData } from 'next/image';
import type { CourseSlug } from '@/content/site';
import foundation from './foundation.jpg';
import tajweed from './tajweed.jpg';
import hifz from './hifz.jpg';
import arabic from './arabic.jpg';
import islamicStudies from './islamic-studies.jpg';

/** Course pictures, imported so the bundler fingerprints them and a missing file fails the build instead of showing an empty card. */
export const coursePhotos: Record<CourseSlug, StaticImageData> = {
  foundation,
  tajweed,
  hifz,
  arabic,
  'islamic-studies': islamicStudies,
};
