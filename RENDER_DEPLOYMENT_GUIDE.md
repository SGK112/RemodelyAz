# Render Deployment Configuration for RemodelyAZ Image Gallery Manager

## Environment Variables Required

### Cloudinary Configuration (Image Management)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

### MongoDB Configuration (Contact Forms & Data)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/remodely

### Email Configuration (Contact Form Notifications)
GMAIL_USER=your_gmail_address@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password

### Next.js Configuration
NEXTAUTH_URL=https://your-render-app-name.onrender.com
NEXTAUTH_SECRET=your_nextauth_secret_key

### Optional: Additional Configuration
NODE_ENV=production
DISABLE_ANALYTICS=false

## Render Blueprint Setup

1. **Service Type**: Web Service
2. **Environment**: Node.js
3. **Build Command**: ./build.sh
4. **Start Command**: ./start.sh
5. **Node Version**: 18.17.0
6. **Auto-Deploy**: Yes (from main branch)

## Features Included

### Image Gallery Manager
- ✅ Cloudinary integration for image storage
- ✅ Multi-category image organization
- ✅ Bulk upload with drag & drop
- ✅ Image editing (name, description, tags)
- ✅ Search and filtering
- ✅ Responsive gallery display
- ✅ Safe image loading with fallbacks

### Admin Dashboard
- ✅ Unified admin navigation
- ✅ Image management interface
- ✅ Gallery project management
- ✅ Blog post management
- ✅ Real-time notifications

### Production Optimizations
- ✅ Image caching and optimization
- ✅ Lazy loading for performance
- ✅ Error handling and recovery
- ✅ Mobile-responsive design
- ✅ SEO-friendly URLs

## Setup Instructions

1. **Fork/Clone Repository**
   ```bash
   git clone https://github.com/yourusername/RemodelyAz.git
   ```

2. **Connect to Render**
   - Link your GitHub repository
   - Use the render.yaml configuration
   - Set environment variables in Render dashboard

3. **Configure Cloudinary**
   - Create Cloudinary account
   - Get API credentials
   - Set up upload presets (optional)

4. **Configure MongoDB**
   - Create MongoDB Atlas cluster
   - Whitelist Render IP addresses
   - Create database named "remodely"

5. **Configure Email**
   - Enable Gmail 2FA
   - Generate App Password
   - Use App Password (not regular password)

## File Structure

```
remodely-website/
├── app/
│   ├── admin/
│   │   ├── images/page.tsx          # Image Manager Page
│   │   ├── gallery/page.tsx         # Gallery Manager
│   │   └── layout.tsx               # Admin Layout
│   ├── api/
│   │   └── admin/
│   │       └── images/route.ts      # Image API Endpoints
│   └── globals.css                  # Global Styles
├── components/
│   ├── ImageManager.tsx             # Main Image Manager
│   ├── SafeImage.tsx               # Anti-flicker Image Component
│   ├── Gallery.tsx                 # Frontend Gallery Display
│   └── AdminNavigation.tsx         # Admin Navigation
├── lib/
│   ├── data-store.ts               # File-based Data Management
│   ├── mongodb.ts                  # Database Connection
│   └── cloudinary.ts               # Cloudinary Configuration
└── data/
    ├── images.json                 # Image Metadata
    └── gallery-projects.json       # Gallery Projects
```

## Monitoring & Maintenance

- **Health Checks**: Automatic via Render
- **Error Logging**: Console logs available in Render dashboard
- **Performance**: Monitor via Render metrics
- **Backups**: MongoDB Atlas automatic backups
- **Updates**: Auto-deploy from main branch

## Security Features

- ✅ Environment variable protection
- ✅ API route validation
- ✅ File upload restrictions
- ✅ MongoDB connection security
- ✅ HTTPS enforcement
