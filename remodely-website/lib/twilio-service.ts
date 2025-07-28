import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

if (!accountSid || !authToken || !twilioPhoneNumber) {
    console.warn('Twilio credentials not configured. SMS functionality will be disabled.')
}

const client = accountSid && authToken ? twilio(accountSid, authToken) : null

export interface SMSMessage {
    to: string
    message: string
    projectId?: string
    clientName?: string
}

export interface SMSResponse {
    success: boolean
    messageId?: string
    error?: string
    status?: string
}

/**
 * Send SMS message via Twilio
 */
export async function sendSMS(messageData: SMSMessage): Promise<SMSResponse> {
    if (!client || !twilioPhoneNumber) {
        return {
            success: false,
            error: 'Twilio not configured'
        }
    }

    try {
        const message = await client.messages.create({
            body: messageData.message,
            from: twilioPhoneNumber,
            to: messageData.to
        })

        // Log SMS to database/JSON for CRM tracking
        await logSMSToDatabase({
            messageId: message.sid,
            to: messageData.to,
            message: messageData.message,
            status: message.status,
            projectId: messageData.projectId,
            clientName: messageData.clientName,
            sentAt: new Date()
        })

        return {
            success: true,
            messageId: message.sid,
            status: message.status
        }
    } catch (error) {
        console.error('SMS sending failed:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'SMS sending failed'
        }
    }
}

/**
 * Send bulk SMS messages
 */
export async function sendBulkSMS(messages: SMSMessage[]): Promise<SMSResponse[]> {
    const results = await Promise.all(
        messages.map(message => sendSMS(message))
    )
    return results
}

/**
 * Send SMS from template
 */
export async function sendSMSFromTemplate(
    templateName: string,
    to: string,
    variables: Record<string, string>,
    projectId?: string,
    clientName?: string
): Promise<SMSResponse> {
    const template = getSMSTemplate(templateName)
    if (!template) {
        return {
            success: false,
            error: `Template '${templateName}' not found`
        }
    }

    let message = template
    Object.entries(variables).forEach(([key, value]) => {
        message = message.replace(new RegExp(`\\[${key}\\]`, 'g'), value)
    })

    return sendSMS({ to, message, projectId, clientName })
}

/**
 * Get SMS templates
 */
function getSMSTemplate(name: string): string | null {
    const templates: Record<string, string> = {
        'project_update': 'Hi [Name], your [project] is progressing well. We expect to complete [milestone] by [date]. Any questions? - REMODELY LLC',
        'appointment_reminder': 'Reminder: We have our appointment scheduled for [date] at [time]. See you then! - REMODELY LLC',
        'project_completion': 'Great news! Your [project] is now complete. We\'ll be in touch to schedule the final walkthrough. - REMODELY LLC',
        'payment_reminder': 'Hi [Name], this is a friendly reminder that payment for [project] is due on [date]. Thank you! - REMODELY LLC',
        'material_arrival': 'Hi [Name], your [materials] have arrived and installation begins [date] at [time]. We\'ll text you when our team arrives. - REMODELY LLC',
        'weather_delay': 'Hi [Name], due to weather conditions, we need to reschedule today\'s work on your [project]. We\'ll contact you soon with the new date. - REMODELY LLC'
    }

    return templates[name] || null
}

/**
 * Get all available SMS templates
 */
export function getAllSMSTemplates(): Record<string, string> {
    return {
        'project_update': 'Hi [Name], your [project] is progressing well. We expect to complete [milestone] by [date]. Any questions?',
        'appointment_reminder': 'Reminder: We have our appointment scheduled for [date] at [time]. See you then!',
        'project_completion': 'Great news! Your [project] is now complete. We\'ll be in touch to schedule the final walkthrough.',
        'payment_reminder': 'Hi [Name], this is a friendly reminder that payment for [project] is due on [date]. Thank you!',
        'material_arrival': 'Hi [Name], your [materials] have arrived and installation begins [date] at [time]. We\'ll text you when our team arrives.',
        'weather_delay': 'Hi [Name], due to weather conditions, we need to reschedule today\'s work on your [project]. We\'ll contact you soon with the new date.'
    }
}

/**
 * Log SMS to database for CRM tracking
 */
async function logSMSToDatabase(smsData: {
    messageId: string
    to: string
    message: string
    status: string
    projectId?: string
    clientName?: string
    sentAt: Date
}) {
    try {
        // Save to JSON file for admin access (following RemodelyAz pattern)
        const fs = await import('fs/promises')
        const path = await import('path')

        const SMS_LOG_FILE = path.join(process.cwd(), 'data', 'sms-log.json')

        let existingData = []
        try {
            const fileContent = await fs.readFile(SMS_LOG_FILE, 'utf-8')
            existingData = JSON.parse(fileContent)
        } catch (error) {
            // File doesn't exist, create new array
            existingData = []
        }

        existingData.unshift(smsData) // Add to beginning

        // Keep only last 1000 messages to prevent file from growing too large
        if (existingData.length > 1000) {
            existingData = existingData.slice(0, 1000)
        }

        await fs.writeFile(SMS_LOG_FILE, JSON.stringify(existingData, null, 2))

    } catch (error) {
        console.error('Failed to log SMS to database:', error)
    }
}

/**
 * Get SMS delivery status from Twilio
 */
export async function getSMSStatus(messageId: string): Promise<string | null> {
    if (!client) return null

    try {
        const message = await client.messages(messageId).fetch()
        return message.status
    } catch (error) {
        console.error('Failed to fetch SMS status:', error)
        return null
    }
}

/**
 * Get SMS log for CRM dashboard
 */
export async function getSMSLog(limit: number = 50): Promise<any[]> {
    try {
        const fs = await import('fs/promises')
        const path = await import('path')

        const SMS_LOG_FILE = path.join(process.cwd(), 'data', 'sms-log.json')

        const fileContent = await fs.readFile(SMS_LOG_FILE, 'utf-8')
        const allMessages = JSON.parse(fileContent)

        return allMessages.slice(0, limit)
    } catch (error) {
        console.error('Failed to read SMS log:', error)
        return []
    }
}
