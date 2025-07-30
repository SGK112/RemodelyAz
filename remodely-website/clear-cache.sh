#!/bin/bash

echo "🧹 Clearing Next.js cache and restarting server..."

# Kill existing Next.js process
pkill -f "next dev" || true

# Remove Next.js cache
rm -rf .next/cache 2>/dev/null || true
rm -rf .next/static 2>/dev/null || true

echo "✅ Cache cleared!"

# Wait a moment
sleep 2

# Start fresh server
echo "🚀 Starting fresh development server..."
npm run dev
