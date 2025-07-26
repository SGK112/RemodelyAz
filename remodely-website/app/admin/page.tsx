'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Building,
  FileText,
  Camera,
  Settings,
  Save,
  Upload,
  Edit3,
  Trash2,
  Plus,
  Eye,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Sparkles,
  Wand2
} from 'lucide-react'

interface CompanyInfo {
  name: string
  tagline: string
  description: string
  address: string
  phone: string
  email: string
  website: string
  license: string
  founded: string
  services: string[]
}

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  date: string
  author: string
  published: boolean
}

interface ImageAsset {
  id: string
  name: string
  url: string
  category: string
  size: number
  uploadDate: string
  description: string
  source?: 'cloudinary' | 'local' | 'local-fallback' | 'unsplash'
  cloudinary?: {
    public_id: string
    width: number
    height: number
    format: string
    folder?: string
    tags?: string[]
  }
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('company')
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: 'REMODELY LLC',
    tagline: 'Transforming Arizona Homes with Excellence',
    description: 'Arizona\'s premier remodeling company specializing in kitchen renovations, bathroom remodels, commercial spaces, and complete home transformations.',
    address: '15464 W Aster Dr, Surprise, AZ 85379',
    phone: '(480) 255-5887',
    email: 'help.remodely@gmail.com',
    website: 'www.remodely.com',
    license: 'AzRoc #327266',
    founded: '2009',
    services: ['Kitchen Remodeling', 'Bathroom Renovation', 'Commercial Remodeling', 'Interior Design', 'Home Additions', 'Flooring Installation']
  })

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: 'Essential Cooling Solutions for Arizona Homes',
      slug: 'cooling-solutions-arizona-homes',
      excerpt: 'Discover the best cooling solutions to keep your Arizona home comfortable during extreme heat.',
      content: 'Full article content here...',
      image: 'https://images.unsplash.com/photo-1582719371507-31ad96e7b3e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Home Improvement',
      date: '2024-07-20',
      author: 'REMODELY Team',
      published: true
    },
    {
      id: 2,
      title: 'Monsoon-Proofing Your Arizona Home',
      slug: 'monsoon-proofing-arizona-home',
      excerpt: 'Protect your home from Arizona\'s monsoon season with these essential tips.',
      content: 'Full article content here...',
      image: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Seasonal Tips',
      date: '2024-07-18',
      author: 'REMODELY Team',
      published: true
    }
  ])

  const [images, setImages] = useState<ImageAsset[]>([])
  const [editingImage, setEditingImage] = useState<ImageAsset | null>(null)

  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [showAIWriter, setShowAIWriter] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [cloudinaryStatus, setCloudinaryStatus] = useState<{
    available: boolean
    status: string
    cloudName?: string
  }>({ available: false, status: 'checking' })

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  // Load data on component mount
  useEffect(() => {
    loadCompanyInfo()
    loadBlogs()
    loadImages()
    loadCloudinaryStatus()
  }, [])

  const loadCompanyInfo = async () => {
    try {
      const response = await fetch('/api/admin/company')
      if (response.ok) {
        const data = await response.json()
        setCompanyInfo(data)
      }
    } catch (error) {
      console.error('Failed to load company info:', error)
    }
  }

  const loadBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs')
      if (response.ok) {
        const data = await response.json()
        setBlogPosts(data)
      }
    } catch (error) {
      console.error('Failed to load blogs:', error)
    }
  }

  const loadImages = async () => {
    try {
      const response = await fetch('/api/admin/images')
      if (response.ok) {
        const data = await response.json()
        setImages(data)
      }
    } catch (error) {
      console.error('Failed to load images:', error)
    }
  }

  const loadCloudinaryStatus = async () => {
    try {
      const response = await fetch('/api/admin/cloudinary-status')
      if (response.ok) {
        const data = await response.json()
        setCloudinaryStatus(data)
      }
    } catch (error) {
      console.error('Failed to load Cloudinary status:', error)
      setCloudinaryStatus({ available: false, status: 'error' })
    }
  }

  const saveCompanyInfo = async () => {
    try {
      const response = await fetch('/api/admin/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyInfo)
      })
      if (response.ok) {
        showNotification('success', 'Company information updated successfully!')
      }
    } catch (error) {
      showNotification('error', 'Failed to update company information')
    }
  }

  const saveBlogPost = async (blogPost: BlogPost) => {
    try {
      const response = await fetch('/api/admin/blogs', {
        method: editingBlog ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogPost)
      })
      if (response.ok) {
        if (editingBlog) {
          setBlogPosts(posts => posts.map(p => p.id === blogPost.id ? blogPost : p))
        } else {
          setBlogPosts(posts => [...posts, { ...blogPost, id: Date.now() }])
        }
        setEditingBlog(null)
        showNotification('success', `Blog post ${editingBlog ? 'updated' : 'created'} successfully!`)
      }
    } catch (error) {
      showNotification('error', 'Failed to save blog post')
    }
  }

  const deleteBlogPost = async (id: number) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' })
        if (response.ok) {
          setBlogPosts(posts => posts.filter(p => p.id !== id))
          showNotification('success', 'Blog post deleted successfully!')
        }
      } catch (error) {
        showNotification('error', 'Failed to delete blog post')
      }
    }
  }

  const generateAIContent = async () => {
    if (!aiPrompt.trim()) {
      showNotification('error', 'Please enter a prompt for the AI writer')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/admin/ai-writer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          category: editingBlog?.category || 'Home Improvement'
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (editingBlog) {
          setEditingBlog({
            ...editingBlog,
            title: data.title || editingBlog.title,
            excerpt: data.excerpt || editingBlog.excerpt,
            content: data.content || editingBlog.content
          })
        }
        setShowAIWriter(false)
        setAiPrompt('')
        showNotification('success', 'AI content generated successfully!')
      } else {
        throw new Error('Failed to generate content')
      }
    } catch (error) {
      showNotification('error', 'Failed to generate AI content')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('image', file)
      formData.append('category', 'Gallery') // Default category
      formData.append('description', `Uploaded: ${file.name}`)

      try {
        const response = await fetch('/api/admin/images', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const result = await response.json()
          setImages(prev => [...prev, result.image])

          // Show enhanced success message with upload method
          const uploadMethod = result.uploadMethod || 'local'
          const methodEmoji = uploadMethod === 'cloudinary' ? '☁️' : '💾'
          showNotification('success', `${methodEmoji} ${file.name} uploaded via ${uploadMethod}!`)
        } else {
          const error = await response.json()
          showNotification('error', `Failed to upload ${file.name}: ${error.error}`)
        }
      } catch (error) {
        showNotification('error', `Failed to upload ${file.name}`)
      }
    }

    // Reset file input
    event.target.value = ''
  }

  const updateImage = async (updatedImage: ImageAsset) => {
    try {
      const response = await fetch('/api/admin/images', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedImage)
      })

      if (response.ok) {
        setImages(images => images.map(img => img.id === updatedImage.id ? updatedImage : img))
        setEditingImage(null)
        showNotification('success', 'Image updated successfully!')
      }
    } catch (error) {
      showNotification('error', 'Failed to update image')
    }
  }

  const deleteImage = async (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      try {
        const response = await fetch(`/api/admin/images/${id}`, { method: 'DELETE' })
        if (response.ok) {
          setImages(images => images.filter(img => img.id !== id))
          showNotification('success', 'Image deleted successfully!')
        }
      } catch (error) {
        showNotification('error', 'Failed to delete image')
      }
    }
  }

  const tabs = [
    { id: 'company', label: 'Company Info', icon: <Building className="w-5 h-5" /> },
    { id: 'blogs', label: 'Blog Posts', icon: <FileText className="w-5 h-5" /> },
    { id: 'images', label: 'Image Gallery', icon: <Camera className="w-5 h-5" /> },
    { id: 'email', label: 'Email System', icon: <Mail className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
            REMODELY LLC Admin Panel
          </h1>
          <p className="text-gray-600">
            Manage your website content, company information, and media assets
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                    ? 'border-accent-600 text-accent-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Company Info Tab */}
            {activeTab === 'company' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={companyInfo.tagline}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, tagline: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={companyInfo.description}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Address
                    </label>
                    <input
                      type="text"
                      value={companyInfo.address}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={companyInfo.phone}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Globe className="w-4 h-4 inline mr-1" />
                      Website
                    </label>
                    <input
                      type="url"
                      value={companyInfo.website}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      License Number
                    </label>
                    <input
                      type="text"
                      value={companyInfo.license}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, license: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Founded Year
                    </label>
                    <input
                      type="text"
                      value={companyInfo.founded}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, founded: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Services (one per line)
                    </label>
                    <textarea
                      value={companyInfo.services.join('\n')}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, services: e.target.value.split('\n').filter(s => s.trim()) })}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={saveCompanyInfo}
                    className="bg-accent-600 text-white px-6 py-2 rounded-lg hover:bg-accent-700 transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Company Info
                  </button>
                </div>
              </motion.div>
            )}

            {/* Blog Posts Tab */}
            {activeTab === 'blogs' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Blog Posts</h3>
                  <button
                    onClick={() => setEditingBlog({
                      id: 0,
                      title: '',
                      slug: '',
                      excerpt: '',
                      content: '',
                      image: '',
                      category: '',
                      date: new Date().toISOString().split('T')[0],
                      author: 'REMODELY Team',
                      published: false
                    })}
                    className="bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </button>
                </div>

                {editingBlog ? (
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={editingBlog.title}
                          onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          value={editingBlog.category}
                          onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                        >
                          <option value="">Select Category</option>
                          <option value="Home Improvement">Home Improvement</option>
                          <option value="Kitchen Remodeling">Kitchen Remodeling</option>
                          <option value="Bathroom Renovation">Bathroom Renovation</option>
                          <option value="Design Tips">Design Tips</option>
                          <option value="Seasonal Tips">Seasonal Tips</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Author
                        </label>
                        <input
                          type="text"
                          value={editingBlog.author}
                          onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          value={editingBlog.date}
                          onChange={(e) => setEditingBlog({ ...editingBlog, date: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                        />
                      </div>

                      <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image URL
                        </label>
                        <input
                          type="url"
                          value={editingBlog.image}
                          onChange={(e) => setEditingBlog({ ...editingBlog, image: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>

                      <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Excerpt
                        </label>
                        <textarea
                          value={editingBlog.excerpt}
                          onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                        />
                      </div>

                      <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Content
                          </label>
                          <button
                            onClick={() => setShowAIWriter(true)}
                            className="inline-flex items-center px-3 py-1 text-xs font-medium text-purple-700 bg-purple-100 border border-purple-300 rounded-full hover:bg-purple-200 transition-colors"
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI Writer
                          </button>
                        </div>
                        <textarea
                          value={editingBlog.content}
                          onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                          rows={10}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                          placeholder="Write your blog content here or use the AI Writer to generate content..."
                        />
                      </div>

                      <div className="lg:col-span-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editingBlog.published}
                            onChange={(e) => setEditingBlog({ ...editingBlog, published: e.target.checked })}
                            className="rounded border-gray-300 text-accent-600 shadow-sm focus:border-accent-300 focus:ring focus:ring-accent-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm text-gray-700">Published</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setEditingBlog(null)}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveBlogPost(editingBlog)}
                        className="bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors flex items-center"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Post
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">{post.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {post.published ? 'Published' : 'Draft'}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{post.excerpt}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {post.date}
                              </span>
                              <span className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {post.author}
                              </span>
                              <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => setEditingBlog(post)}
                              className="p-2 text-gray-600 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteBlogPost(post.id)}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Cloudinary Status */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Camera className="w-5 h-5 mr-2 text-blue-600" />
                    Image Storage Configuration
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800">☁️ Cloudinary</h4>
                      <p className="text-blue-700 text-sm">Cloud image storage & optimization</p>
                      <p className="text-xs text-blue-600 mt-1">
                        Status: {cloudinaryStatus.available ? '✅ Configured' : cloudinaryStatus.status === 'checking' ? '🔄 Checking...' : '⚠️ Not configured'}
                      </p>
                      {cloudinaryStatus.available && cloudinaryStatus.cloudName && (
                        <p className="text-xs text-blue-500 mt-1">
                          Cloud: {cloudinaryStatus.cloudName}
                        </p>
                      )}
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800">💾 Local Storage</h4>
                      <p className="text-gray-700 text-sm">Fallback file storage</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Status: ✅ Always available
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800">📊 Auto-Optimization</h4>
                      <p className="text-green-700 text-sm">Automatic image optimization</p>
                      <p className="text-xs text-green-600 mt-1">
                        Quality: Auto, Format: WebP/AVIF
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Setup Cloudinary:</strong> Add your CLOUDINARY_CLOUD_NAME and CLOUDINARY_API_SECRET to .env.local for cloud storage.
                      Your API Key (947268741246623) is already configured.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Image Gallery</h3>
                  <div className="flex items-center space-x-3">
                    <label className="bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors flex items-center cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Images
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {editingImage ? (
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Edit Image</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image Name
                          </label>
                          <input
                            type="text"
                            value={editingImage.name}
                            onChange={(e) => setEditingImage({ ...editingImage, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                          </label>
                          <select
                            value={editingImage.category}
                            onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                          >
                            <option value="Kitchen">Kitchen</option>
                            <option value="Bathroom">Bathroom</option>
                            <option value="Living Room">Living Room</option>
                            <option value="Bedroom">Bedroom</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Outdoor">Outdoor</option>
                            <option value="Before/After">Before/After</option>
                            <option value="Team">Team</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            value={editingImage.description}
                            onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                            placeholder="Describe this image..."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preview
                        </label>
                        <div className="aspect-square relative rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={editingImage.url}
                            alt={editingImage.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          <p>Size: {(editingImage.size / 1024).toFixed(1)} KB</p>
                          <p>Uploaded: {editingImage.uploadDate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setEditingImage(null)}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => updateImage(editingImage)}
                        className="bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors flex items-center"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {images.map((image) => (
                      <div key={image.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-square relative">
                          <Image
                            src={image.url}
                            alt={image.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-1 truncate">{image.name}</h4>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{image.description || 'No description'}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                            <span className="bg-gray-100 px-2 py-1 rounded">{image.category}</span>
                            <span>{(image.size / 1024).toFixed(1)} KB</span>
                          </div>
                          <div className="flex items-center justify-between text-xs mb-3">
                            <span className="text-gray-500">{image.uploadDate}</span>
                            {/* Show storage source */}
                            <span className={`px-2 py-1 rounded text-xs font-medium ${image.source === 'cloudinary'
                              ? 'bg-blue-100 text-blue-700'
                              : image.source === 'local-fallback'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                              }`}>
                              {image.source === 'cloudinary' ? '☁️ Cloudinary' :
                                image.source === 'local-fallback' ? '💾 Local (Fallback)' :
                                  '💾 Local'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => setEditingImage(image)}
                                className="p-1 text-gray-600 hover:text-accent-600 hover:bg-accent-50 rounded transition-colors"
                                title="Edit image"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteImage(image.id)}
                                className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Delete image"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            {/* Show Cloudinary details if available */}
                            {image.cloudinary && (
                              <div className="text-xs text-blue-600" title={`${image.cloudinary.width}x${image.cloudinary.height} • ${image.cloudinary.format}`}>
                                📐 {image.cloudinary.width}x{image.cloudinary.height}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {images.length === 0 && !editingImage && (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No images uploaded</h3>
                    <p className="text-gray-600 mb-4">Upload your first image to get started with your gallery</p>
                    <label className="bg-accent-600 text-white px-6 py-3 rounded-lg hover:bg-accent-700 transition-colors inline-flex items-center cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Images
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </motion.div>
            )}

            {/* Email System Tab */}
            {activeTab === 'email' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Email Status Alert */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Email System Running in Test Mode
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Gmail credentials are currently invalid or missing. All email tests will run in simulation mode.
                          To enable actual email sending:
                        </p>
                        <ol className="mt-2 list-decimal list-inside space-y-1">
                          <li>Generate a new Gmail App Password at <a href="https://myaccount.google.com/apppasswords" target="_blank" className="underline">Google App Passwords</a></li>
                          <li>Update the GMAIL_APP_PASSWORD in your .env.local file</li>
                          <li>Restart the development server</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Status */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-blue-600" />
                    Email System Status
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800">Current Provider</h4>
                      <p className="text-green-700">Gmail SMTP</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800">From Address</h4>
                      <p className="text-blue-700">{companyInfo.email}</p>
                    </div>
                  </div>
                </div>

                {/* Email Test Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                    Test Email Templates
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/email/welcome', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              name: 'Test Customer',
                              email: companyInfo.email
                            })
                          })
                          const result = await response.json()
                          if (result.testMode) {
                            showNotification('success', '🧪 TEST MODE: Welcome email test successful! (No actual email sent)')
                          } else {
                            showNotification(result.error ? 'error' : 'success',
                              result.error || 'Welcome email sent successfully!')
                          }
                        } catch (error) {
                          showNotification('error', 'Failed to send welcome email')
                        }
                      }}
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Test Welcome Email</span>
                    </button>                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/email/quote', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              name: 'Test Customer',
                              email: companyInfo.email,
                              projectType: 'Kitchen Remodel',
                              estimatedCost: '$25,000 - $35,000',
                              timeline: '6-8 weeks'
                            })
                          })
                          const result = await response.json()
                          if (result.testMode) {
                            showNotification('success', '🧪 TEST MODE: Quote email test successful! (No actual email sent)')
                          } else {
                            showNotification(result.error ? 'error' : 'success',
                              result.error || 'Quote email sent successfully!')
                          }
                        } catch (error) {
                          showNotification('error', 'Failed to send quote email')
                        }
                      }}
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Test Quote Email</span>
                    </button>

                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/contact', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              name: 'Test Customer',
                              email: companyInfo.email,
                              phone: '(555) 123-4567',
                              projectType: 'Bathroom Remodel',
                              budget: '$15,000 - $25,000',
                              message: 'This is a test message from the admin panel.',
                              propertyType: 'residential'
                            })
                          })
                          const result = await response.json()
                          if (result.testMode) {
                            showNotification('success', '🧪 TEST MODE: Contact form test successful! (No actual email sent)')
                          } else {
                            showNotification(result.error ? 'error' : 'success',
                              result.error || 'Contact form email sent successfully!')
                          }
                        } catch (error) {
                          showNotification('error', 'Failed to send contact email')
                        }
                      }}
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Test Contact Form</span>
                    </button>
                  </div>
                </div>

                {/* Email Configuration */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-gray-600" />
                    Email Configuration
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Environment Variables</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><code className="bg-gray-200 px-2 py-1 rounded">GMAIL_USER</code> - Your Gmail address</p>
                      <p><code className="bg-gray-200 px-2 py-1 rounded">GMAIL_APP_PASSWORD</code> - Gmail app password</p>
                      <p><code className="bg-gray-200 px-2 py-1 rounded">FROM_EMAIL</code> - Email to send from (optional)</p>
                      <p><code className="bg-gray-200 px-2 py-1 rounded">TO_EMAIL</code> - Email to receive notifications (optional)</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Your Gmail credentials are configured in Render environment variables.
                      All emails will be sent from your Gmail account to the configured recipient address.
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Wand2 className="w-5 h-5 mr-2 text-indigo-600" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                      href="/email-test"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Open Email Test Panel</span>
                    </a>
                    <a
                      href="https://myaccount.google.com/apppasswords"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Manage Gmail App Passwords</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Settings className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Additional Settings Coming Soon
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Advanced settings for SEO, analytics, and site configuration will be available in the next update.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* AI Writer Modal */}
      {showAIWriter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Wand2 className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">AI Content Writer</h3>
              </div>
              <button
                onClick={() => setShowAIWriter(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What would you like to write about?
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., 'Write a blog post about summer kitchen renovation tips for Arizona homeowners'"
                />
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-sm text-purple-700">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  The AI will generate a title, excerpt, and full content based on your prompt.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAIWriter(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={generateAIContent}
                  disabled={isGenerating || !aiPrompt.trim()}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
