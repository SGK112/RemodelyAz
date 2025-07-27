'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import AuthWrapper from '@/components/AuthWrapper'
import ImageManager from '@/components/ImageManager'
import EnhancedImageManager from '@/components/EnhancedImageManager'
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
  Wand2,
  LogOut
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

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      sessionStorage.removeItem('admin_authenticated')
      sessionStorage.removeItem('admin_token')
      window.location.href = '/admin/login'
    } catch (error) {
      console.error('Logout failed:', error)
      // Force logout anyway
      sessionStorage.clear()
      window.location.href = '/admin/login'
    }
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
        // Merge with existing state to prevent undefined values
        setCompanyInfo(prev => ({
          name: data.name || prev.name || '',
          tagline: data.tagline || prev.tagline || '',
          description: data.description || prev.description || '',
          address: data.address || prev.address || '',
          phone: data.phone || prev.phone || '',
          email: data.email || prev.email || '',
          website: data.website || prev.website || '',
          license: data.license || prev.license || '',
          founded: data.founded || prev.founded || '',
          services: data.services || prev.services || []
        }))
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
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Modern Notification Toast */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl backdrop-blur-sm border ${notification.type === 'success'
                ? 'bg-emerald-500/90 border-emerald-400/50 text-white'
                : 'bg-red-500/90 border-red-400/50 text-white'
              }`}
          >
            <div className="flex items-center space-x-3">
              {notification.type === 'success' ? (
                <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <span className="font-medium">{notification.message}</span>
            </div>
          </motion.div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Modern Header with Glassmorphic Design */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-white/40 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
                    REMODELY LLC
                  </h1>
                  <p className="text-lg text-gray-600 font-medium">
                    Admin Dashboard
                  </p>
                  <p className="text-sm text-gray-500">
                    Manage your website content, company information, and media assets
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-lg transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Modern Tabs with Pills Design */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 mb-8">
            <div className="p-2">
              <nav className="flex space-x-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-white/50 hover:text-gray-800'
                      }`}
                  >
                    <div className={`mr-3 ${activeTab === tab.id ? 'text-white' : 'text-gray-500'}`}>
                      {tab.icon}
                    </div>
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="p-8">
              {/* Company Info Tab */}
              {activeTab === 'company' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Company Overview Card */}
                  <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-8 border border-blue-100 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
                        <p className="text-gray-600">Manage your business details and contact information</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Basic Information */}
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={companyInfo.name || ''}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                            placeholder="Enter company name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Business Tagline
                          </label>
                          <input
                            type="text"
                            value={companyInfo.tagline}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, tagline: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                            placeholder="Your business tagline"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            <Phone className="w-4 h-4 inline mr-2 text-blue-600" />
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={companyInfo.phone}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                            placeholder="(480) 255-5887"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            <Mail className="w-4 h-4 inline mr-2 text-blue-600" />
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={companyInfo.email}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                            placeholder="help.remodely@gmail.com"
                          />
                        </div>
                      </div>

                      {/* Contact & Legal Information */}
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            <MapPin className="w-4 h-4 inline mr-2 text-blue-600" />
                            Business Address
                          </label>
                          <input
                            type="text"
                            value={companyInfo.address}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                            placeholder="15464 W Aster Dr, Surprise, AZ 85379"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            <Globe className="w-4 h-4 inline mr-2 text-blue-600" />
                            Website URL
                          </label>
                          <input
                            type="url"
                            value={companyInfo.website}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                            placeholder="www.remodely.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            License Number
                          </label>
                          <input
                            type="text"
                            value={companyInfo.license}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, license: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                            placeholder="AzRoc #327266"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            <Calendar className="w-4 h-4 inline mr-2 text-blue-600" />
                            Founded Year
                          </label>
                          <input
                            type="text"
                            value={companyInfo.founded}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, founded: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                            placeholder="2009"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Company Description
                        </label>
                        <textarea
                          value={companyInfo.description}
                          onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm resize-none"
                          placeholder="Describe your company's mission, values, and services..."
                        />
                      </div>

                      {/* Services */}
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Services Offered (one per line)
                        </label>
                        <textarea
                          value={companyInfo.services.join('\n')}
                          onChange={(e) => setCompanyInfo({ ...companyInfo, services: e.target.value.split('\n').filter(s => s.trim()) })}
                          rows={6}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm resize-none"
                          placeholder="Kitchen Remodeling&#10;Bathroom Renovation&#10;Commercial Remodeling&#10;Interior Design&#10;Home Additions&#10;Flooring Installation"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={saveCompanyInfo}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center"
                      >
                        <Save className="w-5 h-5 mr-2" />
                        Save Company Information
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Blog Posts Tab */}
              {activeTab === 'blogs' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Blog Header */}
                  <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-2xl p-8 border border-purple-100 shadow-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
                          <p className="text-gray-600">Create and manage your blog content</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Create New Post
                      </motion.button>
                    </div>
                  </div>

                  {editingBlog ? (
                    <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-8 border border-gray-100 shadow-lg">
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {editingBlog.id === 0 ? 'Create New Blog Post' : 'Edit Blog Post'}
                        </h3>
                        <p className="text-gray-600">Fill in the details for your blog post</p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Post Title
                          </label>
                          <input
                            type="text"
                            value={editingBlog.title || ''}
                            onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm"
                            placeholder="Enter your blog post title"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Category
                          </label>
                          <select
                            value={editingBlog.category || ''}
                            onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm"
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
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            <User className="w-4 h-4 inline mr-2 text-purple-600" />
                            Author
                          </label>
                          <input
                            type="text"
                            value={editingBlog.author || ''}
                            onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm"
                            placeholder="REMODELY Team"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            <Calendar className="w-4 h-4 inline mr-2 text-purple-600" />
                            Publication Date
                          </label>
                          <input
                            type="date"
                            value={editingBlog.date || ''}
                            onChange={(e) => setEditingBlog({ ...editingBlog, date: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm"
                          />
                        </div>

                        <div className="lg:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Featured Image URL
                          </label>
                          <input
                            type="url"
                            value={editingBlog.image || ''}
                            onChange={(e) => setEditingBlog({ ...editingBlog, image: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>

                        <div className="lg:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Post Excerpt
                          </label>
                          <textarea
                            value={editingBlog.excerpt || ''}
                            onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm resize-none"
                            placeholder="Write a brief excerpt that will appear in blog previews..."
                          />
                        </div>

                        <div className="lg:col-span-2">
                          <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-semibold text-gray-700">
                              Post Content
                            </label>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowAIWriter(true)}
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 border border-purple-200 rounded-xl hover:bg-purple-200 transition-all duration-200"
                            >
                              <Sparkles className="w-4 h-4 mr-2" />
                              AI Writer Assistant
                            </motion.button>
                          </div>
                          <textarea
                            value={editingBlog.content || ''}
                            onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                            rows={12}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm resize-none"
                            placeholder="Write your blog content here or use the AI Writer Assistant to generate content..."
                          />
                        </div>

                        <div className="lg:col-span-2">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingBlog.published || false}
                              onChange={(e) => setEditingBlog({ ...editingBlog, published: e.target.checked })}
                              className="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 w-5 h-5"
                            />
                            <span className="ml-3 text-sm font-medium text-gray-700">
                              Publish this post immediately
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setEditingBlog(null)}
                          className="px-6 py-3 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium transition-all duration-200"
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => saveBlogPost(editingBlog)}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center"
                        >
                          <Save className="w-5 h-5 mr-2" />
                          {editingBlog.id === 0 ? 'Create Post' : 'Update Post'}
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {blogPosts.map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.published
                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                    : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                  }`}>
                                  {post.published ? '✓ Published' : '⏳ Draft'}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                              <div className="flex items-center space-x-6 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                                  {new Date(post.date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center">
                                  <User className="w-4 h-4 mr-2 text-purple-500" />
                                  {post.author}
                                </span>
                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium border border-purple-200">
                                  {post.category}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-6">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setEditingBlog(post)}
                                className="p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
                                title="Edit post"
                              >
                                <Edit3 className="w-5 h-5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => deleteBlogPost(post.id)}
                                className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                                title="Delete post"
                              >
                                <Trash2 className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
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
                  className="space-y-8"
                >
                  {/* Enhanced Image Management Header */}
                  <div className="bg-gradient-to-br from-white to-green-50/50 rounded-2xl p-8 border border-green-100 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Image Gallery Manager</h2>
                          <p className="text-gray-600">Upload, replace, organize, and publish images site-wide</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowImageUpload(true)}
                          className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center"
                        >
                          <Upload className="w-5 h-5 mr-2" />
                          Upload Images
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Image Manager Component */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
                    <EnhancedImageManager />
                  </div>
                </motion.div>
              )}

              {/* Email System Tab */}
              {activeTab === 'email' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Email Header */}
                  <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-2xl p-8 border border-orange-100 shadow-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Email System</h2>
                        <p className="text-gray-600">Test and manage your email communications</p>
                      </div>
                    </div>
                  </div>

                  {/* Email Status Alert */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-6 shadow-lg"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                          🧪 Test Mode Active
                        </h3>
                        <div className="text-yellow-700">
                          <p className="mb-3">
                            Gmail credentials are currently invalid or missing. All email tests will run in simulation mode.
                          </p>
                          <div className="bg-white/50 rounded-xl p-4 border border-yellow-200">
                            <p className="font-medium mb-2">To enable actual email sending:</p>
                            <ol className="list-decimal list-inside space-y-1 text-sm">
                              <li>Generate a new Gmail App Password at <a href="https://myaccount.google.com/apppasswords" target="_blank" className="underline font-medium hover:text-yellow-900">Google App Passwords</a></li>
                              <li>Update the GMAIL_APP_PASSWORD in your .env.local file</li>
                              <li>Restart the development server</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Email Status Dashboard */}
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      System Status
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                        <div className="flex items-center mb-2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-green-800">Email Provider</h4>
                        </div>
                        <p className="text-green-700 font-medium">Gmail SMTP</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                        <div className="flex items-center mb-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                            <Mail className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-bold text-blue-800">From Address</h4>
                        </div>
                        <p className="text-blue-700 font-medium">{companyInfo.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Email Test Section */}
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                      </div>
                      Email Templates
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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
                        className="flex flex-col items-center justify-center space-y-4 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-lg"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                          <Mail className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-center">
                          <h4 className="font-bold text-blue-900">Welcome Email</h4>
                          <p className="text-blue-700 text-sm">Customer welcome message</p>
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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
                        className="flex flex-col items-center justify-center space-y-4 p-8 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-lg"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-center">
                          <h4 className="font-bold text-green-900">Quote Email</h4>
                          <p className="text-green-700 text-sm">Project estimate delivery</p>
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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
                        className="flex flex-col items-center justify-center space-y-4 p-8 bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 border border-orange-200 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-lg"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-center">
                          <h4 className="font-bold text-orange-900">Contact Form</h4>
                          <p className="text-orange-700 text-sm">Customer inquiry notification</p>
                        </div>
                      </motion.button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                        <Wand2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href="/email-test"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-4 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-indigo-900">Email Test Panel</h4>
                          <p className="text-indigo-700 text-sm">Advanced testing interface</p>
                        </div>
                      </motion.a>

                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://myaccount.google.com/apppasswords"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-4 p-6 bg-gradient-to-br from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 border border-red-200 rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                          <Settings className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-red-900">Gmail Settings</h4>
                          <p className="text-red-700 text-sm">Manage app passwords</p>
                        </div>
                      </motion.a>
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
                  className="space-y-8"
                >
                  {/* Settings Header */}
                  <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-8 border border-gray-100 shadow-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl flex items-center justify-center mr-4">
                        <Settings className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
                        <p className="text-gray-600">Configure advanced system options</p>
                      </div>
                    </div>
                  </div>

                  {/* Coming Soon Card */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-6">
                        <Settings className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-yellow-800 mb-2">
                          🚀 Advanced Settings Coming Soon
                        </h3>
                        <div className="text-yellow-700 space-y-2">
                          <p className="text-lg">
                            We're working on exciting new features for the next update!
                          </p>
                          <div className="bg-white/50 rounded-xl p-4 border border-yellow-200">
                            <h4 className="font-semibold mb-3">Planned Features:</h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                                SEO Settings & Meta Management
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                                Google Analytics Integration
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                                Site Performance Monitoring
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                                Backup & Restore Options
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                                User Management System
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                                Advanced Theme Customization
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current System Info */}
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <Settings className="w-5 h-5 text-gray-600" />
                      </div>
                      Current Configuration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                        <h4 className="font-bold text-blue-900 mb-2">Framework</h4>
                        <p className="text-blue-700">Next.js 14.0.0 with App Router</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                        <h4 className="font-bold text-green-900 mb-2">Authentication</h4>
                        <p className="text-green-700">JWT with Secure Cookies</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                        <h4 className="font-bold text-purple-900 mb-2">Image Storage</h4>
                        <p className="text-purple-700">Cloudinary + Local Fallback</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
                        <h4 className="font-bold text-orange-900 mb-2">Email System</h4>
                        <p className="text-orange-700">Gmail SMTP with Nodemailer</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced AI Writer Modal */}
        {showAIWriter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                    <Wand2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">AI Content Writer</h3>
                    <p className="text-gray-600">Generate professional blog content instantly</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAIWriter(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    What would you like to write about?
                  </label>
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none"
                    placeholder="e.g., 'Write a blog post about summer kitchen renovation tips for Arizona homeowners'"
                  />
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <p className="text-sm text-purple-800 font-medium">
                        AI-Powered Content Generation
                      </p>
                      <p className="text-xs text-purple-600">
                        The AI will generate a title, excerpt, and full content based on your prompt.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAIWriter(false)}
                    className="px-6 py-3 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium transition-all duration-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateAIContent}
                    disabled={isGenerating || !aiPrompt.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Generating Content...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-3" />
                        Generate Content
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </AuthWrapper>
  )
}

export default AdminPanel
