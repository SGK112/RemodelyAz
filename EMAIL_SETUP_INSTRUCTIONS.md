# 📧 Email Setup Instructions for RemodelyAz Contact Forms

## 🚨 **Why Leads Aren't Coming Through**

Your contact forms are working perfectly, but **email credentials are not configured**. The system is running in "test mode" which shows success messages but doesn't actually send emails.

## 🔧 **Fix Required: Set Up Gmail App Password**

### Step 1: Enable 2-Factor Authentication on Gmail
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click "2-Step Verification" 
3. Follow the prompts to enable 2FA (required for App Passwords)

### Step 2: Generate Gmail App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click "2-Step Verification"
3. Scroll down to "App passwords"
4. Select "Mail" and your device
5. Google will generate a 16-character password like: `abcd efgh ijkl mnop`

### Step 3: Update Environment Variables
Open `/workspaces/RemodelyAz/remodely-website/.env.local` and replace:

```bash
# Replace this line:
GMAIL_APP_PASSWORD=your_gmail_app_password_here

# With your actual app password (no spaces):
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

## 🎯 **Current Configuration**

Your `.env.local` is now set up with:
- ✅ **Email Account**: `help.remodely@gmail.com`
- ❌ **App Password**: Not configured yet
- ✅ **Recipients**: Emails will go to `help.remodely@gmail.com`

## 🧪 **Test the Setup**

After adding your Gmail App Password:

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Submit a test contact form on your website

3. Check for success/error messages in the console

## 🚨 **Important Security Notes**

- **NEVER** use your regular Gmail password
- **ONLY** use the 16-character App Password from Google
- **DO NOT** commit the `.env.local` file with real credentials
- The App Password should look like: `abcdefghijklmnop` (no spaces)

## 🔄 **Alternative Email Providers**

If Gmail doesn't work, you can switch to:

### SendGrid (Recommended for Production)
```bash
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your_sendgrid_api_key
```

### Mailgun
```bash
EMAIL_PROVIDER=mailgun
MAILGUN_SMTP_LOGIN=your_mailgun_login
MAILGUN_SMTP_PASSWORD=your_mailgun_password
```

## 📋 **Verification Checklist**

After setup, verify:
- [ ] Gmail 2FA is enabled
- [ ] Gmail App Password is generated
- [ ] `.env.local` has correct App Password (no spaces)
- [ ] Development server is restarted
- [ ] Test contact form submission
- [ ] Check `help.remodely@gmail.com` inbox
- [ ] Check spam folder if needed

## 🎯 **Expected Result**

Once configured correctly, you'll receive:
- **Rich HTML emails** with lead details
- **Project information** (type, budget, property type)
- **Contact details** with clickable phone/email links
- **Professional formatting** with RemodelyAz branding

---

**Need Help?** The contact form API is fully functional - it just needs the Gmail credentials to send actual emails instead of running in test mode.
