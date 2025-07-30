# Gallery Image Management Guide

## 🎯 **Easy Gallery Management - No Webflow Access Needed!**

### **Option 1: Use the Frontend Gallery Manager (RECOMMENDED)**
Go to: **http://localhost:3000/admin/gallery**

**What you can do:**
- ✅ See all 31 gallery projects visually
- ✅ Click "Edit" on any project to change the image
- ✅ Paste new image URLs directly 
- ✅ Test URLs before saving
- ✅ Update titles and descriptions
- ✅ Changes save instantly to your gallery

### **Option 2: Get Images from surprisegranite.com**

**Step 1: Find the image you want**
1. Go to surprisegranite.com
2. Browse to the project/image you want
3. Right-click on the image
4. Select "Copy image address" or "Copy image URL"

**Step 2: Use the Gallery Manager**
1. Go to http://localhost:3000/admin/gallery
2. Find the project you want to update
3. Click the edit icon
4. Paste the URL in the "Image URL" field
5. Click "Test URL" to make sure it works
6. Click "Save"

### **Option 3: Use the Command Line Tool**
```bash
# See all projects organized by category
node scripts/update-gallery-images.js

# Update a specific image (example)
node scripts/update-gallery-images.js update 22 https://new-image-url.jpg
```

### **Best Image Sources:**
1. **surprisegranite.com** - Your existing project photos
2. **Unsplash.com** - High-quality stock photos
3. **Your own uploaded images** - Upload to `/public/images/` folder

### **Image Requirements:**
- ✅ Use HTTPS URLs (https://)
- ✅ Direct image links (.jpg, .png, .webp)
- ✅ High resolution (800px+ width recommended)
- ✅ Aspect ratio around 4:3 works best

### **Current Gallery Issues to Fix:**
Based on your feedback, here are the projects that need better images:

**Butcher Block Countertops (ID: 22)**
- Current: Generic kitchen image
- Needs: Actual butcher block/wood countertop image

**Desert Landscaping Blog**
- Fixed: Now uses outdoor patio image instead of hiking photo

### **Pro Tips:**
- The Gallery Manager shows you the current image so you can see what needs fixing
- Test URLs before saving to avoid broken images
- Use descriptive titles that match the actual image
- Categories help organize: kitchen, bathroom, commercial, tile, countertops, cabinets

---

## 🚫 **Why Not Webflow Access?**

Instead of sharing Webflow credentials, the Gallery Manager is much better because:
- ✅ **Visual Interface**: See exactly what you're changing
- ✅ **No Risk**: Can't accidentally break the original Webflow site  
- ✅ **Real-time**: Changes appear immediately on your gallery
- ✅ **Safe**: No need to share passwords
- ✅ **Easy**: Just copy/paste image URLs

---

**Ready to start?** Go to: **http://localhost:3000/admin/gallery**
