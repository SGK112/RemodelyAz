#!/bin/bash

echo "🔧 RemodelyAz Email Quick Fix"
echo "==============================="

echo ""
echo "📧 Current Gmail Configuration:"
echo "GMAIL_USER: $GMAIL_USER"
echo "GMAIL_APP_PASSWORD: ${GMAIL_APP_PASSWORD:+***SET***}"
echo ""

if [ -z "$GMAIL_APP_PASSWORD" ] || [ "$GMAIL_APP_PASSWORD" = "your_gmail_app_password_here" ]; then
    echo "❌ Gmail App Password not configured!"
    echo ""
    echo "🚨 This is why your leads aren't coming through!"
    echo ""
    echo "📋 Quick Setup Steps:"
    echo "1. Go to: https://myaccount.google.com/security"
    echo "2. Enable 2-Factor Authentication"
    echo "3. Go to 'App passwords'"
    echo "4. Generate password for 'Mail'"
    echo "5. Copy the 16-character password"
    echo "6. Replace 'your_gmail_app_password_here' in .env.local"
    echo ""
    echo "💡 Example: GMAIL_APP_PASSWORD=abcdefghijklmnop"
    echo ""
else
    echo "✅ Gmail App Password is configured"
    echo ""
    echo "🧪 Testing email connection..."
    cd /workspaces/RemodelyAz/remodely-website
    node test-email.js
fi
