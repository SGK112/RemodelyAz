#!/bin/bash

# Admin Development Server Script
# This starts the development server on a different port for admin work

echo "🔧 Starting Admin Development Environment..."
echo "📍 Admin Portal: http://localhost:3002/admin"
echo "🌐 Public Site: http://localhost:3001 (if running separately)"
echo ""

# Copy admin environment variables
if [ -f ".env.admin.local" ]; then
    echo "📋 Loading admin environment variables..."
    export $(cat .env.admin.local | grep -v '^#' | xargs)
fi

# Start development server on port 3002
echo "🚀 Starting Next.js development server on port 3002..."
PORT=3002 npm run dev
