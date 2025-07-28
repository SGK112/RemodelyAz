import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Shield, FileText, Users, Calendar } from 'lucide-react'
import { useAuth } from '../App'
import LoadingSpinner from './LoadingSpinner'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-8">
            <Shield className="h-8 w-8" />
            <span className="text-2xl font-bold">SecureShare</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">
            Secure File Sharing for Construction Projects
          </h1>
          
          <p className="text-xl text-blue-100 mb-12">
            Collaborate safely with clients and contractors. Share photos, documents, and project updates with enterprise-grade security.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-3 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Secure File Sharing</h3>
                <p className="text-blue-100">End-to-end encrypted file uploads and sharing</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-3 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Team Collaboration</h3>
                <p className="text-blue-100">Invite clients and contractors to projects</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-3 rounded-lg">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Project Scheduling</h3>
                <p className="text-blue-100">Coordinate timelines and milestones</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-blue-200">
          © 2025 SecureShare. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold">SecureShare</span>
            </div>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link
                  to="/register"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </div>
              
              <div className="mt-4 text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>Demo Credentials:</p>
            <p>Email: admin@securefileshare.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

