'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface SiteSettings {
  site_name: string
  phone: string
  email: string
  meta_title: string
  meta_description: string
  meta_keywords: string
  logo_url: string
  office_hours: string
  address: string
  hero_heading: string
  hero_image_url: string
  social_facebook: string
  social_instagram: string
  social_linkedin: string
}

const defaultSettings: SiteSettings = {
  site_name: "",
  phone: '+1 (301) 785-6581',
  email: '',
  meta_title: "",
  meta_description: 'Professional cleaning services',
  meta_keywords: 'cleaning, commercial, office',
  logo_url: '/images/tony1.webp',
  office_hours: 'Monday to Saturday, 9:00 AM to 4:00 PM',
  address: '',
  hero_heading: 'A Spotless Space, Without the Stress. Claim Your Free Quote Now!',
  hero_image_url: '/images/herobanner.webp',
  social_facebook: '',
  social_instagram: '',
  social_linkedin: '',
}

interface SettingsContextValue extends SiteSettings {
  dataReady: boolean
}

const SettingsContext = createContext<SettingsContextValue>({
  ...defaultSettings,
  dataReady: false,
})

export function SettingsProvider({
  children,
  initialData // 🔹 Receive initial data from server
}: {
  children: ReactNode,
  initialData: any
}) {
  // ─── Determine if the server gave us real data ───────────────────────────
  const hasServerData = initialData && Object.keys(initialData).length > 0

  // ─── Initial state: server data first, then localStorage, then defaults ──
  const [settings, setSettings] = useState<SiteSettings>(() => {
    if (hasServerData) return { ...defaultSettings, ...initialData }
    // SSR miss — try localStorage for an instant fallback (client only)
    try {
      const stored =
        typeof window !== 'undefined'
          ? localStorage.getItem('site_settings')
          : null
      if (stored) return { ...defaultSettings, ...JSON.parse(stored) }
    } catch { /* ignore */ }
    return { ...defaultSettings }
  })

  // ─── dataReady: true immediately if the server already gave us data ──────
  // This prevents components that gate on dataReady from showing stale content.
  const [dataReady, setDataReady] = useState(hasServerData)

  // ─── Background fetch: keeps settings in sync after dashboard changes ────
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings')
        if (res.ok) {
          const data = await res.json()
          const mergedSettings = { ...defaultSettings, ...data }
          // Only re-render if something actually changed
          setSettings(prev => {
            const prevStr = JSON.stringify(prev)
            const nextStr = JSON.stringify(mergedSettings)
            if (prevStr === nextStr) return prev // no-op — avoids re-render
            localStorage.setItem('site_settings', nextStr)
            return mergedSettings
          })
        }
      } catch (error) {
        console.error('Failed to load site settings:', error)
      } finally {
        setDataReady(true)
      }
    }
    fetchSettings()
  }, [])

  return (
    <SettingsContext.Provider value={{ ...settings, dataReady }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)