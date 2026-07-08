'use client'
export const dynamic = 'force-dynamic'
import HeroBackground from './HeroBackground'
import HeroCard from './HeroCard'

export default function Hero() {
  return (
    <section className="relative nopadding w-full hero-position2 min-h-screen flex items-end justify-center">
      {/* Background Layer */}
      <HeroBackground />

      {/* Glass Card Layer (Centered) — uses CSS animation instead of GSAP for smoother entrance */}
      <div className="relative z-10 w-full h-[100vh] md:h-fit hero-position flex items-center justify-center">
        <div className="hero-card-entrance">
          <HeroCard />
        </div>
      </div>
    </section>
  )
}