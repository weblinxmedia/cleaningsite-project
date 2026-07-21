'use client'
import Image from 'next/image'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
export default function WhyChooseImage() {
  const animRef = useScrollAnimation()
  return (
    <div ref={animRef} className="relative w-full h-[350px] md:h-[680px] lg:h-[750px] rounded-2xl overflow-hidden shadow-2xl group">
      <img
        src="/images/reviewsimage.webp"
        alt="Windows cleaning near me"

        className="object-cover transition-transform duration-700 ease-out"
      />
    </div>
  )
}