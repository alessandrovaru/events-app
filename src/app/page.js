import { Hero } from "@/components/home/Hero"
import { WhyChooseUs } from "@/components/home/WhyChooseUs"
import { Testimonials } from "@/components/home/Testimonials"
import { CallToAction } from "@/components/home/CallToAction/CallToAction"

export default function Component() {
  return (
    <main className="flex-1">
      <Hero />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </main>
  )
}