/**
 * Enhanced Email Service Configuration
 * Supports multiple email providers and custom domain setup
 */

import nodemailer from 'nodemailer'

// Email provider configurations
const EMAIL_PROVIDERS = {
    // Option 1: Gmail (current setup)
    gmail: {
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER || 'help.remodely@gmail.com',
            pass: process.env.GMAIL_APP_PASSWORD,
        },
        // Add these Gmail-specific options for better reliability
        pool: true,
        maxConnections: 1,
        rateDelta: 20000,
        rateLimit: 5,
        // Gmail connection options
        connectionTimeout: 60000,
        greetingTimeout: 30000,
        socketTimeout: 60000,
    },

    // Option 2: SendGrid (recommended for production)
    sendgrid: {
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY,
        },
    },

    // Option 3: Mailgun
    mailgun: {
        host: 'smtp.mailgun.org',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAILGUN_SMTP_LOGIN,
            pass: process.env.MAILGUN_SMTP_PASSWORD,
        },
    },

    // Option 4: Amazon SES
    ses: {
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.AWS_SES_ACCESS_KEY,
            pass: process.env.AWS_SES_SECRET_KEY,
        },
    },

    // Option 5: Custom SMTP (for your own server)
    custom: {
        host: process.env.SMTP_HOST || 'mail.remodely.ai',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER || 'help@remodely.ai',
            pass: process.env.SMTP_PASSWORD,
        },
    },
}

// Select provider based on environment variable
const PROVIDER = (process.env.EMAIL_PROVIDER || 'gmail') as keyof typeof EMAIL_PROVIDERS
const transporter = nodemailer.createTransport(EMAIL_PROVIDERS[PROVIDER])

// Email templates
export const EMAIL_TEMPLATES = {
    contact: {
        subject: (data: any) => `New Contact Form Submission - REMODELY LLC - ${data.projectType}`,
        from: process.env.FROM_EMAIL || 'help@remodely.ai',
        to: process.env.TO_EMAIL || 'help@remodely.ai',
    },
    welcome: {
        subject: () => 'Welcome to RemodelyAz - Your Remodeling Journey Begins!',
        from: process.env.FROM_EMAIL || 'help@remodely.ai',
    },
    quote: {
        subject: (data: any) => `Your Remodeling Quote - ${data.projectType}`,
        from: process.env.FROM_EMAIL || 'help@remodely.ai',
    },
    newsletter: {
        subject: (data: any) => data.subject || 'RemodelyAz Newsletter',
        from: process.env.FROM_EMAIL || 'newsletter@remodely.ai',
    },
}

export interface ContactFormData {
    name: string
    email: string
    phone?: string
    projectType: string
    budget: string
    message: string
    propertyType: 'residential' | 'commercial'
}

export interface EmailOptions {
    to: string | string[]
    subject: string
    html?: string
    text?: string
    from?: string
    replyTo?: string
    attachments?: any[]
}

