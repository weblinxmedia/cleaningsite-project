'use client'

import { useEffect, useRef } from 'react'
import { useSettings } from '@/app/context/SettingsContext'
import './preloader.css'

export default function Preloader() {
  const { dataReady } = useSettings()
  const hasTriggeredExit = useRef(false)

  useEffect(() => {
    // If already visited this session, hide everything immediately
    const hasVisited = sessionStorage.getItem('preloader_shown')
    if (hasVisited) {
      hideServerPreloader()
      return
    }
  }, [])

  // Watch for dataReady — once the settings have loaded, trigger the exit animation
  useEffect(() => {
    if (!dataReady || hasTriggeredExit.current) return

    const hasVisited = sessionStorage.getItem('preloader_shown')
    if (hasVisited) return

    hasTriggeredExit.current = true

    // Small delay so the logo is visible for a moment after data loads
    const minDisplayTime = setTimeout(() => {
      triggerExitAnimation()
    }, 600)

    return () => clearTimeout(minDisplayTime)
  }, [dataReady])

  function triggerExitAnimation() {
    const serverPreloader = document.getElementById('server-preloader')
    const leftHalf = document.getElementById('server-preloader-left')
    const rightHalf = document.getElementById('server-preloader-right')
    const logoWrap = document.getElementById('server-preloader-logo')

    if (serverPreloader && leftHalf && rightHalf && logoWrap) {
      // Add CSS transition classes to the server-rendered elements
      leftHalf.classList.add('preloader-half', 'preloader-left', 'slide-out-left')
      rightHalf.classList.add('preloader-half', 'preloader-right', 'slide-out-right')
      logoWrap.classList.remove('preloader-logo-pulse')
      logoWrap.classList.add('preloader-logo', 'logo-slide-right')

      // After animation completes, hide (don't remove — removing breaks React's DOM tree)
      setTimeout(() => {
        hideServerPreloader()
        sessionStorage.setItem('preloader_shown', 'true')
      }, 1200)
    } else {
      hideServerPreloader()
      sessionStorage.setItem('preloader_shown', 'true')
    }
  }

  function hideServerPreloader() {
    const el = document.getElementById('server-preloader')
    if (el) {
      el.style.display = 'none'
      el.style.pointerEvents = 'none'
    }
    document.body.style.overflow = ''
  }

  // This component doesn't render any DOM of its own — it controls the server-rendered preloader
  return null
}
