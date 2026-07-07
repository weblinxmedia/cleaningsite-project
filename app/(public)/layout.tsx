import { Metadata } from 'next'
import { getSettings } from '@/lib/getSettings'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ChatBot from '@/components/ChatBot'
import Preloader from '@/components/Preloader'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings()

    return {
      title: settings.meta_title || "Cornerstone Floor Care LLC | The Best Windows Cleaner in the Town",
      description: settings.meta_description || 'Premium cleaning services',
      keywords: settings.meta_keywords ? settings.meta_keywords.split(',').map((k) => k.trim()) : [],

    }
  } catch (error) {
    return {
      title: 'Cornerstone Floor Care LLC | The Best Windows Cleaner in the Town',
      description: 'Premium cleaning services',
    }
  }
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatBot />
    </>
  )
}