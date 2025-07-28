import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const status = {
    timestamp: new Date().toISOString(),
    services: {
      database: { status: 'unknown', message: '' },
      filesystem: { status: 'unknown', message: '' },
      cloudinary: { status: 'unknown', message: '' },
      email: { status: 'unknown', message: '' }
    },
    overall: 'checking'
  }

  // Check MongoDB
  try {
    const connection = await dbConnect()
    if (connection) {
      status.services.database = { status: 'healthy', message: 'Connected' }
    } else {
      status.services.database = { status: 'degraded', message: 'Not configured' }
    }
  } catch (error) {
    status.services.database = { status: 'unhealthy', message: 'Connection failed' }
  }

  // Check filesystem access
  try {
    const dataDir = path.join(process.cwd(), 'data')
    if (fs.existsSync(dataDir)) {
      status.services.filesystem = { status: 'healthy', message: 'Accessible' }
    } else {
      status.services.filesystem = { status: 'degraded', message: 'Data directory missing' }
    }
  } catch (error) {
    status.services.filesystem = { status: 'unhealthy', message: 'Access denied' }
  }

  // Check Cloudinary configuration
  try {
    const hasCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && 
                             process.env.CLOUDINARY_API_KEY && 
                             process.env.CLOUDINARY_API_SECRET)
    if (hasCloudinary) {
      status.services.cloudinary = { status: 'healthy', message: 'Configured' }
    } else {
      status.services.cloudinary = { status: 'degraded', message: 'Not configured (using local storage)' }
    }
  } catch (error) {
    status.services.cloudinary = { status: 'unhealthy', message: 'Configuration error' }
  }

  // Check email configuration
  try {
    const hasEmail = !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)
    if (hasEmail) {
      status.services.email = { status: 'healthy', message: 'Configured' }
    } else {
      status.services.email = { status: 'degraded', message: 'Not configured' }
    }
  } catch (error) {
    status.services.email = { status: 'unhealthy', message: 'Configuration error' }
  }

  // Determine overall status
  const healthyCount = Object.values(status.services).filter(s => s.status === 'healthy').length
  const totalCount = Object.keys(status.services).length
  
  if (healthyCount === totalCount) {
    status.overall = 'healthy'
  } else if (healthyCount >= totalCount / 2) {
    status.overall = 'degraded'
  } else {
    status.overall = 'unhealthy'
  }

  const httpStatus = status.overall === 'unhealthy' ? 503 : 200

  return NextResponse.json(status, { status: httpStatus })
}
