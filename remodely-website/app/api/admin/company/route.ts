import { NextResponse } from 'next/server'
import companyData from '@/data/company.json'

export async function GET() {
  try {
    return NextResponse.json(companyData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch company data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const company = await request.json()
    // In a real app, you would save to database here
    return NextResponse.json({ success: true, company })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update company' }, { status: 500 })
  }
}
