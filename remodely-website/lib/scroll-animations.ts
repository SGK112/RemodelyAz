/**
 * Smooth Scroll Animation Utility
 * Modern, performance-optimized animations for scroll-triggered elements
 */

'use client'

import { useEffect, useRef } from 'react'

interface AnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
  duration?: number
  easing?: string
}

/**
 * Hook for fade-in animations on scroll
 */
export function useFadeInOnScroll(options: AnimationOptions = {}) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const {
      threshold = 0.1,
      rootMargin = '0px 0px -100px 0px',
      triggerOnce = true,
      delay = 0,
      duration = 600,
      easing = 'cubic-bezier(0.4, 0, 0.2, 1)'
    } = options

    // Set initial state
    element.style.opacity = '0'
    element.style.transform = 'translateY(20px)'
    element.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          if (entry.isIntersecting) {
            target.style.opacity = '1'
            target.style.transform = 'translateY(0)'
            
            if (triggerOnce) {
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            target.style.opacity = '0'
            target.style.transform = 'translateY(20px)'
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return elementRef
}

/**
 * Enhanced smooth scroll with offset for fixed navbar
 */
export function smoothScrollTo(elementId: string, offset: number = 80) {
  const element = document.getElementById(elementId)
  if (!element) return

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  })
}
