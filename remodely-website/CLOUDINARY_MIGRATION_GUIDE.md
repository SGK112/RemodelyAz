# MongoDB to Cloudinary Image Migration Guide

This guide helps you migrate images from MongoDB to Cloudinary and integrate them into your RemodelyAz website.

## 📋 Overview

Your RemodelyAz project uses a **hybrid image storage approach**:
- **Cloudinary**: For storing and optimizing images
- **JSON Files**: For metadata and quick access (`data/images.json`)
- **MongoDB**: For dynamic user data and image metadata (optional)

## 🔧 Prerequisites

1. **Cloudinary Account**: Set up your credentials
2. **MongoDB Connection**: Existing MongoDB with image data
3. **Environment Variables**: Properly configured

### Required Environment Variables

Add these to your `.env.local`:

```bash
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string
```

## 🚀 Migration Process

### Step 1: Install Dependencies

```bash
cd remodely-website
npm install cloudinary dotenv
```

### Step 2: Review Your MongoDB Data

First, let's see what image data you have in MongoDB:

```bash
npm run check-images
```

### Step 3: Run the Migration Script

```bash
npm run migrate-images
```

The script will:
1. 🔍 **Scan MongoDB** for image collections
2. 📤 **Upload images** to Cloudinary with proper organization
3. 📝 **Update** `data/images.json` with new URLs
4. 🎨 **Generate** gallery project data

### Step 4: Update Your Components

Replace your existing gallery page with the dynamic version:

```tsx
// In app/gallery/page.tsx
import DynamicGallery from '@/components/DynamicGallery'

export default function GalleryPage() {
  return <DynamicGallery />
}
```

## 📊 Image Management Features

### Using the Image Manager

```tsx
import { useImages } from '@/hooks/useImages'

function MyComponent() {
  // Get all kitchen images
  const { images, loading } = useImages({ category: 'kitchen', count: 6 })
  
  // Get images for hero component
  const { images: heroImages } = useImages({ component: 'hero' })
  
  // Search images
  const { images: searchResults } = useImages({ search: 'modern kitchen' })
  
  return (
    <div>
      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-3 gap-4">
          {images.map(img => (
            <img key={img.id} src={img.url} alt={img.name} />
          ))}
        </div>
      )}
    </div>
  )
}
```

### Optimized Image URLs

```tsx
import { useOptimizedImage } from '@/hooks/useImages'

function OptimizedImageComponent({ image }) {
  const optimizedUrl = useOptimizedImage(image, {
    width: 800,
    height: 600,
    quality: 'auto',
    format: 'webp'
  })
  
  return <img src={optimizedUrl} alt={image.name} />
}
```

## 🗂️ File Structure After Migration

```
remodely-website/
├── data/
│   ├── images.json              # Image metadata
│   └── gallery-projects.json    # Generated gallery projects
├── lib/
│   ├── image-manager.ts         # Image management utility
│   └── cloudinary.ts           # Cloudinary service
├── hooks/
│   └── useImages.ts            # React hooks for images
├── components/
│   └── DynamicGallery.tsx      # Dynamic gallery component
├── app/api/
│   └── images/
│       └── route.ts            # API for fetching images
└── scripts/
    └── migrate-images-to-cloudinary.js  # Migration script
```

## 🎯 API Endpoints

### Get Images

```bash
# Get all images
GET /api/images

# Get kitchen images
GET /api/images?category=kitchen

# Get images for hero component
GET /api/images?component=hero&count=1

# Search images
GET /api/images?search=modern
```

### Response Format

```json
{
  "success": true,
  "data": [
    {
      "id": "remodely-gallery/kitchen_123",
      "name": "Modern Kitchen Remodel",
      "url": "https://res.cloudinary.com/your_cloud/image/upload/v123/remodely-gallery/kitchen_123.jpg",
      "category": "kitchen",
      "description": "Beautiful modern kitchen with white cabinets",
      "source": "cloudinary",
      "cloudinary": {
        "public_id": "remodely-gallery/kitchen_123",
        "width": 1200,
        "height": 800,
        "format": "jpg"
      }
    }
  ],
  "stats": {
    "total": 25,
    "categories": { "kitchen": 12, "bathroom": 8, "commercial": 5 }
  }
}
```

## 🔧 Customization

### Adding New Image Categories

Update the migration script to handle your specific categories:

```javascript
// In migrate-images-to-cloudinary.js
const categoryMapping = {
  'kitchen_remodel': 'kitchen',
  'bath_renovation': 'bathroom',
  'office_design': 'commercial',
  'custom_category': 'other'
}
```

### Custom Gallery Projects

Modify the project generation logic:

```javascript
// In the migration script
function generateProjectsFromImages(images) {
  return images.map(img => ({
    id: img.id,
    title: img.name,
    category: mapCategory(img.category),
    image: img.url,
    description: img.description,
    location: 'Phoenix, AZ', // Or get from your data
    date: img.uploadDate,
    budget: calculateBudget(img.category),
    duration: calculateDuration(img.category),
    features: getFeatures(img.category)
  }))
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Cloudinary Upload Fails**
   ```bash
   # Check your credentials
   echo $CLOUDINARY_CLOUD_NAME
   echo $CLOUDINARY_API_KEY
   ```

2. **MongoDB Connection Issues**
   ```bash
   # Test MongoDB connection
   node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected')).catch(err => console.error(err))"
   ```

3. **Images Not Loading**
   - Verify Cloudinary URLs in `data/images.json`
   - Check Next.js image domains in `next.config.js`
   - Ensure proper CORS settings

### Debug Mode

Enable debug logging in the migration script:

```javascript
// Set DEBUG=true in the script
const DEBUG = true
```

## 📈 Performance Benefits

After migration you'll get:
- ✅ **Faster Loading**: Cloudinary CDN optimization
- ✅ **Responsive Images**: Automatic format conversion (WebP)
- ✅ **Better SEO**: Optimized image sizes
- ✅ **Cost Effective**: Reduced bandwidth usage
- ✅ **Scalable**: Handle large image galleries

## 🔄 Maintenance

### Regular Tasks

1. **Backup Images**: Regular Cloudinary backups
2. **Clean Old Data**: Remove unused MongoDB image documents
3. **Monitor Usage**: Check Cloudinary usage limits
4. **Update Metadata**: Keep `images.json` in sync

### Adding New Images

```javascript
// Using the API (future enhancement)
const formData = new FormData()
formData.append('image', file)
formData.append('category', 'kitchen')
formData.append('title', 'New Kitchen Project')

fetch('/api/admin/images', {
  method: 'POST',
  body: formData
})
```

## 🎉 Next Steps

1. **Run Migration**: Execute the migration script
2. **Test Gallery**: Verify images load correctly
3. **Update Components**: Replace static images with dynamic ones
4. **SEO Optimization**: Add proper alt tags and descriptions
5. **Performance Testing**: Check page load speeds

## 📞 Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Test Cloudinary connection separately
4. Review MongoDB data structure

The migration script provides detailed logging to help troubleshoot any issues.
