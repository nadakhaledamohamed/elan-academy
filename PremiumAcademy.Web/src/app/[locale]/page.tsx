import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { Marquee, Stats, Why, Journey, Tutor, Testimonials, Faq, Cta } from '@/components/home/Sections';
import { Pricing } from '@/components/home/Pricing';
import { Library } from '@/components/home/Library';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <Library />
      <Why />
      <Journey />
      <Tutor />
      <Pricing />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}
