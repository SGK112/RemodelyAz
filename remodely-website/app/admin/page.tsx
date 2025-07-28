'use client'

import React from 'react'
import AuthWrapper from '../../components/AuthWrapper'
import AdminPanel from '../../components/AdminPanel'
import ErrorBoundary from '../../components/ErrorBoundary'
import HealthCheck from '../../components/HealthCheck'

const AdminPage = () => {
  return (
    <ErrorBoundary>
      <AuthWrapper>
        <HealthCheck>
          <AdminPanel />
        </HealthCheck>
      </AuthWrapper>
    </ErrorBoundary>
  )
}

export default AdminPage
