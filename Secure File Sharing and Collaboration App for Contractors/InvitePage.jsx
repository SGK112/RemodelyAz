import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, MapPin, DollarSign, Calendar, Users, FileText, ExternalLink } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'

export default function InvitePage() {
  const { projectId, token } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProjectInfo()
  }, [projectId, token])

  const fetchProjectInfo = async () => {
    try {
      // This would be a public endpoint that doesn't require authentication
      // For now, we'll simulate the project data
      setTimeout(() => {
        setProject({
          id: projectId,
          title: 'Kitchen Renovation Project',
          description: 'Complete kitchen renovation including cabinets, countertops, and appliances. Looking for experienced contractors to help with this exciting project.',
          project_type: 'renovation',
          status: 'open',
          priority: 'high',
          budget_range: {
            min: 15000,
            max: 25000
          },
          timeline: {
            start_date: '2025-08-01',
            end_date: '2025-08-31',
            estimated_duration: 30
          },
          location: {
            city: 'Anytown',
            state: 'CA',
            address_line1: '123 Main Street'
          },
          client: {
            name: 'John Doe',
            company: 'Doe Construction'
          },
          requires_permit: true,
          emergency_project: false
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      open: 'bg-blue-100 text-blue-800',
      assigned: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-orange-100 text-orange-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    }
    return colors[priority] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The project invitation link may be invalid or expired.
              </p>
              <Button asChild>
                <Link to="/login">
                  Go to SecureShare
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">SecureShare</span>
          </div>
          
          <div className="ml-auto">
            <Button asChild variant="outline">
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Invitation Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">You're Invited to Collaborate!</h1>
            <p className="text-xl text-muted-foreground">
              {project?.client?.name} has invited you to join their construction project
            </p>
          </div>

          {/* Project Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{project?.title}</CardTitle>
                  <CardDescription className="text-base">
                    {project?.description}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(project?.status)}>
                    {project?.status?.replace('_', ' ')}
                  </Badge>
                  <Badge className={getPriorityColor(project?.priority)}>
                    {project?.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center text-sm font-medium text-muted-foreground">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Budget Range
                  </div>
                  <div className="text-lg font-semibold">
                    ${project?.budget_range?.min?.toLocaleString()} - ${project?.budget_range?.max?.toLocaleString()}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm font-medium text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    Timeline
                  </div>
                  <div className="text-lg font-semibold">
                    {project?.timeline?.estimated_duration} days
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm font-medium text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    Location
                  </div>
                  <div className="text-lg font-semibold">
                    {project?.location?.city}, {project?.location?.state}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm font-medium text-muted-foreground">
                    <FileText className="mr-2 h-4 w-4" />
                    Project Type
                  </div>
                  <div className="text-lg font-semibold capitalize">
                    {project?.project_type?.replace('_', ' ')}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Project Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project?.requires_permit && (
                    <Alert>
                      <AlertDescription>
                        This project requires building permits
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {project?.emergency_project && (
                    <Alert>
                      <AlertDescription>
                        This is marked as an emergency project
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              {/* Client Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Project Owner</h3>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold">{project?.client?.name}</div>
                    {project?.client?.company && (
                      <div className="text-muted-foreground">{project.client.company}</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
                <p className="text-muted-foreground">
                  Join SecureShare to collaborate on this project, share files securely, and communicate with the team.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/register">
                      Create Account & Join Project
                    </Link>
                  </Button>
                  
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/login">
                      Sign In to Existing Account
                    </Link>
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Already have an account? Sign in to access this project immediately.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto" />
                  <h4 className="font-semibold">Secure File Sharing</h4>
                  <p className="text-sm text-muted-foreground">
                    End-to-end encrypted file uploads and sharing
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <Users className="h-8 w-8 text-blue-600 mx-auto" />
                  <h4 className="font-semibold">Team Collaboration</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time communication and project updates
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto" />
                  <h4 className="font-semibold">Project Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Track progress and manage timelines
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="text-center text-sm text-muted-foreground">
            © 2025 SecureShare. All rights reserved. | Secure file sharing for construction projects.
          </div>
        </div>
      </footer>
    </div>
  )
}

