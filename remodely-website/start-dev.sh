#!/bin/bash

echo "🚀 Starting REMODELY LLC Development Server..."
echo "============================================="

# Navigate to the project directory
cd /workspaces/RemodelyAz/remodely-website

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Check if data directory exists
if [ ! -d "data" ]; then
  echo "📁 Creating data directory..."
  mkdir -p data
fi

# Start the development server
echo "🔥 Starting Next.js development server..."
echo "📱 Admin Panel: http://localhost:3000/admin"
echo "🏠 Website: http://localhost:3000"
echo "🧪 Demo Page: http://localhost:3000/admin-demo"
echo "============================================="

npm run dev
