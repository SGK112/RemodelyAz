import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const COMPANY_FILE = path.join(DATA_DIR, 'company.json')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize company data if file doesn't exist
if (!fs.existsSync(COMPANY_FILE)) {
  const defaultCompanyInfo = {
    name: 'REMODELY LLC',
    tagline: 'Transforming Arizona Homes with Excellence',
    description: 'Arizona\'s premier remodeling company specializing in kitchen renovations, bathroom remodels, commercial spaces, and complete home transformations.',
    address: '15464 W Aster Dr, Surprise, AZ 85379',
    phone: '(480) 255-5887',
    email: 'help.remodely@gmail.com',
    website: 'www.remodely.com',
    founded: '2009',
    services: [
      'Kitchen Remodeling',
      'Bathroom Renovation',
      'Commercial Remodeling',
      'Interior Design',
      'Home Additions',
      'Flooring Installation'
    ],
    lastUpdated: new Date().toISOString()
  }
  fs.writeFileSync(COMPANY_FILE, JSON.stringify(defaultCompanyInfo, null, 2))
}

export async function GET() {
  try {
    const data = fs.readFileSync(COMPANY_FILE, 'utf8')
    const companyInfo = JSON.parse(data)

    return NextResponse.json(companyInfo)
  } catch (error) {
    console.error('Error reading company info:', error)
    return NextResponse.json(
      { error: 'Failed to read company information' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const companyInfo = await request.json()

    // Add timestamp
    companyInfo.lastUpdated = new Date().toISOString()

    // Write to file
    fs.writeFileSync(COMPANY_FILE, JSON.stringify(companyInfo, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Company information updated successfully'
    })
  } catch (error) {
    console.error('Error updating company info:', error)
    return NextResponse.json(
      { error: 'Failed to update company information' },
      { status: 500 }
    )
  }
}
