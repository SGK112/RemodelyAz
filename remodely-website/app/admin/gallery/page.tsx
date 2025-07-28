import { Metadata } from 'next'
import AdminGalleryManager from '../../../components/AdminGalleryManager'
import AuthWrapper from '../../../components/AuthWrapper'

export const metadata: Metadata = {
    title: 'Gallery Manager | RemodelyAz Admin',
    description: 'Manage your gallery images with Cloudinary integration',
}

export default function AdminGalleryPage() {
    return (
        <AuthWrapper>
            <AdminGalleryManager />
        </AuthWrapper>
    )
}
