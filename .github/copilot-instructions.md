# Copilot Instructions for RemodelyAz

## Project Overview
- **RemodelyAz** is a modern, professional website for a premium kitchen and bathroom remodeling company.
- Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and MongoDB (via Mongoose).
- Features include glassmorphic UI, interactive gallery, contact form with MongoDB/email integration, SEO, and smooth animations.

## Architecture & Key Patterns
- **App Directory Structure**: All routes/pages are in `remodely-website/app/` using Next.js App Router conventions. Subfolders (e.g., `services/`, `blog/`, `admin/`) map to site sections.
- **API Routes**: Serverless API endpoints are in `remodely-website/app/api/`, e.g., `admin/blogs/route.ts` for blog admin APIs. Data flows from forms (frontend) to these endpoints, then to MongoDB/email.
- **Components**: Shared React components are in `remodely-website/components/` (e.g., `Hero.tsx`, `Gallery.tsx`).
- **Data**: Static data is in `remodely-website/data/` (e.g., `blogs.json`). Dynamic data uses MongoDB via `lib/mongodb.ts` and related hooks.
- **Styling**: Tailwind CSS is configured in `tailwind.config.js` and used throughout. Glassmorphic effects are common (see `globals.css`).
- **Email**: Email notifications use Nodemailer, configured in `lib/mailer.ts`.

## Developer Workflows
- **Install dependencies**: `npm install` in `remodely-website/`
- **Start dev server**: `npm run dev` (or use VS Code task: "Start Development Server")
- **Environment setup**: Copy `.env.local.example` to `.env.local` and fill in `MONGODB_URI`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`.
- **MongoDB**: Local or Atlas instance, database name `remodely`.
- **Gmail**: Use an App Password for email sending.
- **Deployment**: Vercel is recommended; set env vars in dashboard.

## Project-Specific Conventions
- **Glassmorphic UI**: Use backdrop blur, translucent cards, and gradients for new UI elements.
- **Color/Fonts**: Primary blue (`#0ea5e9`), accent orange (`#f3740c`), Poppins for headings, Inter for body.
- **API Data Flow**: Forms POST to `/api/` endpoints, which handle validation, DB, and email.
- **Security**: Input validation, rate limiting, CSRF, and secure headers are implemented in API routes.
- **SEO**: Use meta tags, OpenGraph, and structured data in page components.

## Integration Points
- **MongoDB**: All dynamic content (contact, blogs, etc.) is stored in MongoDB. See `lib/mongodb.ts` and API routes.
- **Email**: Outbound email via Nodemailer (Gmail App Password required).
- **Analytics**: Ready for Google Analytics, Tag Manager, Facebook Pixel (see roadmap).

## Examples
- **Add a new service page**: Create a new folder in `app/services/` with a `page.tsx` file.
- **Add a new API endpoint**: Add a new folder/file in `app/api/` (see `admin/blogs/route.ts`, `admin/ai-writer/route.ts`).
- **Add a new component**: Place in `components/` and import as needed.
- **AI Writer**: Blog admin panel includes AI content generation via `/api/admin/ai-writer` endpoint with mock content templates.

## References
- See `remodely-website/README.md` for full setup, deployment, and roadmap details.
- For design conventions, review `globals.css` and `tailwind.config.js`.

---

If you are unsure about a workflow or pattern, check the `README.md` files or ask for clarification.
