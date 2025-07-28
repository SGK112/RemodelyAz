import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { sendContactEmail, ContactFormData } from '@/lib/email-service'
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

        let contactId = null

        // Try to connect to database (gracefully handle failures)
        try {
            const connection = await dbConnect()
            
            if (connection) {
                // Save to database if MongoDB is available
                const contact = new Contact(body)
                const savedContact = await contact.save()
                contactId = savedContact._id
                console.log('Contact saved to database successfully')
            } else {
                console.warn('MongoDB not available, skipping database save')
            }
        } catch (dbError) {
            console.error('Database save failed, continuing with email:', dbError)
            // Continue processing even if database fails
        }

        // Send email notification (this should always work)
        let emailSuccess = false
        try {
            const emailResult = await sendContactEmail(body)
            emailSuccess = emailResult.success
            
            if (!emailSuccess) {
                console.error('Failed to send email:', emailResult.error)
            }
        } catch (emailError) {
            console.error('Email sending failed:', emailError)
        }

        // Return success if either database OR email worked
        if (contactId || emailSuccess) {
            return NextResponse.json(
                {
                    message: 'Contact form submitted successfully',
                    id: contactId,
                    emailSent: emailSuccess,
                    databaseSaved: !!contactId
                },
                { status: 200 }
            )
        } else {
            // Both database and email failed
            return NextResponse.json(
                { 
                    error: 'Contact form submission failed. Please try again or contact us directly.',
                    message: 'Both database and email delivery failed'
                },
                { status: 500 }
            )
        }

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

        // Try to connect to database
        const connection = await dbConnect()
        
        if (!connection) {
            return NextResponse.json(
                { 
                    error: 'Database not available',
                    contacts: [],
                    pagination: { page: 1, limit: 10, total: 0, pages: 0 }
                },
                { status: 503 }
            )
        }

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
            { 
                error: 'Unable to fetch contacts at this time',
                contacts: [],
                pagination: { page: 1, limit: 10, total: 0, pages: 0 }
            },
            { status: 500 }
        )
    }
}
