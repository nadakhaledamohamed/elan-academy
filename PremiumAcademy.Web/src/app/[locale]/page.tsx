import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { Intro } from '@/components/home/Intro';
import { Philosophy } from '@/components/home/Philosophy';
import { CoursesRail } from '@/components/home/CoursesRail';
import { Why, TutorTeaser, Method, How, Faq, Cta } from '@/components/home/Sections';
import { Fees } from '@/components/home/Fees';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <Intro />
      <Philosophy />
      <CoursesRail />
      <Why />
      <TutorTeaser />
      <Method />
      <How />
      <Fees />
      {/* Testimonials are intentionally absent: the section is added only when genuine ones are supplied. */}
      <Faq />
      <Cta />
    </>
  );
}
