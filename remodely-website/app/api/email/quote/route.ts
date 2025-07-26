import { NextRequest, NextResponse } from 'next/server'
import { sendQuoteEmail } from '../../../../lib/email-service'

export async function POST(request: NextRequest) {
    try {
        const quoteData = await request.json()

        const requiredFields = ['name', 'email', 'projectType', 'estimatedCost', 'timeline']
        for (const field of requiredFields) {
            if (!quoteData[field]) {
                return NextResponse.json(
                    { error: `${field} is required` },
                    { status: 400 }
                )
            }
        }

        const result = await sendQuoteEmail(quoteData)

        if (result.success) {
            return NextResponse.json({
                message: 'Quote email sent successfully',
                messageId: result.messageId
            })
        } else {
            return NextResponse.json(
                { error: 'Failed to send quote email', details: result.error },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error('Quote email API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
