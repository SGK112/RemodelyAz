import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { sendContactEmail } from '@/lib/email-service'
import mongoose from 'mongoose'

// Define the quick quote schema
const quickQuoteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    projectType: { type: String, required: true },
    propertyType: { type: String, enum: ['residential', 'commercial'], required: true },
    timeframe: { type: String, required: true },
    estimatedBudget: { type: String, required: true },
    projectDescription: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['new', 'quoted', 'contacted', 'closed'], default: 'new' },
    type: { type: String, default: 'quick-quote' }
})

// Create or get the QuickQuote model
const QuickQuote = mongoose.models.QuickQuote || mongoose.model('QuickQuote', quickQuoteSchema)

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate required fields
        const { name, email, phone, projectType, propertyType, timeframe, estimatedBudget, projectDescription } = body
        if (!name || !email || !projectType || !propertyType || !timeframe || !estimatedBudget || !projectDescription) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        let quoteId = null

        // Try to connect to database (gracefully handle failures)
        try {
            const connection = await dbConnect()
            
            if (connection) {
                // Save to database if MongoDB is available
                const quote = new QuickQuote(body)
                const savedQuote = await quote.save()
                quoteId = savedQuote._id
                console.log('Quick quote saved to database successfully')
            } else {
                console.warn('MongoDB not available, skipping database save')
            }
        } catch (dbError) {
            console.error('Database error (continuing without save):', dbError)
        }

        // Send email notification (this is the critical part for lead generation)
        try {
            // Format budget display
            const budgetOptions: Record<string, string> = {
                'under-10k': 'Under $10,000',
                '10k-25k': '$10,000 - $25,000',
                '25k-50k': '$25,000 - $50,000',
                '50k-100k': '$50,000 - $100,000',
                'over-100k': 'Over $100,000'
            }
            const budgetDisplay = budgetOptions[estimatedBudget] || estimatedBudget

            // Format timeframe display
            const timeframeOptions: Record<string, string> = {
                'asap': 'ASAP',
                '1-3-months': '1-3 months',
                '3-6-months': '3-6 months',
                '6-12-months': '6-12 months',
                'planning': 'Just planning'
            }
            const timeframeDisplay = timeframeOptions[timeframe] || timeframe

            // Format project type display
            const projectTypeOptions: Record<string, string> = {
                'kitchen-remodel': 'Kitchen Remodel',
                'bathroom-remodel': 'Bathroom Remodel',
                'countertops': 'Countertops',
                'flooring': 'Flooring',
                'home-addition': 'Home Addition',
                'commercial-renovation': 'Commercial Renovation',
                'other': 'Other'
            }
            const projectTypeDisplay = projectTypeOptions[projectType] || projectType

            const emailData = {
                name,
                email,
                phone: phone || 'Not provided',
                projectType: projectTypeDisplay,
                budget: budgetDisplay,
                message: `Quick Quote Request:

Project Type: ${projectTypeDisplay}
Property Type: ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
Timeframe: ${timeframeDisplay}
Budget Range: ${budgetDisplay}
Phone: ${phone || 'Not provided'}

Project Description:
${projectDescription}

--- Quick Quote Request ---
This lead came from the quick quote modal on the website.
Priority: HIGH - Customer is actively seeking a quote.
Response time target: Within 2 hours.`,
                propertyType: propertyType as 'residential' | 'commercial'
            }

            await sendContactEmail(emailData)
            console.log('Quick quote email sent successfully')
            
        } catch (emailError) {
            console.error('Email error:', emailError)
            // Don't fail the request if email fails, but log it
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Quick quote request submitted successfully',
            quoteId: quoteId?.toString()
        })

    } catch (error) {
        console.error('Quick quote submission error:', error)
        return NextResponse.json(
            { error: 'Failed to submit quick quote request' },
            { status: 500 }
        )
    }
}
