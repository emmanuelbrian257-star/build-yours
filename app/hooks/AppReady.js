"use client"
import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"


gsap.registerPlugin(ScrollTrigger)

export default function useAppReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setReady(true)
        
        ScrollTrigger.refresh()
      }, 150) 
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      
    }
    return () => window.removeEventListener('load', handleLoad)
  }, [])

  return ready
}