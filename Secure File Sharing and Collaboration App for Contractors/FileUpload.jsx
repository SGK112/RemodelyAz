import { useState, useRef } from 'react'
import { Upload, X, File, Image, FileText, Archive, Wrench, AlertCircle, CheckCircle } from 'lucide-react'

const FileUpload = ({ projectId, onUploadComplete, onUploadError }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadQueue, setUploadQueue] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const allowedTypes = {
    'image/png': { icon: Image, category: 'Image' },
    'image/jpeg': { icon: Image, category: 'Image' },
    'image/jpg': { icon: Image, category: 'Image' },
    'image/gif': { icon: Image, category: 'Image' },
    'image/webp': { icon: Image, category: 'Image' },
    'application/pdf': { icon: FileText, category: 'Document' },
    'application/msword': { icon: FileText, category: 'Document' },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { icon: FileText, category: 'Document' },
    'text/plain': { icon: FileText, category: 'Document' },
    'application/zip': { icon: Archive, category: 'Archive' },
    'application/x-rar-compressed': { icon: Archive, category: 'Archive' },
    'application/vnd.ms-excel': { icon: FileText, category: 'Spreadsheet' },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { icon: FileText, category: 'Spreadsheet' },
    'application/vnd.ms-powerpoint': { icon: FileText, category: 'Presentation' },
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': { icon: FileText, category: 'Presentation' }
  }

  const maxFileSize = 100 * 1024 * 1024 // 100MB
  const maxFiles = 10

  const validateFile = (file) => {
    const errors = []
    
    if (!allowedTypes[file.type]) {
      errors.push(`File type "${file.type}" is not allowed`)
    }
    
    if (file.size > maxFileSize) {
      errors.push(`File size exceeds 100MB limit`)
    }
    
    return errors
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (file) => {
    const fileInfo = allowedTypes[file.type]
    if (fileInfo) {
      const IconComponent = fileInfo.icon
      return <IconComponent className="w-8 h-8 text-blue-500" />
    }
    return <File className="w-8 h-8 text-gray-500" />
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    if (uploadQueue.length + files.length > maxFiles) {
      onUploadError?.(`Cannot upload more than ${maxFiles} files at once`)
      return
    }

    const newFiles = files.map(file => {
      const errors = validateFile(file)
      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: errors.length > 0 ? 'error' : 'pending',
        errors,
        progress: 0,
        description: ''
      }
    })

    setUploadQueue(prev => [...prev, ...newFiles])
  }

  const removeFile = (fileId) => {
    setUploadQueue(prev => prev.filter(f => f.id !== fileId))
  }

  const updateFileDescription = (fileId, description) => {
    setUploadQueue(prev => prev.map(f => 
      f.id === fileId ? { ...f, description } : f
    ))
  }

  const uploadFile = async (fileItem) => {
    const formData = new FormData()
    formData.append('file', fileItem.file)
    formData.append('project_id', projectId)
    formData.append('description', fileItem.description)

    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch('https://dyh6i3c9xqmo.manus.space/api/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const result = await response.json()
      
      if (result.success) {
        return { success: true, data: result.data }
      } else {
        return { success: false, error: result.error.message }
      }
    } catch (error) {
      return { success: false, error: 'Network error occurred' }
    }
  }

  const startUpload = async () => {
    const validFiles = uploadQueue.filter(f => f.status === 'pending')
    
    if (validFiles.length === 0) {
      onUploadError?.('No valid files to upload')
      return
    }

    setIsUploading(true)

    for (const fileItem of validFiles) {
      // Update status to uploading
      setUploadQueue(prev => prev.map(f => 
        f.id === fileItem.id ? { ...f, status: 'uploading', progress: 0 } : f
      ))

      const result = await uploadFile(fileItem)
      
      if (result.success) {
        setUploadQueue(prev => prev.map(f => 
          f.id === fileItem.id ? { ...f, status: 'completed', progress: 100 } : f
        ))
      } else {
        setUploadQueue(prev => prev.map(f => 
          f.id === fileItem.id ? { 
            ...f, 
            status: 'error', 
            errors: [result.error] 
          } : f
        ))
      }
    }

    setIsUploading(false)
    
    // Call completion callback
    const completedFiles = uploadQueue.filter(f => f.status === 'completed')
    if (completedFiles.length > 0) {
      onUploadComplete?.(completedFiles)
    }

    // Clear completed files after a delay
    setTimeout(() => {
      setUploadQueue(prev => prev.filter(f => f.status !== 'completed'))
    }, 3000)
  }

  const clearAll = () => {
    setUploadQueue([])
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Files</h3>
        <p className="text-sm text-gray-600">
          Upload photos, documents, and project files. Maximum file size: 100MB. 
          Supported formats: Images, PDFs, Office documents, Archives, and CAD files.
        </p>
      </div>

      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          Drop files here or click to browse
        </p>
        <p className="text-sm text-gray-500">
          Select up to {maxFiles} files at once
        </p>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          accept={Object.keys(allowedTypes).join(',')}
        />
      </div>

      {/* Upload Queue */}
      {uploadQueue.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-900">
              Files to Upload ({uploadQueue.length})
            </h4>
            <div className="space-x-2">
              <button
                onClick={clearAll}
                disabled={isUploading}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
              >
                Clear All
              </button>
              <button
                onClick={startUpload}
                disabled={isUploading || uploadQueue.filter(f => f.status === 'pending').length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Upload Files'}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {uploadQueue.map((fileItem) => (
              <div key={fileItem.id} className="border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getFileIcon(fileItem.file)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {fileItem.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(fileItem.size)} • {allowedTypes[fileItem.type]?.category || 'Unknown'}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {fileItem.status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {fileItem.status === 'error' && (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                        {fileItem.status !== 'uploading' && (
                          <button
                            onClick={() => removeFile(fileItem.id)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Description Input */}
                    {fileItem.status === 'pending' && (
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Add description (optional)"
                          value={fileItem.description}
                          onChange={(e) => updateFileDescription(fileItem.id, e.target.value)}
                          className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    {/* Progress Bar */}
                    {fileItem.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${fileItem.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Errors */}
                    {fileItem.errors && fileItem.errors.length > 0 && (
                      <div className="mt-2">
                        {fileItem.errors.map((error, index) => (
                          <p key={index} className="text-xs text-red-600">
                            {error}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload

