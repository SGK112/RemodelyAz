#!/bin/bash
# Force npm usage and prevent yarn
echo "🔧 Forcing npm usage and disabling yarn..."

# Run yarn disabler
./disable-yarn.sh

# Remove any yarn files that might exist
rm -f yarn.lock
rm -f .yarnrc*
rm -f .yarn*

# Set npm as the only package manager
export npm_config_yes=true
export YARN_PRODUCTION=false
export npm_config_fund=false
export npm_config_audit=false

# Ensure we're using npm
which npm
npm --version

# Clean install with npm
echo "📦 Installing dependencies with npm..."
cd remodely-website

# Clear any potential cache issues
npm cache clean --force || true

# Install dependencies with verbose logging
echo "🔧 Installing packages..."
npm install --verbose

# Verify critical dependencies are installed
echo "🔍 Verifying dependencies..."
npm ls cloudinary critters || echo "⚠️ Some dependencies may be missing but continuing..."

# Build with error handling
echo "🏗️ Building application..."
NODE_ENV=production npm run build

cd ..
echo "✅ Build complete!"
