import Link from "next/link"


import { Footer } from "@/components/shared/Footer"
import { Header } from "@/components/shared/Header"
import { Hero } from "@/components/home/Hero"
import { WhyChooseUs } from "@/components/home/WhyChooseUs"
import { Testimonials } from "@/components/home/Testimonials"
import { CallToAction } from "@/components/home/CallToAction/CallToAction"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <WhyChooseUs />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}