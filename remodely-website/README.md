# REMODELY - Premium Kitchen & Bath Remodeling Website

A modern, professional website for REMODELY - a premium kitchen and bathroom remodeling company. Built with Next.js 14, TypeScript, Tailwind CSS, and featuring glassmorphic design elements.

## 🌟 Features

- **Modern Glassmorphic Design**: Stunning visual effects with backdrop blur and translucent elements
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Gallery**: Filterable project gallery with lightbox functionality
- **Contact Management**: Form submissions stored in MongoDB with email notifications
- **Social Proof**: Integrated credibility badges and testimonials
- **SEO Optimized**: Proper meta tags, schema markup, and performance optimization
- **Smooth Animations**: Framer Motion animations for enhanced user experience

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Email**: Nodemailer with Gmail
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/remodely-website.git
cd remodely-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual values:
- `MONGODB_URI`: Your MongoDB connection string
- `GMAIL_USER`: Your Gmail address for sending notifications
- `GMAIL_APP_PASSWORD`: Your Gmail app password (not regular password)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design Features

### Glassmorphic Effects
- Translucent cards with backdrop blur
- Gradient overlays and borders
- Smooth hover transitions
- Modern glass-like appearance

### Color Scheme
- **Primary**: Blue tones (#0ea5e9 variants)
- **Accent**: Orange tones (#f3740c variants)
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (body text)

## 📱 Pages

- **Home**: Hero section, services overview, gallery preview, testimonials
- **Services**: Detailed service pages for kitchen, bathroom, and commercial remodeling
- **Gallery**: Interactive project gallery with filtering and lightbox
- **About**: Company information and team details
- **Blog**: Articles about remodeling tips and trends
- **Contact**: Contact form with multiple communication options

## 🔧 Configuration

### Gmail Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `GMAIL_APP_PASSWORD`

### MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named "remodely"
3. Update the `MONGODB_URI` in your `.env.local`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 📧 Contact Form Integration

The contact form automatically:
- Validates user input
- Stores submissions in MongoDB
- Sends email notifications to your inbox
- Provides confirmation to users
- Tracks submission status

## 🎯 SEO Features

- Optimized meta tags
- OpenGraph integration
- Twitter Card support
- Structured data markup
- Sitemap generation
- Fast loading times

## 🔒 Security Features

- Input validation and sanitization
- Rate limiting on API routes
- CSRF protection
- Secure headers
- Environment variable protection

## 📊 Analytics Ready

The website is prepared for analytics integration:
- Google Analytics 4
- Google Tag Manager
- Facebook Pixel
- Custom event tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support or questions:
- Email: info@remodely.ai.com
- Phone: (555) 123-4567

## 🏗️ Development Roadmap

- [ ] Add blog functionality with CMS integration
- [ ] Implement user authentication for project tracking
- [ ] Add online quote calculator
- [ ] Integration with project management tools
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] PWA capabilities

---

Built with ❤️ for REMODELY - Transforming spaces, one project at a time.
