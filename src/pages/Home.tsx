import { Seo } from '@/components/common/Seo'
import { Hero } from '@/components/home/Hero'
import {
  CategoriesSection,
  CtaSection,
  PopularCourses,
  Testimonials,
  TopInstructors,
  WhyLearnify,
} from '@/components/home/HomeSections'
import { StatsBar } from '@/components/home/StatsBar'

export default function Home() {
  return (
    <>
      <Seo title="Learnify" />
      <Hero />
      <StatsBar />
      <PopularCourses />
      <CategoriesSection />
      <WhyLearnify />
      <TopInstructors />
      <Testimonials />
      <CtaSection />
    </>
  )
}