// Enhanced email sending function with retry logic
export const sendEmail = async (options: EmailOptions, retryCount: number = 0): Promise<any> => {
    // Test mode - skip actual email sending if no credentials
    if (!process.env.GMAIL_APP_PASSWORD) {
        console.log('🧪 TEST MODE: Email would be sent to:', options.to)
        console.log('📧 Subject:', options.subject)
        return {
            success: true,
            messageId: 'test-mode-' + Date.now(),
            testMode: true
        }
    }

    const mailOptions = {
        from: options.from || process.env.FROM_EMAIL || 'help@remodely.ai',
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        replyTo: options.replyTo,
        attachments: options.attachments,
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent successfully:', info.messageId)
        return { success: true, messageId: info.messageId }
    } catch (error) {
        console.error('Email sending failed:', error)
        
        // Retry logic for Gmail authentication issues
        if (retryCount < 2 && error instanceof Error) {
            const isAuthError = error.message.includes('EAUTH') || 
                               error.message.includes('Invalid login') ||
                               error.message.includes('Username and Password not accepted')
            
            if (isAuthError) {
                console.log(`Gmail auth failed, retrying (attempt ${retryCount + 1}/2)...`)
                // Wait a moment before retry
                await new Promise(resolve => setTimeout(resolve, 1000))
                return sendEmail(options, retryCount + 1)
            }
        }
        
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
}

// Contact form email (existing functionality)
export const sendContactEmail = async (data: ContactFormData) => {
    const template = EMAIL_TEMPLATES.contact

    return sendEmail({
        to: template.to,
        from: template.from,
        subject: template.subject(data),
        replyTo: data.email,
        html: `
            <div style="font-family: Arial, sans-serif;
import { SITE_IMAGES } from '@/lib/site-images' max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #E97626 0%, #1e40af 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">REMODELY LLC - Premium Remodeling Services</p>
                </div>
                
                <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
                    <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <h3 style="color: #E97626; margin-top: 0; border-bottom: 2px solid #E97626; padding-bottom: 10px;">Contact Information</h3>
                        <p style="margin: 10px 0;"><strong>Name:</strong> ${data.name}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #1e40af;">${data.email}</a></p>
                        <p style="margin: 10px 0;"><strong>Phone:</strong> ${data.phone ? `<a href="tel:${data.phone}" style="color: #1e40af;">${data.phone}</a>` : 'Not provided'}</p>
                    </div>
                    
                    <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <h3 style="color: #1e40af; margin-top: 0; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">Project Details</h3>
                        <p style="margin: 10px 0;"><strong>Project Type:</strong> <span style="background: #E97626; color: white; padding: 4px 8px; border-radius: 4px; font-size: 14px;">${data.projectType}</span></p>
                        <p style="margin: 10px 0;"><strong>Property Type:</strong> ${data.propertyType.charAt(0).toUpperCase() + data.propertyType.slice(1)}</p>
                        <p style="margin: 10px 0;"><strong>Budget Range:</strong> <span style="color: #059669; font-weight: bold;">${data.budget}</span></p>
                    </div>
                    
                    <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <h3 style="color: #059669; margin-top: 0; border-bottom: 2px solid #059669; padding-bottom: 10px;">Message</h3>
                        <div style="background: #f0f9ff; padding: 15px; border-radius: 6px; border-left: 4px solid #1e40af;">
                            <p style="line-height: 1.6; margin: 0;">${data.message}</p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding: 20px; background: #1e40af; border-radius: 8px;">
                        <p style="color: white; margin: 0; font-size: 16px;">
                            <strong>REMODELY LLC</strong><br>
                            15464 W Aster Dr, Surprise, AZ 85379<br>
                            Phone: <a href="tel:4802555887" style="color: #E97626;">(480) 255-5887</a> | Professional Remodeling Services
                        </p>
                        <p style="color: rgba(255,255,255,0.8); margin: 15px 0 0 0; font-size: 14px;">
                            This email was sent from the REMODELY LLC website contact form.
                        </p>
                    </div>
                </div>
            </div>
        `,
    })
}

// Welcome email for new customers
export const sendWelcomeEmail = async (customerData: { name: string; email: string }) => {
    return sendEmail({
        to: customerData.email,
        subject: EMAIL_TEMPLATES.welcome.subject(),
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #E97626 0%, #1e40af 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 32px;">Welcome to RemodelyAz!</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 18px;">Your remodeling journey begins here</p>
                </div>
                
                <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #1e40af; margin-top: 0;">Hello ${customerData.name}!</h2>
                    
                    <p style="line-height: 1.6; color: #374151;">
                        Thank you for choosing RemodelyAz for your remodeling project. We're excited to help transform your space into something extraordinary.
                    </p>
                    
                    <div style="background: #f0f9ff; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #1e40af;">
                        <h3 style="color: #1e40af; margin-top: 0;">What happens next?</h3>
                        <ul style="color: #374151; line-height: 1.6;">
                            <li>Our team will review your project details</li>
                            <li>We'll contact you within 24 hours to schedule a consultation</li>
                            <li>Receive a detailed quote tailored to your needs</li>
                            <li>Begin your transformation with Arizona's premier remodeling team</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://remodely.ai/process" style="background: #E97626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                            Learn About Our Process
                        </a>
                    </div>
                    
                    <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #E97626;">
                        <p style="margin: 0; color: #374151;">
                            <strong>Questions?</strong> Reply to this email or call us at 
                            <a href="tel:4802555887" style="color: #E97626;">(480) 255-5887</a>
                        </p>
                    </div>
                </div>
            </div>
        `,
    })
}

// Quote email template
export const sendQuoteEmail = async (quoteData: any) => {
    return sendEmail({
        to: quoteData.email,
        subject: EMAIL_TEMPLATES.quote.subject(quoteData),
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #059669 0%, #1e40af 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">Your Remodeling Quote</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">REMODELY LLC - Premium Remodeling Services</p>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #1e40af;">Hello ${quoteData.name}!</h2>
                    
                    <p style="line-height: 1.6; color: #374151;">
                        Thank you for your interest in our ${quoteData.projectType} services. Based on your requirements, here's your detailed quote:
                    </p>
                    
                    <div style="background: #f0fdf4; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #059669;">
                        <h3 style="color: #059669; margin-top: 0;">Project Details</h3>
                        <p><strong>Project Type:</strong> ${quoteData.projectType}</p>
                        <p><strong>Estimated Cost:</strong> <span style="font-size: 18px; color: #059669; font-weight: bold;">${quoteData.estimatedCost}</span></p>
                        <p><strong>Timeline:</strong> ${quoteData.timeline}</p>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://remodely.ai/contact" style="background: #E97626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                            Schedule Consultation
                        </a>
                    </div>
                </div>
            </div>
        `,
    })
}

// Bulk email for newsletters
export const sendBulkEmail = async (recipients: string[], subject: string, htmlContent: string) => {
    const results = []

    for (const recipient of recipients) {
        const result = await sendEmail({
            to: recipient,
            subject,
            html: htmlContent,
        })
        results.push({ recipient, ...result })

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100))
    }

    return results
}

export default {
    sendEmail,
    sendContactEmail,
    sendWelcomeEmail,
    sendQuoteEmail,
    sendBulkEmail,
    EMAIL_TEMPLATES,
}
