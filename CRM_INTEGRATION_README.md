# RemodelyAz - CRM-Integrated Remodeling Website

A comprehensive Next.js website with integrated CRM and secure file sharing capabilities for REMODELY LLC, Arizona's premier remodeling company.

## 🚀 Features

### Core Website
- **Next.js 14** with App Router and TypeScript
- **Glassmorphic Design** with Tailwind CSS
- **Hybrid Data Storage** (MongoDB + JSON files)
- **SEO Optimized** with structured data
- **Responsive Design** for all devices

### CRM System
- **Client Management** - Track client information and preferences
- **Project Management** - Manage active projects and milestones
- **Activity Logging** - Track all client interactions
- **Dashboard Analytics** - Revenue, project status, client metrics

### Secure File Sharing (Flask Integration)
- **Project-based File Organization**
- **Secure File Access Controls**
- **Real-time File Sync**
- **Version Control**
- **Client Portal Access**

### Communication Tools
- **Twilio SMS Integration** - Automated client notifications
- **Email Management** - Gmail SMTP integration
- **Message Templates** - Pre-configured SMS/email templates
- **Communication Logs** - Track all client communications

## 📁 Project Structure

```
RemodelyAz/
├── remodely-website/           # Next.js Application
│   ├── app/                    
│   │   ├── admin/             # Admin Panel Pages
│   │   ├── api/               # API Routes
│   │   │   ├── admin/         # Admin API endpoints
│   │   │   │   ├── crm/       # CRM management
│   │   │   │   └── sms/       # Twilio SMS integration
│   │   │   └── secure-share/  # Flask API proxy
│   │   └── ...
│   ├── components/            # React Components
│   ├── lib/                   # Utility Libraries
│   │   ├── crm-service.ts     # CRM data management
│   │   ├── twilio-service.ts  # SMS functionality
│   │   └── ...
│   └── data/                  # JSON data storage
│       └── crm/              # CRM data files
├── Secure File Sharing.../    # Flask Application
│   ├── src/                   # Flask source code
│   ├── main.py               # Flask entry point
│   ├── Dockerfile            # Flask container config
│   └── requirements.txt      # Python dependencies
├── docker-compose.yml        # Multi-service setup
└── .env.example             # Environment template
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18.17.0+
- Python 3.11+
- MongoDB (local or cloud)
- Docker & Docker Compose (optional)

### 1. Clone Repository
```bash
git clone <repository-url>
cd RemodelyAz
```

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Copy environment for Next.js app
cp .env.example remodely-website/.env.local

# Edit environment variables
nano .env
nano remodely-website/.env.local
```

### 3. Install Dependencies

#### Next.js Application
```bash
cd remodely-website
npm install
```

#### Flask Application
```bash
cd "Secure File Sharing and Collaboration App for Contractors"
pip install -r requirements.txt
```

### 4. Database Setup
```bash
# Create CRM data directory
mkdir -p remodely-website/data/crm

# MongoDB should be running (local or cloud)
# Flask app will auto-create SQLite database
```

## 🚀 Running the Application

### Option 1: Docker Compose (Recommended)
```bash
# Build and start all services
docker-compose up --build

# Access applications:
# - Next.js Website: http://localhost:3000
# - Flask API: http://localhost:5000
# - Admin Panel: http://localhost:3000/admin
```

### Option 2: Manual Startup

#### Terminal 1 - Flask API
```bash
cd "Secure File Sharing and Collaboration App for Contractors"
python main.py
```

#### Terminal 2 - Next.js Website
```bash
cd remodely-website
npm run dev
```

### Option 3: VS Code Tasks
```bash
# Use the configured VS Code task
Ctrl+Shift+P > "Tasks: Run Task" > "Start Development Server"
```

## 🔧 Configuration

### Required Environment Variables

#### MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/remodely
```

#### Gmail SMTP
```env
GMAIL_USER=your-business-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
```

#### Twilio SMS
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

#### Flask Integration
```env
FLASK_API_URL=http://localhost:5000
```

## 📊 CRM Features

### Client Management
- Add/edit client information
- Track project history
- Communication preferences
- Activity timeline

### Project Management
- Create projects linked to clients
- Track project status and milestones
- File organization by project
- Budget and timeline management

### Communication Tools
- SMS templates for common scenarios
- Automated appointment reminders
- Project update notifications
- Delivery status tracking

### Analytics Dashboard
- Revenue tracking
- Project status overview
- Client activity metrics
- Communication statistics

## 🗂️ File Management

### Secure File Sharing
- **Project Folders** - Organized by client/project
- **Access Controls** - Role-based permissions
- **File Versioning** - Track document changes
- **Client Portal** - Secure client access
- **Upload Tracking** - Activity logging

### Integration Points
- Flask API provides file storage backend
- Next.js admin panel for management
- Real-time sync between systems
- Secure file access tokens

## 🔐 Security Features

### Authentication
- Admin panel password protection
- JWT tokens for API access
- Session management
- Role-based access control

### File Security
- Encrypted file storage
- Access token validation
- Upload size limits
- File type restrictions

### API Security
- CORS configuration
- Request validation
- Error handling
- Rate limiting

## 📱 Admin Panel Features

### CRM Dashboard
- Client and project statistics
- Recent activity feed
- Revenue analytics
- Quick action buttons

### Project Manager
- Active project list
- Status tracking
- Client assignment
- Milestone management

### Secure Files
- Project-based file organization
- Upload/download interface
- File sharing controls
- Access logs

### SMS/Twilio
- Template management
- Bulk messaging
- Delivery tracking
- Response analytics

### Calendar Integration
- Project scheduling
- Appointment management
- Deadline tracking
- Team coordination

## 🚀 Deployment

### Production Build
```bash
# Build Next.js application
cd remodely-website
npm run build

# Build Docker images
docker-compose build

# Deploy with Docker
docker-compose up -d
```

### Render.com Deployment
The existing `render.yaml`, `build.sh`, and `start.sh` files support deployment to Render.com with the integrated CRM system.

## 🔧 Development

### Adding New CRM Features
1. Update types in `lib/crm-service.ts`
2. Add API endpoints in `app/api/admin/crm/route.ts`
3. Create UI components in admin panel
4. Update database schemas if needed

### Flask API Extension
1. Add routes in `Secure File Sharing.../src/routes/`
2. Update models in `src/models/`
3. Extend proxy in `app/api/secure-share/[...path]/route.ts`

## 📞 Support

For technical support or questions about the CRM integration:

- **Company**: REMODELY LLC
- **License**: AzRoc #327266
- **Email**: help.remodely@gmail.com
- **Phone**: (602) 818-5834
- **Website**: www.remodely.com

## 📄 License

This project is proprietary software developed for REMODELY LLC. All rights reserved.
