'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Edit, Save, X, Check, AlertCircle, ExternalLink } from 'lucide-react'

interface GalleryProject {
    id: number
    title: string
    url: string
    category: string
    tags: string[]
    description: string
}

const SimpleGalleryAdmin = () => {
    const [projects, setProjects] = useState<GalleryProject[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editUrl, setEditUrl] = useState('')
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        loadProjects()
    }, [])

    const loadProjects = async () => {
        try {
            const response = await fetch('/api/admin/gallery-projects')
            const data = await response.json()
            if (data.success) {
                setProjects(data.data)
            }
        } catch (error) {
            console.error('Error loading projects')
        } finally {
            setLoading(false)
        }
    }

    const startEdit = (project: GalleryProject) => {
        setEditingId(project.id)
        setEditUrl(project.url)
    }

    const saveEdit = async () => {
        if (!editingId) return

        const updatedProjects = projects.map(p =>
            p.id === editingId ? { ...p, url: editUrl } : p
        )

        try {
            const response = await fetch('/api/admin/gallery-projects', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projects: updatedProjects })
            })

            if (response.ok) {
                setProjects(updatedProjects)
                setMessage('✅ Image updated successfully!')
                setEditingId(null)
                setTimeout(() => setMessage(''), 3000)
            }
        } catch (error) {
            setMessage('❌ Failed to save changes')
            setTimeout(() => setMessage(''), 3000)
        }
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditUrl('')
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
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🖼️ Gallery Image Manager
                    </h1>
                    <p className="text-lg text-gray-600 mb-2">
                        Click the <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">EDIT IMAGE</span> button to update any photo
                    </p>
                    <p className="text-sm text-gray-500">
                        Loaded {projects.length} projects • Changes save instantly
                    </p>
                </div>

                {message && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg text-center">
                        <p className="text-green-800 font-medium">{message}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            {/* Image */}
                            <div className="relative aspect-[4/3] bg-gray-100">
                                <Image
                                    src={project.url}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'
                                    }}
                                />
                                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-mono">
                                    ID: {project.id}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="mb-3">
                                    <h3 className="font-bold text-gray-900 mb-1 text-lg">
                                        {project.title}
                                    </h3>
                                    <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                        {project.category}
                                    </span>
                                </div>

                                {editingId === project.id ? (
                                    /* Edit Mode */
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                New Image URL:
                                            </label>
                                            <input
                                                type="url"
                                                value={editUrl}
                                                onChange={(e) => setEditUrl(e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="https://images.unsplash.com/..."
                                            />
                                        </div>

                                        {editUrl && (
                                            <a
                                                href={editUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm"
                                            >
                                                <ExternalLink className="w-4 h-4 mr-1" />
                                                Test URL
                                            </a>
                                        )}

                                        <div className="flex space-x-2">
                                            <button
                                                onClick={saveEdit}
                                                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium text-sm flex items-center justify-center"
                                            >
                                                <Save className="w-4 h-4 mr-1" />
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm flex items-center justify-center"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* Display Mode */
                                    <div>
                                        <p className="text-gray-600 text-sm mb-3">
                                            {project.description}
                                        </p>

                                        <button
                                            onClick={() => startEdit(project)}
                                            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 font-bold text-sm flex items-center justify-center transition-colors"
                                        >
                                            <Edit className="w-4 h-4 mr-2" />
                                            EDIT IMAGE
                                        </button>

                                        <div className="mt-2 text-xs text-gray-400 break-all">
                                            Current: {project.url.substring(0, 50)}...
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Instructions */}
                <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                    <h3 className="font-bold text-blue-900 mb-4 text-xl">
                        📋 How to Update Images
                    </h3>
                    <div className="text-blue-800 space-y-3">
                        <div className="flex items-start space-x-3">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                            <p><strong>Find an image:</strong> Go to surprisegranite.com, right-click any image, select "Copy image address"</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                            <p><strong>Click "EDIT IMAGE"</strong> on the project you want to update</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                            <p><strong>Paste the URL</strong> in the text box and click "Test URL" to verify it works</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                            <p><strong>Click "Save"</strong> and the image will update immediately on your gallery!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimpleGalleryAdmin
