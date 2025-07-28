import { NextRequest, NextResponse } from 'next/server'
import { SITE_IMAGES } from '@/lib/site-images'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize blogs data if file doesn't exist
if (!fs.existsSync(BLOGS_FILE)) {
  const defaultBlogs = [
    {
      id: 1,
      title: 'Essential Cooling Solutions for Arizona Homes',
      slug: 'cooling-solutions-arizona-homes',
      excerpt: 'Discover the best cooling solutions to keep your Arizona home comfortable during extreme heat.',
      content: `Living in Arizona means dealing with extreme heat for much of the year. With temperatures regularly exceeding 110°F during summer months, having effective cooling solutions isn't just about comfort—it's essential for health and safety.

## Understanding Arizona's Unique Climate Challenges

Arizona's desert climate presents unique challenges for homeowners. The combination of intense heat, low humidity, and abundant sunshine creates conditions that can quickly overwhelm inadequate cooling systems. During peak summer months, your cooling system may run continuously, leading to high energy bills and potential system failures.

## Top Cooling Solutions for Arizona Homes

### 1. High-Efficiency HVAC Systems
Investing in a high-efficiency HVAC system is crucial for Arizona homeowners. Look for systems with:
- SEER ratings of 16 or higher
- Variable-speed compressors
- Smart thermostats for optimal control
- Proper sizing for your home's square footage

### 2. Evaporative Cooling (Swamp Coolers)
For dry climates like Arizona, evaporative coolers can be an energy-efficient alternative:
- Use up to 75% less energy than traditional AC
- Work best when humidity is below 60%
- Require regular maintenance and water supply
- Most effective in northern Arizona

### 3. Zoned Cooling Systems
Zoned systems allow you to cool specific areas of your home:
- Reduces energy waste in unused rooms
- Provides customized comfort levels
- Can reduce cooling costs by 20-30%
- Perfect for multi-story homes

## Energy-Saving Tips

- Install ceiling fans to improve air circulation
- Use thermal window treatments
- Seal air leaks around doors and windows
- Consider reflective roofing materials
- Plant shade trees on the south and west sides

## Professional Installation Matters

Proper installation is critical for optimal performance. REMODELY LLC's certified technicians ensure:
- Correct system sizing
- Proper ductwork installation
- Optimal thermostat placement
- Compliance with local codes

Don't let Arizona's heat overwhelm your home. Contact REMODELY LLC today for a comprehensive cooling system evaluation and upgrade your comfort while reducing energy costs.`,
      image: SITE_IMAGES.projects.kitchen_classic,
      category: 'Home Improvement',
      date: '2024-07-20',
      author: 'REMODELY Team',
      published: true,
      createdAt: '2024-07-20T10:00:00.000Z',
      updatedAt: '2024-07-20T10:00:00.000Z'
    },
    {
      id: 2,
      title: 'Monsoon-Proofing Your Arizona Home',
      slug: 'monsoon-proofing-arizona-home',
      excerpt: 'Protect your home from Arizona\'s monsoon season with these essential tips.',
      content: `Arizona's monsoon season, typically running from June through September, brings dramatic weather changes that can pose serious challenges to homeowners. While these storms provide much-needed moisture to the desert, they can also cause significant damage to unprepared homes.

## Understanding Arizona Monsoons

Monsoon storms in Arizona are characterized by:
- Sudden, intense rainfall
- High winds (often 60+ mph)
- Dust storms (haboobs)
- Flash flooding potential
- Hail in some areas

## Essential Monsoon Preparation Steps

### Roof and Gutters
Your roof is your first line of defense:
- Inspect and repair loose or damaged shingles
- Clean gutters and downspouts thoroughly
- Install gutter guards to prevent clogging
- Check roof flashing around vents and chimneys
- Trim overhanging tree branches

### Windows and Doors
Protect your home's openings:
- Install storm shutters or impact-resistant windows
- Check weatherstripping around doors and windows
- Consider reinforcing garage doors
- Ensure proper drainage around entry points

### Landscaping and Outdoor Items
Prepare your property:
- Secure or store loose outdoor furniture
- Trim trees and remove dead branches
- Clear debris from drainage areas
- Install French drains if needed
- Consider xeriscaping for better water management

## Interior Protection

### Basement and Foundation
- Check for cracks in foundation walls
- Install sump pumps if necessary
- Waterproof basement walls
- Ensure proper grading around foundation

### Electrical Systems
- Install GFCI outlets in wet areas
- Check electrical panels for proper sealing
- Consider whole-house surge protectors
- Keep flashlights and batteries accessible

## Emergency Preparedness

Create a monsoon emergency kit:
- Battery-powered radio
- Flashlights and extra batteries
- First aid supplies
- Non-perishable food and water
- Important documents in waterproof containers

## Professional Assessment

REMODELY LLC offers comprehensive monsoon readiness inspections:
- Roof and gutter evaluation
- Drainage system assessment
- Window and door sealing
- Electrical safety checks
- Foundation inspection

## Post-Storm Recovery

After a monsoon:
- Document any damage with photos
- Contact insurance company promptly
- Make temporary repairs to prevent further damage
- Schedule professional assessment
- Address water damage immediately

Don't wait for the first storm to discover vulnerabilities in your home. Contact REMODELY LLC today for a complete monsoon-proofing evaluation and protect your investment before the next storm hits.`,
      image: SITE_IMAGES.projects.bathroom_modern,
      category: 'Seasonal Tips',
      date: '2024-07-18',
      author: 'REMODELY Team',
      published: true,
      createdAt: '2024-07-18T10:00:00.000Z',
      updatedAt: '2024-07-18T10:00:00.000Z'
    }
  ]
  fs.writeFileSync(BLOGS_FILE, JSON.stringify(defaultBlogs, null, 2))
}

export async function GET() {
  try {
    const data = fs.readFileSync(BLOGS_FILE, 'utf8')
    const blogs = JSON.parse(data)

    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Error reading blogs:', error)
    return NextResponse.json(
      { error: 'Failed to read blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const newBlog = await request.json()

    // Read existing blogs
    const data = fs.readFileSync(BLOGS_FILE, 'utf8')
    const blogs = JSON.parse(data)

    // Add new blog with ID and timestamps
    const blogWithMeta = {
      ...newBlog,
      id: Math.max(...blogs.map((b: any) => b.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    blogs.push(blogWithMeta)

    // Write back to file
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      blog: blogWithMeta
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedBlog = await request.json()

    // Read existing blogs
    const data = fs.readFileSync(BLOGS_FILE, 'utf8')
    const blogs = JSON.parse(data)

    // Find and update the blog
    const blogIndex = blogs.findIndex((blog: any) => blog.id === updatedBlog.id)
    if (blogIndex === -1) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    blogs[blogIndex] = {
      ...updatedBlog,
      updatedAt: new Date().toISOString()
    }

    // Write back to file
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
      blog: blogs[blogIndex]
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}
