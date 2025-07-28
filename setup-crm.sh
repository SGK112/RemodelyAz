#!/bin/bash

echo "🚀 Setting up RemodelyAz CRM Integration..."

# Create necessary directories
echo "📁 Creating CRM data directories..."
mkdir -p remodely-website/data/crm
mkdir -p flask_uploads
mkdir -p flask_database

# Copy environment template if .env doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "✅ Please edit .env with your configuration values"
fi

if [ ! -f "remodely-website/.env.local" ]; then
    echo "📝 Creating Next.js environment file..."
    cp .env.example remodely-website/.env.local
    echo "✅ Please edit remodely-website/.env.local with your configuration values"
fi

# Install Python dependencies for Flask app
echo "🐍 Installing Flask dependencies..."
cd "Secure File Sharing and Collaboration App for Contractors"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✅ Created Python virtual environment"
fi

# Activate virtual environment and install dependencies
source venv/bin/activate
pip install -r requirements.txt
echo "✅ Installed Flask dependencies"

cd ..

# Install Next.js dependencies (already done but ensure Twilio is installed)
echo "📦 Checking Next.js dependencies..."
cd remodely-website
npm list twilio &> /dev/null
if [ $? -ne 0 ]; then
    echo "Installing Twilio SDK..."
    npm install twilio
fi
cd ..

echo ""
echo "🎉 CRM Integration Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Configure your environment variables in .env and remodely-website/.env.local"
echo "2. Set up MongoDB connection (local or cloud)"
echo "3. Configure Twilio credentials for SMS functionality"
echo "4. Configure Gmail app password for email notifications"
echo ""
echo "🚀 To start the integrated system:"
echo ""
echo "Option 1 - Docker Compose (Recommended):"
echo "   docker-compose up --build"
echo ""
echo "Option 2 - Manual startup:"
echo "   Terminal 1: cd 'Secure File Sharing and Collaboration App for Contractors' && source venv/bin/activate && python main.py"
echo "   Terminal 2: cd remodely-website && npm run dev"
echo ""
echo "Option 3 - VS Code Task:"
echo "   Ctrl+Shift+P > 'Tasks: Run Task' > 'Start Development Server'"
echo ""
echo "🌐 Access Points:"
echo "   - Website: http://localhost:3000"
echo "   - Admin CRM: http://localhost:3000/admin"
echo "   - Flask API: http://localhost:5000"
echo ""
echo "📚 Documentation: See CRM_INTEGRATION_README.md for detailed information"
