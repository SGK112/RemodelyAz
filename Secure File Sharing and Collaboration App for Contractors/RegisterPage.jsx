import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Eye, EyeOff, Shield, CheckCircle } from 'lucide-react'
import { useAuth } from '../App'
import LoadingSpinner from './LoadingSpinner'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: '',
    role: '',
    profile: {
      company_name: '',
      bio: '',
      website: '',
      address: {
        line1: '',
        city: '',
        state: '',
        zip_code: '',
      },
    },
    contractor_profile: {
      license_number: '',
      license_state: '',
      insurance_provider: '',
      years_experience: '',
      hourly_rate: '',
      specialties: [],
    },
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Prepare data for submission
    const submitData = {
      email: formData.email,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      role: formData.role,
      profile: formData.profile,
    }

    // Add contractor profile if role is contractor
    if (formData.role === 'contractor') {
      submitData.contractor_profile = formData.contractor_profile
    }

    const result = await register(submitData)
    
    if (result.success) {
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child, grandchild] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [grandchild ? child : child]: grandchild ? {
            ...prev[parent][child],
            [grandchild]: value
          } : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleRoleChange = (value) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }))
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
              <p className="text-muted-foreground mb-4">
                Your account has been created successfully. You will be redirected to the login page.
              </p>
              <LoadingSpinner />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">SecureShare</span>
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
            <CardDescription>
              Join SecureShare to start collaborating on construction projects
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      placeholder="John"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      placeholder="Doe"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Account Type</Label>
                  <Select onValueChange={handleRoleChange} disabled={loading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client - I need construction work done</SelectItem>
                      <SelectItem value="contractor">Contractor - I provide construction services</SelectItem>
                      <SelectItem value="project_manager">Project Manager - I manage construction projects</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Password Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Security</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
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
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={loading}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Profile Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="profile.company_name">Company Name</Label>
                  <Input
                    id="profile.company_name"
                    name="profile.company_name"
                    placeholder="Your company name"
                    value={formData.profile.company_name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="profile.bio">Bio</Label>
                  <Textarea
                    id="profile.bio"
                    name="profile.bio"
                    placeholder="Tell us about yourself and your experience"
                    value={formData.profile.bio}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Contractor-specific fields */}
              {formData.role === 'contractor' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contractor Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contractor_profile.license_number">License Number</Label>
                      <Input
                        id="contractor_profile.license_number"
                        name="contractor_profile.license_number"
                        placeholder="Your license number"
                        value={formData.contractor_profile.license_number}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contractor_profile.years_experience">Years of Experience</Label>
                      <Input
                        id="contractor_profile.years_experience"
                        name="contractor_profile.years_experience"
                        type="number"
                        placeholder="10"
                        value={formData.contractor_profile.years_experience}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contractor_profile.hourly_rate">Hourly Rate ($)</Label>
                    <Input
                      id="contractor_profile.hourly_rate"
                      name="contractor_profile.hourly_rate"
                      type="number"
                      placeholder="75"
                      value={formData.contractor_profile.hourly_rate}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

