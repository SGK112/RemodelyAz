'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const PerformanceOptimizer = () => {
    const router = useRouter()

    useEffect(() => {
        // Preload critical pages after initial load
        const preloadPages = ['/contact', '/services', '/gallery', '/about']
        
        const preloadTimer = setTimeout(() => {
            preloadPages.forEach(page => {
                router.prefetch(page)
            })
        }, 2000) // Wait 2 seconds after initial load

        return () => clearTimeout(preloadTimer)
    }, [router])

    // Preload images that are likely to be viewed
    useEffect(() => {
        const preloadImages = [
            '/images/hero-bg.jpg',
            '/images/kitchen-remodel.jpg',
            '/images/bathroom-remodel.jpg'
        ]

        preloadImages.forEach(src => {
            const img = new Image()
            img.src = src
        })
    }, [])

    return null // This component doesn't render anything
}

export default PerformanceOptimizer
