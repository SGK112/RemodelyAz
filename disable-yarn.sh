#!/bin/bash
# This script completely disables yarn by creating a fake yarn executable
echo "🚫 Disabling yarn completely..."

# Create a fake yarn that redirects to npm
cat > /usr/local/bin/yarn << 'EOF'
#!/bin/bash
echo "⚠️  Yarn is disabled. Using npm instead..."
npm "$@" 
EOF

chmod +x /usr/local/bin/yarn

# Also disable yarn via PATH manipulation
export PATH="/usr/local/bin:$PATH"

echo "✅ Yarn disabled, npm will be used instead"
