import { useState, useEffect } from 'react'
import { 
  Download, 
  Eye, 
  Trash2, 
  Search, 
  Filter, 
  Grid, 
  List, 
  File, 
  Image, 
  FileText, 
  Archive,
  Calendar,
  User,
  AlertCircle,
  RefreshCw
} from 'lucide-react'

const FileGallery = ({ projectId, onError }) => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const categories = [
    { value: 'all', label: 'All Files' },
    { value: 'images', label: 'Images' },
    { value: 'documents', label: 'Documents' },
    { value: 'spreadsheets', label: 'Spreadsheets' },
    { value: 'presentations', label: 'Presentations' },
    { value: 'archives', label: 'Archives' },
    { value: 'cad', label: 'CAD Files' },
    { value: 'other', label: 'Other' }
  ]

  const getFileIcon = (mimeType, category) => {
    if (mimeType?.startsWith('image/')) {
      return <Image className="w-6 h-6 text-blue-500" />
    }
    
    switch (category) {
      case 'documents':
        return <FileText className="w-6 h-6 text-red-500" />
      case 'spreadsheets':
        return <FileText className="w-6 h-6 text-green-500" />
      case 'presentations':
        return <FileText className="w-6 h-6 text-orange-500" />
      case 'archives':
        return <Archive className="w-6 h-6 text-purple-500" />
      default:
        return <File className="w-6 h-6 text-gray-500" />
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const fetchFiles = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('access_token')
      
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: '20'
      })
      
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory)
      }
      
      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim())
      }

      const response = await fetch(`https://dyh6i3c9xqmo.manus.space/api/files/project/${projectId}?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      
      if (result.success) {
        setFiles(result.data.files)
        setTotalPages(result.data.pagination.pages)
      } else {
        onError?.(result.error.message)
      }
    } catch (error) {
      onError?.('Failed to load files')
    } finally {
      setLoading(false)
    }
  }

  const downloadFile = async (fileId, filename) => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch(`https://dyh6i3c9xqmo.manus.space/api/files/${fileId}/download`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        const result = await response.json()
        onError?.(result.error?.message || 'Download failed')
      }
    } catch (error) {
      onError?.('Download failed')
    }
  }

  const deleteFile = async (fileId) => {
    if (!confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
      return
    }

    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch(`https://dyh6i3c9xqmo.manus.space/api/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      
      if (result.success) {
        setFiles(prev => prev.filter(f => f.id !== fileId))
      } else {
        onError?.(result.error.message)
      }
    } catch (error) {
      onError?.('Failed to delete file')
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchFiles()
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setPage(1)
  }

  useEffect(() => {
    if (projectId) {
      fetchFiles()
    }
  }, [projectId, page, selectedCategory])

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm !== '') {
        setPage(1)
        fetchFiles()
      }
    }, 500)

    return () => clearTimeout(delayedSearch)
  }, [searchTerm])

  if (loading && files.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading files...</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Project Files</h3>
            <p className="text-sm text-gray-600">
              {files.length} file{files.length !== 1 ? 's' : ''} in this project
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Files Display */}
      {files.length === 0 ? (
        <div className="text-center py-12">
          <File className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
          <p className="text-gray-600">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Upload some files to get started'
            }
          </p>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {files.map((file) => (
                <div key={file.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    {getFileIcon(file.mime_type, file.metadata?.category)}
                    <div className="flex space-x-1">
                      <button
                        onClick={() => downloadFile(file.id, file.filename)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteFile(file.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 text-sm mb-1 truncate" title={file.filename}>
                    {file.filename}
                  </h4>
                  
                  <p className="text-xs text-gray-500 mb-2">
                    {formatFileSize(file.size)}
                  </p>
                  
                  {file.description && (
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {file.description}
                    </p>
                  )}
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <User className="w-3 h-3 mr-1" />
                    <span className="truncate">{file.uploaded_by}</span>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{formatDate(file.uploaded_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Uploaded By
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {files.map((file) => (
                      <tr key={file.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {getFileIcon(file.mime_type, file.metadata?.category)}
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                {file.filename}
                              </p>
                              {file.description && (
                                <p className="text-xs text-gray-500 truncate max-w-xs">
                                  {file.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {formatFileSize(file.size)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {file.uploaded_by}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {formatDate(file.uploaded_at)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => downloadFile(file.id, file.filename)}
                              className="p-1 text-gray-400 hover:text-blue-600"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteFile(file.id)}
                              className="p-1 text-gray-400 hover:text-red-600"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPage(prev => Math.max(1, prev - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default FileGallery

