'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useSettings } from '@/app/context/SettingsContext'
export default function Logo() {
  const { logo_url, site_name } = useSettings()
  const logoSrc = logo_url || '/images/tony1.webp'
  const altText = site_name || 'Shazam Clean Windows | Best Windows & Solar Cleaning in CA'
  return (
    <Link href="/" className="flex-shrink-0 text-2xl font-bold tracking-wider">
      <Image
        src={logoSrc}
        width={110}
        height={40}
        alt={altText}
        fetchPriority='high'
        priority
        loading="eager"
        quality={100}
        className="transition-all relative duration-300"
      />
    </Link>
  )
}