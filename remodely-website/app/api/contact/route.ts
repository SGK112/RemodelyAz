import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { sendContactEmail, ContactFormData } from '@/lib/mailer'
import mongoose from 'mongoose'

// Define the contact schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    projectType: { type: String, required: true },
    budget: { type: String, required: true },
    message: { type: String, required: true },
    propertyType: { type: String, enum: ['residential', 'commercial'], required: true },
    submittedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['new', 'contacted', 'quoted', 'closed'], default: 'new' }
})

// Create or get the Contact model
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema)

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json()

        // Validate required fields
        const { name, email, projectType, budget, message, propertyType } = body
        if (!name || !email || !projectType || !budget || !message || !propertyType) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Connect to database
        await dbConnect()

        // Save to database
        const contact = new Contact(body)
        await contact.save()

        // Send email notification
        const emailResult = await sendContactEmail(body)

        if (!emailResult.success) {
            console.error('Failed to send email:', emailResult.error)
            // Still return success if database save worked, but log the email error
        }

        return NextResponse.json(
            {
                message: 'Contact form submitted successfully',
                id: contact._id
            },
            { status: 200 }
        )

    } catch (error) {
        console.error('Contact form submission error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    try {
        // This endpoint could be used for admin dashboard to view submissions
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const status = searchParams.get('status')

        await dbConnect()

        const query = status ? { status } : {}
        const skip = (page - 1) * limit

        const contacts = await Contact.find(query)
            .sort({ submittedAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()

        const total = await Contact.countDocuments(query)

        return NextResponse.json({
            contacts,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        })

    } catch (error) {
        console.error('Error fetching contacts:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
