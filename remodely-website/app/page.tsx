import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import SocialProof from '@/components/SocialProof'
import CTA from '@/components/CTA'

export default function Home() {
    return (
        <>
            <Hero />
            <Services />
            <Gallery />
            <Testimonials />
            <SocialProof />
            <CTA />
        </>
    )
}
