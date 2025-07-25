import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER || 'help.remodely@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
    },
})

export interface ContactFormData {
    name: string
    email: string
    phone?: string
    projectType: string
    budget: string
    message: string
    propertyType: 'residential' | 'commercial'
}

export const sendContactEmail = async (data: ContactFormData) => {
    const mailOptions = {
        from: process.env.GMAIL_USER || 'help.remodely@gmail.com',
        to: 'help.remodely@gmail.com',
        subject: `New Contact Form Submission - REMODELY LLC - ${data.projectType}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #E97626; border-bottom: 2px solid #E97626; padding-bottom: 10px;">
          New Contact Form Submission - REMODELY LLC
        </h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #334155; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        </div>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #334155; margin-top: 0;">Project Details</h3>
          <p><strong>Project Type:</strong> ${data.projectType}</p>
          <p><strong>Property Type:</strong> ${data.propertyType}</p>
          <p><strong>Budget Range:</strong> ${data.budget}</p>
        </div>
        
        <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #334155; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6;">${data.message}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 14px;">
            This email was sent from the REMODELY LLC website contact form.<br>
            15464 W Aster Dr, Surprise, AZ 85379<br>
            Phone: (480) 255-5887 | License: AzRoc 327266
          </p>
        </div>
      </div>
    `,
    }

    try {
        await transporter.sendMail(mailOptions)
        return { success: true }
    } catch (error) {
        console.error('Email sending failed:', error)
        return { success: false, error }
    }
}
