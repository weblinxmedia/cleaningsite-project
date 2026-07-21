import { Metadata } from 'next'
import { getSettings } from '@/lib/getSettings'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'
import { unstable_cache } from 'next/cache'
const getCachedSettings = unstable_cache(
  async () => getSettings(),
  ['site-settings'],
  { revalidate: 3600 } // re-fetch at most once per hour
)

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getCachedSettings()
    return {
      title: settings.meta_title || "Cornerstone Floor Care LLC | The Best Windows Cleaner in the Town",
      description: settings.meta_description || 'Premium cleaning services',
      keywords: settings.meta_keywords ? settings.meta_keywords.split(',').map((k) => k.trim()) : [],

    }
  } catch {
    return {
      title: 'Cornerstone Floor Care LLC | The Best Windows Cleaner in the Town',
      description: 'Premium cleaning services',
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