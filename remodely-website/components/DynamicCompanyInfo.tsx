'use client'

import { useEffect, useState } from 'react'

interface CompanyData {
  name: string
  address: string
  phone: string
  email: string
  license: string
  description: string
  founded: string
  employees: string
  projectsCompleted: string
}

export default function DynamicCompanyInfo() {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch('/api/admin/company')
        if (response.ok) {
          const data = await response.json()
          setCompanyData(data)
        }
      } catch (error) {
        console.error('Failed to fetch company data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyData()
  }, [])

  if (loading) {
    return <div className="animate-pulse">Loading company information...</div>
  }

  if (!companyData) {
    return <div>Unable to load company information</div>
  }

  return (
    <div className="company-info">
      <h1 className="text-2xl font-bold text-gray-900">{companyData.name}</h1>
      <p className="text-gray-600 mt-2">{companyData.description}</p>
      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <div><strong>Address:</strong> {companyData.address}</div>
        <div><strong>Phone:</strong> {companyData.phone}</div>
        <div><strong>Email:</strong> {companyData.email}</div>
        <div><strong>License:</strong> {companyData.license}</div>
        <div><strong>Founded:</strong> {companyData.founded}</div>
        <div><strong>Team Size:</strong> {companyData.employees}</div>
        <div><strong>Projects Completed:</strong> {companyData.projectsCompleted}</div>
      </div>
    </div>
  )
}
