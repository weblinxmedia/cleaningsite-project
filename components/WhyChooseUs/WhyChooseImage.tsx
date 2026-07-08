'use client'
import Image from 'next/image'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
export default function WhyChooseImage() {
  const animRef = useScrollAnimation()
  return (
    <div ref={animRef} className="relative w-full max-h-[300px] md:h-[450px] lg:h-[580px] rounded-2xl overflow-hidden shadow-2xl group">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqSQpYoAp8_kz_0aTZG-8lhvLdIdk_kbSijXQxTzCImg&s=10"
        alt="Sparkling clean office space"


        className="object-cover transition-transform duration-700 ease-out"

      />
      {/* Luxury bottom gradient overlay */}
    </div>
  )
}