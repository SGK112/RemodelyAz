import React, { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import './App.css'

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api'

// Auth Context
const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// API Helper Functions
const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const token = localStorage.getItem('access_token')
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Request failed')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Auth endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  async getCurrentUser() {
    return this.request('/auth/me')
  },

  // Project endpoints
  async getProjects() {
    return this.request('/projects')
  },

  async createProject(projectData) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    })
  },

  async getProject(projectId) {
    return this.request(`/projects/${projectId}`)
  },

  async getProjectFiles(projectId) {
    return this.request(`/files/project/${projectId}`)
  },

  // File upload
  async uploadFile(projectId, file, metadata = {}) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('project_id', projectId)
    
    Object.keys(metadata).forEach(key => {
      formData.append(key, metadata[key])
    })

    const token = localStorage.getItem('access_token')
    const response = await fetch(`${API_BASE_URL}/files/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error?.message || 'Upload failed')
    }
    return data
  },

  // Messages and notes
  async getProjectNotes(projectId) {
    return this.request(`/messages/notes?project_id=${projectId}`)
  },

  async createNote(noteData) {
    return this.request('/messages/notes', {
      method: 'POST',
      body: JSON.stringify(noteData),
    })
  },

  // Calendar
  async getEvents(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/calendar/events?${queryString}`)
  },

  async createEvent(eventData) {
    return this.request('/calendar/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    })
  },
}

// Auth Provider Component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      api.getCurrentUser()
        .then(response => {
          setUser(response.data.user)
        })
        .catch(() => {
          localStorage.removeItem('access_token')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.login(email, password)
      localStorage.setItem('access_token', response.data.access_token)
      setUser(response.data.user)
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    setUser(null)
  }

  const register = async (userData) => {
    try {
      const response = await api.register(userData)
      return response
    } catch (error) {
      throw error
    }
  }

  const value = {
    user,
    login,
    logout,
    register,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Loading Component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  )
}

// Login Component
function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to SecureShare
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Secure file sharing for construction projects
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Demo credentials: admin@securefileshare.com / admin123
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

// Dashboard Component
function Dashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateProject, setShowCreateProject] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const response = await api.getProjects()
      setProjects(response.data.projects)
    } catch (error) {
      console.error('Failed to load projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = async (projectData) => {
    try {
      await api.createProject(projectData)
      setShowCreateProject(false)
      loadProjects()
    } catch (error) {
      console.error('Failed to create project:', error)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">SecureShare</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user?.first_name}</span>
              <button
                onClick={logout}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            <button
              onClick={() => setShowCreateProject(true)}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Create Project
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {project.description || 'No description'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {project.project_type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-4">Create your first project to get started</p>
              <button
                onClick={() => setShowCreateProject(true)}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Create Project
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Create Project Modal */}
      {showCreateProject && (
        <CreateProjectModal
          onClose={() => setShowCreateProject(false)}
          onSubmit={handleCreateProject}
        />
      )}
    </div>
  )
}

// Create Project Modal Component
function CreateProjectModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_type: 'renovation',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Project</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Title
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                value={formData.project_type}
                onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
              >
                <option value="renovation">Renovation</option>
                <option value="new_construction">New Construction</option>
                <option value="repair">Repair</option>
                <option value="maintenance">Maintenance</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Project Details Component (placeholder)
function ProjectDetails() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={() => navigate('/dashboard')}
        className="mb-4 text-primary hover:text-primary/80"
      >
        ← Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold mb-4">Project Details</h1>
      <p>Project details component will be implemented in the next phase.</p>
    </div>
  )
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

