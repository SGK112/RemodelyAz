# Admin Development Environment Setup

This guide helps you work on the admin portal without affecting the live website.

## Quick Start

### Option 1: Separate Port Development (Recommended)

1. **Start the admin development server:**
   ```bash
   cd remodely-website
   ./start-admin-dev.sh
   ```
   
   This will start the server on **port 3002** with admin-specific settings.

2. **Access the admin portal:**
   - Admin Portal: http://localhost:3002/admin
   - Public Site: http://localhost:3001 (if running main server separately)

### Option 2: VS Code Task Runner

1. Open Command Palette (`Cmd+Shift+P`)
2. Type "Tasks: Run Task"
3. Select "Start Admin Development Server"

## Environment Separation

### Admin Development Branch
- Current branch: `admin-development`
- Safe to make experimental changes
- Merge back to `main` when ready

### Database Isolation
- Admin dev uses different database/collections
- No risk of corrupting production data
- Configure in `.env.admin.local`

### Port Separation
- Main site: `http://localhost:3001`
- Admin development: `http://localhost:3002`
- Both can run simultaneously

## Configuration Files

### `.env.admin.local`
```bash
PORT=3002
MONGODB_URI=mongodb://localhost:27017/remodely-admin-dev
ADMIN_DEBUG=true
ADMIN_DEVELOPMENT_MODE=true
```

### `lib/admin-config.ts`
- Admin-specific settings
- Development mode toggles
- Debug configurations

## Development Workflow

### 1. Safe Development
```bash
# Switch to admin branch
git checkout admin-development

# Start admin dev server
./start-admin-dev.sh

# Work on admin features...
```

### 2. Testing Changes
- Admin Portal: http://localhost:3002/admin
- Test image uploads, management, etc.
- Check console for debug information

### 3. Merge to Production
```bash
# When ready, merge changes back
git checkout main
git merge admin-development

# Deploy to production
./build.sh
```

## Key Features

### Isolated Environment
- ✅ Separate database
- ✅ Different port (3002)
- ✅ Admin-specific configs
- ✅ Debug mode enabled
- ✅ Hot reload optimized

### Development Tools
- ✅ Enhanced logging
- ✅ Debug information
- ✅ Development middleware
- ✅ Admin-specific APIs

### Safety Features
- ✅ No impact on live site
- ✅ Separate git branch
- ✅ Isolated data storage
- ✅ Environment variables

## Troubleshooting

### Port Conflicts
If port 3002 is in use:
```bash
PORT=3003 ./start-admin-dev.sh
```

### Database Issues
Check MongoDB connection:
```bash
mongosh mongodb://localhost:27017/remodely-admin-dev
```

### Environment Variables
Ensure `.env.admin.local` is loaded:
```bash
source .env.admin.local
echo $ADMIN_DEVELOPMENT_MODE
```

## Next Steps

1. **Configure your admin environment** in `.env.admin.local`
2. **Start the admin development server** with `./start-admin-dev.sh`
3. **Begin admin development** at http://localhost:3002/admin
4. **Test thoroughly** before merging to main branch

Your live website will remain unaffected while you develop admin features! 🚀
