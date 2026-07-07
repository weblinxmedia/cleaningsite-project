// app/layout.tsx

import type { Metadata } from 'next'
import './globals.css'
import '@/components/Preloader/preloader.css'
import { Parkinsans, Outfit } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from './Providers'
import { getSettings } from '@/lib/getSettings'
import ScrollToTop from '@/components/ScrollToTop'
import NextTopLoader from 'nextjs-toploader'; // 🔹 Import the loader

export const dynamic = 'force-dynamic'

const parkinsans = Parkinsans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-parkinsans',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initialSettings = await getSettings()

  return (
    <html lang="en" className={`${parkinsans.variable} ${outfit.variable} scroll-smooth`}>
      <body className={`${parkinsans.className} ${outfit.className} antialiased bg-white text-gray-900`} suppressHydrationWarning>
        {/* 🔹 SERVER-RENDERED PRELOADER — visible from first paint, before JS loads */}
        <div
          id="server-preloader"
          suppressHydrationWarning
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999999999,
            pointerEvents: 'auto',
          }}
          aria-hidden="true"
        >
          {/* Left curtain half */}
          <div
            id="server-preloader-left"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '50%',
              background: '#ffffff',
            }}
          />
          {/* Right curtain half */}
          <div
            id="server-preloader-right"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '50%',
              background: '#ffffff',
            }}
          />
          {/* Centered logo */}
          <div
            id="server-preloader-logo"
            className="preloader-logo-pulse"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            <img
              src={initialSettings?.logo_url || '/images/mainlogo.webp'}
              alt=""
              style={{
                width: 160,
                height: 'auto',
                filter: 'drop-shadow(0 4px 24px rgba(130,31,64,0.18))',
              }}
            />
          </div>
        </div>

        {/* Inline script: if already visited this session, hide the server preloader immediately */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('preloader_shown')) {
                  var el = document.getElementById('server-preloader');
                  if (el) el.style.display = 'none';
                  document.body.style.overflow = '';
                } else {
                  document.body.style.overflow = 'hidden';
                }
              } catch(e) {}
            `,
          }}
        />

        {/* 🔹 Horizontal Loading Bar Configuration */}
        <NextTopLoader
          color="var(--color-luxury-pink)"
          initialPosition={0.08}
          crawlSpeed={200}
          zIndex={99999999999}
          height={4}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px var(--color-luxury-pink),0 0 5px var(--color-luxury-pink)"
        />

        <ScrollToTop />
        <Providers initialSettings={initialSettings}>
          <main>{children}</main>
        </Providers>
      </body>
    </html >
  )
}