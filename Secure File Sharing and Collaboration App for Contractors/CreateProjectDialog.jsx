import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Switch } from '@/components/ui/switch'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Copy, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'
import { useAuth } from '../App'
import LoadingSpinner from './LoadingSpinner'

export default function CreateProjectDialog({ open, onOpenChange, onProjectCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_type: '',
    priority: 'medium',
    budget_min: '',
    budget_max: '',
    estimated_duration: '',
    start_date: null,
    end_date: null,
    requires_permit: false,
    emergency_project: false,
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip_code: '',
    },
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)
  const [showCalendar, setShowCalendar] = useState({ start: false, end: false })
  
  const { apiCall } = useAuth()

  const projectTypes = [
    { value: 'renovation', label: 'Renovation' },
    { value: 'new_construction', label: 'New Construction' },
    { value: 'repair', label: 'Repair' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'landscaping', label: 'Landscaping' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'roofing', label: 'Roofing' },
    { value: 'flooring', label: 'Flooring' },
    { value: 'painting', label: 'Painting' },
    { value: 'other', label: 'Other' },
  ]

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        budget_min: formData.budget_min ? parseFloat(formData.budget_min) : null,
        budget_max: formData.budget_max ? parseFloat(formData.budget_max) : null,
        estimated_duration: formData.estimated_duration ? parseInt(formData.estimated_duration) : null,
        start_date: formData.start_date ? format(formData.start_date, 'yyyy-MM-dd') : null,
        end_date: formData.end_date ? format(formData.end_date, 'yyyy-MM-dd') : null,
      }

      const response = await apiCall('/projects', {
        method: 'POST',
        body: JSON.stringify(submitData),
      })

      setSuccess(response.data)
      onProjectCreated()
      
      // Reset form after a delay
      setTimeout(() => {
        resetForm()
        onOpenChange(false)
      }, 3000)
      
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      project_type: '',
      priority: 'medium',
      budget_min: '',
      budget_max: '',
      estimated_duration: '',
      start_date: null,
      end_date: null,
      requires_permit: false,
      emergency_project: false,
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip_code: '',
      },
    })
    setError('')
    setSuccess(null)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDateChange = (field, date) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }))
    setShowCalendar(prev => ({
      ...prev,
      [field === 'start_date' ? 'start' : 'end']: false
    }))
  }

  const copyShareLink = () => {
    if (success?.share_link) {
      navigator.clipboard.writeText(success.share_link)
    }
  }

  const openShareLink = () => {
    if (success?.share_link) {
      window.open(success.share_link, '_blank')
    }
  }

  if (success) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Project Created Successfully!</DialogTitle>
            <DialogDescription>
              Your project "{success.title}" has been created. You can now share it with contractors and clients.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Share Link</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={success.share_link}
                  readOnly
                  className="flex-1"
                />
                <Button size="sm" variant="outline" onClick={copyShareLink}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={openShareLink}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Alert>
              <AlertDescription>
                Share this link with contractors and clients to invite them to your project. 
                They can view project details and upload files securely.
              </AlertDescription>
            </Alert>
          </div>
          
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Create a new construction project to start collaborating with contractors and clients.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Kitchen Renovation"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the project scope and requirements..."
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project_type">Project Type *</Label>
                <Select 
                  value={formData.project_type} 
                  onValueChange={(value) => handleSelectChange('project_type', value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={(value) => handleSelectChange('priority', value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Budget and Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Budget & Timeline</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget_min">Min Budget ($)</Label>
                <Input
                  id="budget_min"
                  name="budget_min"
                  type="number"
                  placeholder="10000"
                  value={formData.budget_min}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget_max">Max Budget ($)</Label>
                <Input
                  id="budget_max"
                  name="budget_max"
                  type="number"
                  placeholder="25000"
                  value={formData.budget_max}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="estimated_duration">Duration (days)</Label>
                <Input
                  id="estimated_duration"
                  name="estimated_duration"
                  type="number"
                  placeholder="30"
                  value={formData.estimated_duration}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover open={showCalendar.start} onOpenChange={(open) => setShowCalendar(prev => ({ ...prev, start: open }))}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      disabled={loading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.start_date ? format(formData.start_date, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.start_date}
                      onSelect={(date) => handleDateChange('start_date', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover open={showCalendar.end} onOpenChange={(open) => setShowCalendar(prev => ({ ...prev, end: open }))}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      disabled={loading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.end_date ? format(formData.end_date, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.end_date}
                      onSelect={(date) => handleDateChange('end_date', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Location</h3>
            
            <div className="space-y-2">
              <Label htmlFor="address.line1">Address Line 1</Label>
              <Input
                id="address.line1"
                name="address.line1"
                placeholder="123 Main Street"
                value={formData.address.line1}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address.line2">Address Line 2</Label>
              <Input
                id="address.line2"
                name="address.line2"
                placeholder="Apt, Suite, etc."
                value={formData.address.line2}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.city">City</Label>
                <Input
                  id="address.city"
                  name="address.city"
                  placeholder="Anytown"
                  value={formData.address.city}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address.state">State</Label>
                <Input
                  id="address.state"
                  name="address.state"
                  placeholder="CA"
                  value={formData.address.state}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address.zip_code">ZIP Code</Label>
                <Input
                  id="address.zip_code"
                  name="address.zip_code"
                  placeholder="12345"
                  value={formData.address.zip_code}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Project Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Options</h3>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="requires_permit"
                checked={formData.requires_permit}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, requires_permit: checked }))}
                disabled={loading}
              />
              <Label htmlFor="requires_permit">Requires building permit</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="emergency_project"
                checked={formData.emergency_project}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, emergency_project: checked }))}
                disabled={loading}
              />
              <Label htmlFor="emergency_project">Emergency project</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Creating...
                </>
              ) : (
                'Create Project'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

