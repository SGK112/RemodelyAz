import './globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AppInitializer from '@/components/AppInitializer'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
})

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
    themeColor: '#3B82F6'
}

export const metadata: Metadata = {
    title: 'REMODELY LLC - Premium Kitchen & Bath Remodeling Arizona',
    description: 'Transform your Arizona home with REMODELY LLC\'s expert kitchen and bathroom remodeling services. Premium quality, modern designs, residential & commercial.',
    keywords: 'kitchen remodeling Arizona, bathroom remodeling Phoenix, home renovation Surprise AZ, commercial remodeling, modern design Arizona, REMODELY LLC',
    authors: [{ name: 'REMODELY LLC' }],
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'REMODELY LLC'
    },
    formatDetection: {
        telephone: true,
        date: false,
        address: true,
        email: true
    },
    openGraph: {
        title: 'REMODELY LLC - Premium Kitchen & Bath Remodeling Arizona',
        description: 'Transform your Arizona home with expert remodeling services.',
        url: 'https://www.remodely-az.com',
        siteName: 'REMODELY LLC',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'REMODELY LLC - Premium Kitchen & Bath Remodeling Arizona',
        description: 'Transform your Arizona home with expert remodeling services.',
        images: ['/og-image.jpg'],
    },
    robots: 'index, follow',
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
            { url: '/favicon.svg', type: 'image/svg+xml' }
        ],
        apple: '/favicon.svg',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
            <head>
                <meta name="theme-color" content="#E97626" />
            </head>
            <body className={`${inter.className} antialiased`}>
                <AppInitializer />
                <Navbar />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
