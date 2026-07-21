import { Metadata } from 'next'
import { getSettings } from '@/lib/getSettings'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'
import { unstable_cache } from 'next/cache'
const getCachedSettings = unstable_cache(
  async () => getSettings(),
  ['site-settings'],
  { revalidate: 3600, tags: ['site-settings'] }
)

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getCachedSettings()
    return {
      title: settings.meta_title || "Shazam Clean Windows | Best Windows & Solar Panel Cleaner in CA",
      description: settings.meta_description || 'Shazam Clean Windows provides spot-free & best residential window cleaning throughout Pasadena , Burbank, Glendale , Arcadia and the surrounding Greater Los Angeles Area. Over 20 years of experience, we stand out as the best windows & solar cleaning in areas like "best windows cleaning near me", "windows cleaning near me", and others alot.',
      keywords: settings.meta_keywords ? settings.meta_keywords.split(',').map((k) => k.trim()) : [],

    }
  } catch {
    return {
      title: 'Shazam Clean Windows | Best Windows & Solar Panel Cleaner in CA',
      description: 'Shazam Clean Windows provides spot-free & best residential window cleaning throughout Pasadena , Burbank, Glendale , Arcadia and the surrounding Greater Los Angeles Area. Over 20 years of experience, we stand out as the best windows & solar cleaning in areas like "best windows cleaning near me", "windows cleaning near me", and others alot.',
    }
  }
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatBot />
    </>
  )
}