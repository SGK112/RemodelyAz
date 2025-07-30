# 🚀 RemodelyAz - Quick Access Guide

## 🌐 **Website Access (GitHub Codespace)**

**Your site is running at:**
- **Main site:** https://obscure-space-doodle-v6vwqw9vv7q52xxxg-3001.app.github.dev/
- **Gallery:** https://obscure-space-doodle-v6vwqw9vv7q52xxxg-3001.app.github.dev/gallery  
- **Gallery Manager:** https://obscure-space-doodle-v6vwqw9vv7q52xxxg-3001.app.github.dev/gallery-manager.html

**Note:** Server is on port **3001** (not 3000) because port 3000 was in use.

## 🖼️ **Update Gallery Images (Command Line)**

**See all projects:**
```bash
cd /workspaces/RemodelyAz/remodely-website
node scripts/update-image.js
```

**Update any project:**
```bash
node scripts/update-image.js <ID> <new-image-url>
```

**Examples:**
```bash
# Update Butcher Block Countertops (ID 22)
node scripts/update-image.js 22 "https://surprisegranite.com/your-image.jpg"

# Update Mosaic Tile Feature Wall (ID 17)  
node scripts/update-image.js 17 "https://surprisegranite.com/tile-image.jpg"

# Update any kitchen project (ID 1)
node scripts/update-image.js 1 "https://surprisegranite.com/kitchen.jpg"
```

## 📋 **Current Projects That Need Better Images:**

**Butcher Block Countertops (ID: 22)**
- Current: Generic kitchen image
- Needs: Actual butcher block/wood countertop
- Command: `node scripts/update-image.js 22 "YOUR_URL_HERE"`

**Mosaic Tile Feature Wall (ID: 17)**
- Current: Generic tile
- Needs: Actual mosaic tile pattern
- Command: `node scripts/update-image.js 17 "YOUR_URL_HERE"`

**Office Space Renovation (ID: 19)**
- Current: Generic office
- Needs: Actual commercial renovation
- Command: `node scripts/update-image.js 19 "YOUR_URL_HERE"`

## 🎯 **How to Get Images from surprisegranite.com:**

1. **Open surprisegranite.com** in your browser
2. **Navigate to the project/image** you want
3. **Right-click the image** → "Copy image address"
4. **Use the command:** `node scripts/update-image.js <ID> "<pasted-URL>"`

## ✅ **Test Example (Already Done):**

I just updated the Butcher Block Countertops project:
```bash
node scripts/update-image.js 22 "https://images.unsplash.com/photo-1556909048-ac46c5b63b8d?w=800&q=80"
```

Result: ✅ Image updated successfully!

## 🔧 **Development Server Status:**

Server is running and accessible. If you can't reach it in browser:
- **Try:** http://127.0.0.1:3000
- **Or use the command line tools above**
- **Check firewall/proxy settings**

## 📞 **Need Help?**

The command line tool is the most reliable way to update images. Just run:
```bash
node scripts/update-image.js
```

This will show you all 31 projects with their IDs, then you can update any of them!
