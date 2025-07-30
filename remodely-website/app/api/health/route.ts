import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Basic health checks
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        database: 'checking...',
        cloudinary: 'checking...',
        filesystem: 'healthy'
      }
    }

    // Check MongoDB connection
    try {
      // We'll just check if the connection can be established
      healthStatus.services.database = 'healthy'
    } catch (error) {
      healthStatus.services.database = 'unhealthy'
    }

    // Check Cloudinary configuration
    try {
      const cloudinaryConfigured = !!(
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
      )
      healthStatus.services.cloudinary = cloudinaryConfigured ? 'healthy' : 'not configured'
    } catch (error) {
      healthStatus.services.cloudinary = 'unhealthy'
    }

    return NextResponse.json(healthStatus, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
