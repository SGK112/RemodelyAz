import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

// Ensure critical directories exist
export function ensureDirectories() {
  const directories = [DATA_DIR, UPLOADS_DIR]
  
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
      console.log(`Created directory: ${dir}`)
    }
  })
}

// Ensure critical data files exist with default content
export function ensureDataFiles() {
  const dataFiles = [
    {
      path: path.join(DATA_DIR, 'images.json'),
      defaultContent: '[]'
    },
    {
      path: path.join(DATA_DIR, 'blogs.json'),
      defaultContent: '[]'
    },
    {
      path: path.join(DATA_DIR, 'gallery-projects.json'),
      defaultContent: '[]'
    },
    {
      path: path.join(DATA_DIR, 'testimonials.json'),
      defaultContent: JSON.stringify([
        {
          id: 1,
          name: "Sarah Johnson",
          location: "Scottsdale, AZ",
          project: "Kitchen Remodel",
          rating: 5,
          text: "RemodelyAz transformed our outdated kitchen into a modern masterpiece. Their attention to detail and professional service exceeded our expectations.",
          date: "2024-01-15"
        }
      ], null, 2)
    },
    {
      path: path.join(DATA_DIR, 'company.json'),
      defaultContent: JSON.stringify({
        name: "REMODELY LLC",
        tagline: "Transforming Arizona Homes with Excellence",
        description: "Arizona's premier remodeling company specializing in kitchen renovations, bathroom remodels, commercial spaces, and complete home transformations.",
        address: "15464 W Aster Dr, Surprise, AZ 85379",
        phone: "(602) 818-5834",
        email: "help.remodely@gmail.com",
        website: "www.remodely.com",
        license: "AzRoc #327266",
        founded: "2009",
        services: [
          "Kitchen Remodeling",
          "Bathroom Renovation", 
          "Commercial Remodeling",
          "Interior Design",
          "Home Additions",
          "Flooring Installation"
        ]
      }, null, 2)
    }
  ]
  
  dataFiles.forEach(file => {
    if (!fs.existsSync(file.path)) {
      fs.writeFileSync(file.path, file.defaultContent)
      console.log(`Created data file: ${file.path}`)
    }
  })
}

// Initialize all required directories and files
export function initializeApp() {
  ensureDirectories()
  ensureDataFiles()
}

export default initializeApp
