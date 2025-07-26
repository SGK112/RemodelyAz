# Copilot Instructions for RemodelyAz

## Project Overview
RemodelyAz is a premium remodeling company website built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and hybrid data storage (MongoDB + JSON files). The project uses a **monorepo structure** with the main application in `remodely-website/` and root-level deployment scripts.

## Architecture & Critical Patterns

### Monorepo Structure
- **Root workspace**: Contains deployment scripts (`build.sh`, `start.sh`) and workspace configuration
- **Main app**: All development happens in `remodely-website/` subdirectory
- **Commands**: Always `cd remodely-website/` first, or use root-level npm scripts that handle directory changes

### Data Storage Strategy (Hybrid Approach)
- **JSON Files**: Static/semi-static content in `data/` (blogs, company info, images metadata)
- **MongoDB**: Dynamic user data (contact forms, submissions) via `lib/mongodb.ts` with cached connections
- **File-based Admin**: Admin operations modify JSON files directly using `lib/data-store.ts`
- **Admin Hooks**: `lib/admin-hooks.ts` provides React hooks for admin data management

### Glassmorphic Design System
- **Custom CSS Classes**: `.btn-glassmorphic` in `globals.css` for consistent glass effects
- **Tailwind Extensions**: Custom color palette (`primary`, `accent`, `navy`) in `tailwind.config.js`
- **Pattern**: `bg-white/10 backdrop-blur-sm border border-white/20` for glass cards
- **Typography**: `font-display` (Poppins) for headings, `font-sans` (Inter) for body text

## Developer Workflows

### Development Setup
```bash
# From root directory
npm run dev  # Equivalent to: cd remodely-website && npm run dev

# Or manually
cd remodely-website
npm install
npm run dev
```

### Environment Requirements
- **MONGODB_URI**: For contact forms and dynamic data
- **GMAIL_USER** + **GMAIL_APP_PASSWORD**: For email notifications (requires Gmail App Password, not regular password)
- **Database**: MongoDB collection named "remodely"

### VS Code Task Integration
- Use "Start Development Server" task instead of terminal commands
- Task automatically handles directory navigation to `remodely-website/`

## Project-Specific Conventions

### API Route Patterns
- **Dual Storage**: APIs often write to both MongoDB AND JSON files (see `/api/admin/blogs/route.ts`)
- **Schema Definition**: Mongoose schemas defined inline within route files (not separate models)
- **Error Handling**: Standardized NextResponse.json error format with descriptive messages

### Component Architecture
- **Motion Components**: Heavy use of Framer Motion with consistent timing patterns (0.8s duration, staggered delays)
- **Dynamic Content**: Components fetch from `/api/admin/*` endpoints for real-time updates
- **Responsive Patterns**: Mobile-first design with `sm:`, `md:`, `lg:` breakpoints

### SEO & Metadata
- **Comprehensive Meta**: Each page includes OpenGraph, Twitter cards, and structured data
- **Company Branding**: Licensed contractor (AzRoc #327266) for credibility
- **Location Focus**: Arizona-specific optimization for local SEO

## Integration Points & Data Flow

### Contact Form Workflow
1. Form submission → `/api/contact/route.ts`
2. Validates + saves to MongoDB Contact collection
3. Sends email notification via Nodemailer
4. Returns success/error response

### Admin Content Management
1. Admin pages use `lib/admin-hooks.ts` for data fetching
2. Updates POST to `/api/admin/*` endpoints
3. APIs update both JSON files AND database when applicable
4. Real-time updates without page refresh

### Build & Deployment
- **Render.com**: Uses `render.yaml` with custom build/start scripts
- **Build Process**: `./build.sh` → `cd remodely-website && npm install && npm run build`
- **Start Process**: `./start.sh` → `cd remodely-website && npm start`
- **Node Version**: Locked to 18.17.0 for deployment consistency

## Key Files & Examples
- **Glassmorphic Styling**: Check `components/Hero.tsx` badge component and `globals.css` button classes
- **API Pattern**: Study `/api/contact/route.ts` for MongoDB integration
- **Admin Pattern**: Review `/api/admin/blogs/route.ts` for JSON file management
- **Data Management**: See `lib/data-store.ts` for file operations and `lib/admin-hooks.ts` for React patterns
