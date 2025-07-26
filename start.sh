#!/bin/bash
# Force npm for start command
echo "🚀 Starting with npm..."

# Ensure we're in the right directory and using npm
cd remodely-website
which npm
npm --version

echo "🌟 Starting the application..."
npm start
