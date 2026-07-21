'use client'
export const dynamic = 'force-dynamic'
import Image from 'next/image'
import { useSettings } from '@/app/context/SettingsContext'

export default function HeroBackground() {
  const { hero_image_url } = useSettings()
  const imageSrc = hero_image_url || '/images/banner.jpg'

  return (
    <div className="absolute top-0 left-0 w-full h-[100%] z-0">
      <Image
        key={imageSrc}
        src={imageSrc}
        alt="Shazam Clean Windows | Best Windows Cleaning in Arcadia"
        fill
        priority
        sizes="100vw"
        className="object-cover no-repeat object-top md:object-left"
        quality={100}
      />
    </div>
  )
}