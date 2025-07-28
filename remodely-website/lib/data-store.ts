import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

export interface CompanyData {
  name: string
  address: string
  phone: string
  email: string
  license: string
  description: string
  founded: string
  employees: string
  projectsCompleted: string
}

export interface BlogData {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[]
  author: string
  publishedAt: string
  featured: boolean
  readTime: string
}

export interface ImageData {
  id: string
  url: string
  alt: string
  description: string
  category: string
  filename: string
  uploadedAt: string
}

export interface ServiceData {
  id: string
  title: string
  description: string
  features: string[]
  pricing: string
  image: string
  category: string
}

// Default data
const defaultCompanyData: CompanyData = {
  name: "REMODELY LLC",
  address: "15464 W Aster Dr, Surprise, AZ 85379",
  phone: "(480) 255-5887",
  email: "help.remodely@gmail.com",
  license: "",
  description: "Arizona's premier remodeling company specializing in residential and commercial renovations.",
  founded: "2009",
  employees: "25+",
  projectsCompleted: "500+"
}

const defaultBlogData: BlogData[] = [
  {
    id: 1,
    title: "Essential Summer Cooling Solutions for Arizona Homes",
    slug: "summer-cooling-solutions-arizona",
    excerpt: "Beat the Arizona heat with these proven cooling strategies that will keep your home comfortable and your energy bills manageable during the scorching summer months.",
    content: `Arizona summers are legendary for their intensity, with temperatures regularly soaring above 110°F. For homeowners in the Grand Canyon State, maintaining a cool, comfortable living environment isn't just about comfort—it's about survival and managing energy costs.

## Understanding Arizona's Unique Climate Challenges

The desert climate presents unique challenges that require specialized solutions. The combination of extreme heat, low humidity, and intense UV radiation means that standard cooling approaches often fall short. Arizona homes need robust, efficient systems designed specifically for these conditions.

## Strategic Air Conditioning Upgrades

### High-Efficiency HVAC Systems
Modern high-efficiency air conditioning systems can reduce energy consumption by 20-50% compared to older units. Look for systems with SEER ratings of 16 or higher, specifically designed for extreme climate conditions.

### Zoned Cooling Systems
Zoned HVAC systems allow you to cool only the areas you're using, reducing energy waste and providing customized comfort throughout your home.

## Insulation and Sealing Solutions

### Advanced Attic Insulation
Proper attic insulation can reduce cooling costs by up to 30%. In Arizona, we recommend R-38 to R-60 insulation levels, significantly higher than standard recommendations.

### Air Sealing
Sealing air leaks around windows, doors, and ductwork prevents cool air from escaping and hot air from infiltrating your home.

## Window and Door Upgrades

### Energy-Efficient Windows
Double or triple-pane windows with low-E coatings can block up to 99% of UV rays while reducing heat transfer by 30-50%.

### Strategic Window Treatments
Cellular shades, blackout curtains, and reflective films can significantly reduce solar heat gain during peak hours.

## Outdoor Solutions

### Shade Structures
Ramadas, pergolas, and strategic landscaping can reduce exterior wall temperatures by 20-30°F, dramatically reducing the load on your cooling system.

### Cool Roofing
Reflective roofing materials can reduce roof surface temperatures by 50-60°F, significantly impacting your home's overall cooling needs.

## Smart Technology Integration

### Programmable Thermostats
Smart thermostats can learn your schedule and preferences, optimizing cooling efficiency while maintaining comfort.

### Home Automation
Integrated systems can automatically adjust cooling based on occupancy, time of day, and outside temperature conditions.

## Cost-Effective Immediate Solutions

### Ceiling Fans
Strategic ceiling fan placement can make rooms feel 4-6°F cooler, allowing you to raise thermostat settings without sacrificing comfort.

### Ventilation Improvements
Proper ventilation, including bathroom and kitchen exhaust fans, prevents humidity buildup and reduces cooling loads.

## Professional Assessment Benefits

A professional energy audit can identify specific opportunities for improvement in your home. Many utility companies offer rebates for energy-efficient upgrades, making improvements more affordable.

## The REMODELY Advantage

At REMODELY LLC, we understand Arizona's unique cooling challenges. Our comprehensive approach combines proven technologies with local expertise to create cooling solutions that work year-round. From strategic renovations to complete system upgrades, we help Arizona homeowners stay cool while keeping energy costs manageable.

Ready to beat the heat? Contact REMODELY LLC for a comprehensive cooling assessment and discover how the right upgrades can transform your home's comfort and efficiency.`,
    image: "https://images.unsplash.com/photo-1631545804462-8144d47c2c3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Home Improvement",
    tags: ["cooling", "hvac", "energy efficiency", "arizona", "summer"],
    author: "REMODELY Team",
    publishedAt: "2024-05-15",
    featured: true,
    readTime: "8 min read"
  }
]

