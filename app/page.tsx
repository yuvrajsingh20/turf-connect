import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { GameCards } from "@/components/game-cards"
import { Features } from "@/components/features"
import { CTASection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"

/* Landing page wiring — all components imported and rendered from page.tsx */
export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <HowItWorks />
      <GameCards />
      <Features />
      <CTASection />
      <SiteFooter />
    </main>
  )
}
