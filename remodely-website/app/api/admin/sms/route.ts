import { NextRequest, NextResponse } from 'next/server'
import { sendSMS, sendSMSFromTemplate, getAllSMSTemplates, getSMSLog } from '../../../lib/twilio-service'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { action, ...data } = body

        switch (action) {
            case 'send':
                const result = await sendSMS({
                    to: data.to,
                    message: data.message,
                    projectId: data.projectId,
                    clientName: data.clientName
                })
                return NextResponse.json(result)

            case 'send_template':
                const templateResult = await sendSMSFromTemplate(
                    data.templateName,
                    data.to,
                    data.variables,
                    data.projectId,
                    data.clientName
                )
                return NextResponse.json(templateResult)

            default:
                return NextResponse.json(
                    { success: false, error: 'Invalid action' },
                    { status: 400 }
                )
        }
    } catch (error) {
        console.error('SMS API error:', error)
        return NextResponse.json(
            { success: false, error: 'SMS operation failed' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url)
        const action = url.searchParams.get('action')

        switch (action) {
            case 'templates':
                const templates = getAllSMSTemplates()
                return NextResponse.json({ success: true, templates })

            case 'log':
                const limit = parseInt(url.searchParams.get('limit') || '50')
                const log = await getSMSLog(limit)
                return NextResponse.json({ success: true, messages: log })

            default:
                return NextResponse.json(
                    { success: false, error: 'Invalid action' },
                    { status: 400 }
                )
        }
    } catch (error) {
        console.error('SMS API error:', error)
        return NextResponse.json(
            { success: false, error: 'SMS operation failed' },
            { status: 500 }
        )
    }
}
