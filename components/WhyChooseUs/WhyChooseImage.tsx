'use client'
import Image from 'next/image'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
export default function WhyChooseImage() {
  const animRef = useScrollAnimation()
  return (
    <div ref={animRef} className="relative w-full h-[350px] md:h-[500px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
      <img
        src="/images/homepage/storefront.webp"
        alt="Windows cleaning near me"

        className="object-cover w-[100%] h-[100%] transition-transform duration-700 ease-out"
      />
    </div>
  )
}