// File paths
const COMPANY_FILE = path.join(DATA_DIR, 'company.json')
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json')
const IMAGES_FILE = path.join(DATA_DIR, 'images.json')
const SERVICES_FILE = path.join(DATA_DIR, 'services.json')

// Helper functions
function readJsonFile<T>(filePath: string, defaultData: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
  }

  // Create file with default data if it doesn't exist
  writeJsonFile(filePath, defaultData)
  return defaultData
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error)
    throw error
  }
}

// Company data functions
export function getCompanyData(): CompanyData {
  return readJsonFile(COMPANY_FILE, defaultCompanyData)
}

export function saveCompanyData(data: CompanyData): void {
  writeJsonFile(COMPANY_FILE, data)
}

// Blog data functions
export function getBlogData(): BlogData[] {
  return readJsonFile(BLOGS_FILE, defaultBlogData)
}

export function saveBlogData(data: BlogData[]): void {
  writeJsonFile(BLOGS_FILE, data)
}

export function getBlogById(id: number): BlogData | undefined {
  const blogs = getBlogData()
  return blogs.find(blog => blog.id === id)
}

export function getBlogBySlug(slug: string): BlogData | undefined {
  const blogs = getBlogData()
  return blogs.find(blog => blog.slug === slug)
}

export function addBlog(blog: Omit<BlogData, 'id'>): BlogData {
  const blogs = getBlogData()
  const newId = Math.max(...blogs.map(b => b.id), 0) + 1
  const newBlog = { ...blog, id: newId }
  blogs.push(newBlog)
  saveBlogData(blogs)
  return newBlog
}

export function updateBlog(id: number, updates: Partial<BlogData>): BlogData | null {
  const blogs = getBlogData()
  const index = blogs.findIndex(blog => blog.id === id)
  if (index === -1) return null

  blogs[index] = { ...blogs[index], ...updates }
  saveBlogData(blogs)
  return blogs[index]
}

export function deleteBlog(id: number): boolean {
  const blogs = getBlogData()
  const index = blogs.findIndex(blog => blog.id === id)
  if (index === -1) return false

  blogs.splice(index, 1)
  saveBlogData(blogs)
  return true
}

// Image data functions
export function getImageData(): ImageData[] {
  return readJsonFile(IMAGES_FILE, [])
}

export function saveImageData(data: ImageData[]): void {
  writeJsonFile(IMAGES_FILE, data)
}

export function addImage(image: Omit<ImageData, 'id' | 'uploadedAt'>): ImageData {
  const images = getImageData()
  const newId = Date.now().toString()
  const newImage = {
    ...image,
    id: newId,
    uploadedAt: new Date().toISOString()
  }
  images.push(newImage)
  saveImageData(images)
  return newImage
}

export function updateImage(id: string, updates: Partial<ImageData>): ImageData | null {
  const images = getImageData()
  const index = images.findIndex(img => img.id === id)
  if (index === -1) return null

  images[index] = { ...images[index], ...updates }
  saveImageData(images)
  return images[index]
}

export function deleteImage(id: string): boolean {
  const images = getImageData()
  const index = images.findIndex(img => img.id === id)
  if (index === -1) return false

  images.splice(index, 1)
  saveImageData(images)
  return true
}

// Service data functions
export function getServiceData(): ServiceData[] {
  return readJsonFile(SERVICES_FILE, [])
}

export function saveServiceData(data: ServiceData[]): void {
  writeJsonFile(SERVICES_FILE, data)
}
