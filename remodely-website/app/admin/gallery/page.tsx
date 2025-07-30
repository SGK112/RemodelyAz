'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Save, Edit2, X, Check, AlertCircle, Image as ImageIcon, ExternalLink } from 'lucide-react'

interface GalleryProject {
    id: number
    title: string
    url: string
    category: string
    tags: string[]
    description: string
}

const GalleryAdmin = () => {
    const [projects, setProjects] = useState<GalleryProject[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editForm, setEditForm] = useState<Partial<GalleryProject>>({})
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    useEffect(() => {
        loadProjects()
    }, [])

    const loadProjects = async () => {
        try {
            // Try to load from API first
            let response = await fetch('/api/admin/gallery-projects')
            if (!response.ok) {
                // Fallback to direct JSON file
                response = await fetch('/data/gallery-projects.json')
            }
            const data = await response.json()
            setProjects(Array.isArray(data) ? data : data.data || [])
        } catch (error) {
            console.error('Error loading projects:', error)
            showMessage('error', 'Failed to load gallery projects')
        } finally {
            setLoading(false)
        }
    }

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text })
        setTimeout(() => setMessage(null), 5000)
    }

    const startEdit = (project: GalleryProject) => {
        setEditingId(project.id)
        setEditForm({ ...project })
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditForm({})
    }

    const saveEdit = async () => {
        if (!editForm.id) return

        setSaving(true)
        try {
            const updatedProjects = projects.map(p =>
                p.id === editForm.id ? { ...p, ...editForm } : p
            )

            // In a real implementation, you'd save to your backend/API
            // For now, we'll show how it would work
            const response = await fetch('/api/admin/gallery-projects', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projects: updatedProjects })
            })

            if (response.ok) {
                setProjects(updatedProjects)
                showMessage('success', 'Project updated successfully!')
                cancelEdit()
            } else {
                throw new Error('Failed to save')
            }
        } catch (error) {
            showMessage('error', 'Failed to save changes')
        } finally {
            setSaving(false)
        }
    }

    const testImageUrl = async (url: string) => {
        try {
            const response = await fetch(url, { method: 'HEAD' })
            return response.ok
        } catch {
            return false
        }
    }

    const handleImageUrlChange = async (url: string) => {
        setEditForm(prev => ({ ...prev, url }))

        if (url) {
            const isValid = await testImageUrl(url)
            setEditForm(prev => ({ ...prev, imageValid: isValid }))
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading gallery projects...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                        Gallery Admin
                    </h1>
                    <p className="text-gray-600">
                        Manage gallery images and descriptions. Click the blue "Edit" button on any project to update.
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                        {projects.length > 0 ? `Loaded ${projects.length} projects` : 'Loading projects...'}
                    </div>
                </div>

                {/* Message */}
                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${message.type === 'success'
                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                    : 'bg-red-100 text-red-800 border border-red-200'
                                }`}
                        >
                            {message.type === 'success' ? (
                                <Check className="w-5 h-5" />
                            ) : (
                                <AlertCircle className="w-5 h-5" />
                            )}
                            <span>{message.text}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Projects Grid */}
                {projects.length === 0 && !loading ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                        <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Found</h3>
                        <p className="text-gray-600 mb-4">
                            Unable to load gallery projects. Check that the data file exists.
                        </p>
                        <button
                            onClick={loadProjects}
                            className="bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700"
                        >
                            Retry Loading
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] bg-gray-100">
                                    <Image
                                        src={project.url}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        onError={() => console.log(`Failed to load: ${project.url}`)}
                                    />
                                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                                        ID: {project.id}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {editingId === project.id ? (
                                        /* Edit Form */
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editForm.title || ''}
                                                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Image URL
                                                </label>
                                                <div className="space-y-2">
                                                    <input
                                                        type="url"
                                                        value={editForm.url || ''}
                                                        onChange={(e) => handleImageUrlChange(e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                                                        placeholder="https://images.unsplash.com/..."
                                                    />
                                                    {editForm.url && (
                                                        <a
                                                            href={editForm.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center text-sm text-accent-600 hover:text-accent-700"
                                                        >
                                                            <ExternalLink className="w-4 h-4 mr-1" />
                                                            Test URL
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Category
                                                </label>
                                                <select
                                                    value={editForm.category || ''}
                                                    onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                                                >
                                                    <option value="kitchen">Kitchen</option>
                                                    <option value="bathroom">Bathroom</option>
                                                    <option value="commercial">Commercial</option>
                                                    <option value="tile">Tile</option>
                                                    <option value="countertops">Countertops</option>
                                                    <option value="cabinets">Cabinets</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    value={editForm.description || ''}
                                                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                                                    rows={3}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                                                />
                                            </div>

                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={saveEdit}
                                                    disabled={saving}
                                                    className="flex-1 bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 disabled:opacity-50 flex items-center justify-center"
                                                >
                                                    <Save className="w-4 h-4 mr-2" />
                                                    {saving ? 'Saving...' : 'Save'}
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Display Mode */
                                        <div>
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">
                                                        {project.title}
                                                    </h3>
                                                    <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                                                        {project.category}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => startEdit(project)}
                                                    className="bg-accent-600 text-white px-3 py-2 rounded-lg hover:bg-accent-700 transition-colors flex items-center space-x-2 font-medium"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                    <span>Edit</span>
                                                </button>
                                            </div>

                                            <p className="text-gray-600 text-sm mb-3">
                                                {project.description}
                                            </p>

                                            <div className="text-xs text-gray-400 break-all">
                                                {project.url}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Instructions */}
                <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                        <ImageIcon className="w-5 h-5 mr-2" />
                        How to Use This Tool
                    </h3>
                    <div className="text-blue-800 space-y-2 text-sm">
                        <p>• Click the edit icon on any project to modify its image URL and details</p>
                        <p>• Use high-quality images from Unsplash, your Webflow assets, or other sources</p>
                        <p>• Test image URLs by clicking "Test URL" to make sure they load properly</p>
                        <p>• Changes are saved immediately and will appear on your gallery page</p>
                        <p>• Categories help organize projects: kitchen, bathroom, commercial, tile, countertops, cabinets</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GalleryAdmin
