'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Shield, LogOut } from 'lucide-react'

interface AuthWrapperProps {
    children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        checkAuthentication()
    }, [])

    const checkAuthentication = async () => {
        try {
            // Check session storage first
            const sessionAuth = sessionStorage.getItem('admin_authenticated')
            const sessionToken = sessionStorage.getItem('admin_token')

            if (sessionAuth === 'true' && sessionToken) {
                setIsAuthenticated(true)
            } else {
                router.push('/admin/login')
            }
        } catch (error) {
            console.error('Auth check failed:', error)
            router.push('/admin/login')
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/auth', { method: 'DELETE' })
            sessionStorage.removeItem('admin_authenticated')
            sessionStorage.removeItem('admin_token')
            router.push('/admin/login')
        } catch (error) {
            console.error('Logout failed:', error)
            // Force logout anyway
            sessionStorage.clear()
            router.push('/admin/login')
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="inline-block"
                    >
                        <Shield className="w-8 h-8 text-blue-300 mb-4" />
                    </motion.div>
                    <p className="text-white">Verifying authentication...</p>
                </motion.div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null // Router will redirect to login
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 pt-20">
            {/* Main Content - Admin will handle its own layout */}
            <div className="px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    )
}
