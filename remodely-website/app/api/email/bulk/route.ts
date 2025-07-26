import { NextRequest, NextResponse } from 'next/server'
import { sendBulkEmail } from '../../../../lib/email-service'

export async function POST(request: NextRequest) {
    try {
        const { recipients, subject, htmlContent, apiKey } = await request.json()

        // Basic API key authentication for bulk email
        if (apiKey !== process.env.BULK_EMAIL_API_KEY) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
            return NextResponse.json(
                { error: 'Recipients array is required' },
                { status: 400 }
            )
        }

        if (!subject || !htmlContent) {
            return NextResponse.json(
                { error: 'Subject and htmlContent are required' },
                { status: 400 }
            )
        }

        const results = await sendBulkEmail(recipients, subject, htmlContent)

        const successCount = results.filter(r => r.success).length
        const failureCount = results.filter(r => !r.success).length

        return NextResponse.json({
            message: `Bulk email completed. ${successCount} sent, ${failureCount} failed.`,
            results,
            summary: {
                total: recipients.length,
                success: successCount,
                failed: failureCount
            }
        })
    } catch (error) {
        console.error('Bulk email API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
