import './globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
    title: {
        default: 'REMODELY - Arizona Kitchen & Bathroom Remodeling Experts',
        template: '%s | REMODELY Arizona'
    },
    description: 'Professional kitchen and bathroom remodeling services in Arizona. Licensed contractor (AzRoc #327266) with 400+ completed projects. Get your free consultation today.',
    keywords: ['kitchen remodeling Arizona', 'bathroom renovation Arizona', 'countertops Arizona', 'cabinet installation', 'home remodeling Phoenix', 'licensed contractor Arizona'],
    authors: [{ name: 'REMODELY Arizona' }],
    creator: 'REMODELY Arizona',
    publisher: 'REMODELY Arizona',
    metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://remodelyaz.onrender.com' : 'http://localhost:3000'),
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
                <Navbar />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
