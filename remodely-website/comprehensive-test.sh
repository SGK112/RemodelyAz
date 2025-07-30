#!/bin/bash

echo "🧪 RemodelyAz Lead Capture & Image Audit"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 Testing Lead Capture Systems...${NC}"
echo ""

# Test Contact Form API
echo -e "${YELLOW}1. Testing Contact Form API...${NC}"
node test-contact-api.js | grep -E "(PASSED|FAILED|Contact API)"

echo ""
echo -e "${YELLOW}2. Checking Gallery Images...${NC}"

# Check gallery data for issues
echo "   - Counting projects by category:"
echo "   - Kitchen: $(cat data/gallery-projects.json | grep -c '"category": "kitchen"')"
echo "   - Bathroom: $(cat data/gallery-projects.json | grep -c '"category": "bathroom"')"
echo "   - Tile: $(cat data/gallery-projects.json | grep -c '"category": "tile"')"
echo "   - Countertops: $(cat data/gallery-projects.json | grep -c '"category": "countertops"')"
echo "   - Cabinets: $(cat data/gallery-projects.json | grep -c '"category": "cabinets"')"
echo "   - Commercial: $(cat data/gallery-projects.json | grep -c '"category": "commercial"')"

echo ""
echo -e "${YELLOW}3. Checking for duplicate URLs in gallery...${NC}"
DUPLICATES=$(cat data/gallery-projects.json | grep -o '"url": "[^"]*"' | sort | uniq -d | wc -l)
if [ $DUPLICATES -eq 0 ]; then
    echo -e "   ${GREEN}✅ No duplicate images found${NC}"
else
    echo -e "   ${RED}❌ Found $DUPLICATES duplicate images${NC}"
    cat data/gallery-projects.json | grep -o '"url": "[^"]*"' | sort | uniq -d
fi

echo ""
echo -e "${YELLOW}4. Testing Key Pages for Lead Capture...${NC}"

# Check if development server is running
if curl -s http://localhost:3000 > /dev/null; then
    echo -e "   ${GREEN}✅ Development server is running${NC}"
    
    # Test key pages
    PAGES=("/" "/services" "/gallery" "/contact" "/about" "/investors")
    
    for page in "${PAGES[@]}"; do
        STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000$page)
        if [ $STATUS -eq 200 ]; then
            echo -e "   ${GREEN}✅ $page - OK${NC}"
        else
            echo -e "   ${RED}❌ $page - Status: $STATUS${NC}"
        fi
    done
else
    echo -e "   ${RED}❌ Development server not responding${NC}"
fi

echo ""
echo -e "${YELLOW}5. Lead Capture Components Audit:${NC}"

# Count lead capture components
CONTACT_BUTTONS=$(grep -r "href=\"/contact\"" app/ components/ | wc -l)
QUICK_QUOTE=$(grep -r "QuickQuote" components/ | wc -l)
STICKY_BAR=$(grep -r "StickyContactBar" components/ | wc -l)

echo "   - Contact buttons across site: $CONTACT_BUTTONS"
echo "   - Quick quote modal: $QUICK_QUOTE"
echo "   - Sticky contact bar: $STICKY_BAR"

echo ""
echo -e "${YELLOW}6. Image Quality Check:${NC}"

# Check for broken image patterns
BROKEN_PATTERNS=0

# Check for common broken image patterns
if grep -r "404" data/gallery-projects.json > /dev/null; then
    BROKEN_PATTERNS=$((BROKEN_PATTERNS + 1))
fi

if grep -r "error" data/gallery-projects.json > /dev/null; then
    BROKEN_PATTERNS=$((BROKEN_PATTERNS + 1))
fi

if [ $BROKEN_PATTERNS -eq 0 ]; then
    echo -e "   ${GREEN}✅ No obvious broken image patterns detected${NC}"
else
    echo -e "   ${YELLOW}⚠️  Found $BROKEN_PATTERNS potential issues${NC}"
fi

echo ""
echo -e "${BLUE}📧 Email Configuration Check:${NC}"

# Check environment variables (without showing secrets)
if [ -f ".env.local" ]; then
    if grep -q "GMAIL_USER=" .env.local; then
        echo -e "   ${GREEN}✅ GMAIL_USER configured${NC}"
    else
        echo -e "   ${RED}❌ GMAIL_USER not found${NC}"
    fi
    
    if grep -q "GMAIL_APP_PASSWORD=" .env.local; then
        echo -e "   ${GREEN}✅ GMAIL_APP_PASSWORD configured${NC}"
    else
        echo -e "   ${RED}❌ GMAIL_APP_PASSWORD not found${NC}"
    fi
    
    if grep -q "MONGODB_URI=" .env.local; then
        echo -e "   ${GREEN}✅ MONGODB_URI configured${NC}"
    else
        echo -e "   ${RED}❌ MONGODB_URI not found${NC}"
    fi
else
    echo -e "   ${RED}❌ .env.local file not found${NC}"
fi

echo ""
echo -e "${BLUE}🎯 Lead Capture Points Summary:${NC}"
echo "   1. Main contact form (/contact)"
echo "   2. Quick quote modal (triggered by various CTAs)"
echo "   3. Sticky contact bar (bottom of screen)"  
echo "   4. Service page CTAs"
echo "   5. Hero section CTAs"
echo "   6. Footer contact links"
echo "   7. Navigation contact links"
echo ""

echo -e "${GREEN}✅ Audit Complete!${NC}"
echo ""
echo -e "${BLUE}📝 Recommendations:${NC}"
echo "   - Test contact form submission manually"
echo "   - Verify email notifications are received"
echo "   - Check gallery images load correctly"
echo "   - Test quick quote modal functionality"
echo "   - Ensure sticky contact bar appears/functions"
echo ""
