'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Building, Camera, Save, Upload, Trash2, LogOut } from 'lucide-react'

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

interface ImageAsset {
  id: string
  name: string
  url: string
  category: string
  size: number
  uploadDate: string
  description: string
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

  const [images, setImages] = useState<ImageAsset[]>([])
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const router = useRouter()

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  useEffect(() => {
    loadImages()
  }, [])

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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('image', file)
      formData.append('category', 'Gallery')
      formData.append('description', `Uploaded: ${file.name}`)

      try {
        const response = await fetch('/api/admin/images', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const result = await response.json()
          setImages(prev => [...prev, result.image])
          showNotification('success', `${file.name} uploaded successfully!`)
        } else {
          showNotification('error', `Failed to upload ${file.name}`)
        }
      } catch (error) {
        showNotification('error', `Failed to upload ${file.name}`)
      }
    }

    event.target.value = ''
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

  const handleLogout = () => {
    sessionStorage.removeItem('admin-logged-in')
    router.push('/admin/login')
  }

  const tabs = [
    { id: 'company', label: 'Company Info', icon: <Building className="w-5 h-5" /> },
    { id: 'images', label: 'Image Management', icon: <Camera className="w-5 h-5" /> }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              REMODELY LLC Admin Panel
            </h1>
            <p className="text-gray-600">
              Manage your website content and images
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
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
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={companyInfo.address}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={companyInfo.phone}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={saveCompanyInfo}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Company Info
                  </button>
                </div>
              </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Image Management</h3>
                  <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center cursor-pointer">
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

                {images.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No images uploaded</h3>
                    <p className="text-gray-600 mb-4">Upload your first image to get started</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {images.map((image) => (
                      <div key={image.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
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
                          <p className="text-sm text-gray-600 mb-2">{image.description || 'No description'}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span className="bg-gray-100 px-2 py-1 rounded">{image.category}</span>
                            <span>{(image.size / 1024).toFixed(1)} KB</span>
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={() => deleteImage(image.id)}
                              className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete image"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
