# Images Directory Structure

This directory contains all static images for the RemodelyAz website.

## Directory Structure

```
/public/images/
├── blog/           # Blog post images
├── gallery/        # Project gallery images  
├── team/           # Team member photos
└── README.md       # This file
```

## Image Guidelines

### Recommended Sizes
- Blog images: 1200x800px
- Gallery images: 800x600px
- Team photos: 400x400px
- Hero images: 2000x1200px

### Formats
- Use WebP for best performance
- Fallback to JPG for compatibility
- PNG for images requiring transparency
- SVG for logos and icons

### Naming Convention
- Use kebab-case: `modern-kitchen-remodel.jpg`
- Include descriptive keywords
- Avoid spaces and special characters

## Current Image Sources

Most images are currently sourced from Unsplash CDN for reliability and performance:
- Kitchen images: Various modern kitchen designs
- Bathroom images: Spa-inspired and modern bathroom designs
- Commercial images: Office and commercial spaces
- Team images: Professional headshots

## Local Images

When adding local images:
1. Optimize images before uploading
2. Use appropriate sizes to reduce load times
3. Add alt text for accessibility
4. Consider lazy loading for gallery images

## Image Optimization

The project uses Next.js Image component for:
- Automatic image optimization
- Lazy loading
- Responsive image serving
- WebP format conversion when supported

## Troubleshooting

If images are not loading:
1. Check file paths are correct
2. Verify image files exist in the correct directory
3. Ensure images are properly optimized
4. Check Next.js image domains configuration in next.config.js
