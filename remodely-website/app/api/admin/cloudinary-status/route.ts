import { NextResponse } from 'next/server'
import { CloudinaryService } from '../../../../lib/cloudinary'

export async function GET() {
  try {
    const isAvailable = CloudinaryService.isAvailable()
    
    return NextResponse.json({
      available: isAvailable,
      cloudName: isAvailable ? process.env.CLOUDINARY_CLOUD_NAME : null,
      status: isAvailable ? 'configured' : 'not-configured'
    })
  } catch (error) {
    console.error('Error checking Cloudinary status:', error)
    return NextResponse.json({ 
      available: false, 
      status: 'error',
      error: 'Failed to check Cloudinary status'
    })
  }
}
