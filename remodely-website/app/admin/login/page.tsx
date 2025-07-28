'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, User } from 'lucide-react'

export default function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const response = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            })

            const data = await response.json()

            if (response.ok) {
                // Set session storage for the AuthWrapper
                sessionStorage.setItem('admin-logged-in', 'true')
                router.push('/admin')
            } else {
                setError(data.message || 'Invalid credentials')
            }
        } catch (error) {
            console.error('Login error:', error)
            setError('Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div 
            className="min-h-screen bg-white flex items-center justify-center px-4"
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem'
            }}
        >
            <div 
                className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-md shadow-xl"
                style={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '1rem',
                    padding: '2rem',
                    width: '100%',
                    maxWidth: '28rem',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
            >
                <div className="text-center mb-8">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Portal</h1>
                    <p className="text-gray-600">RemodelyAz Management System</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-10 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter username"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-10 py-3 pr-12 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        Authorized personnel only
                    </p>
                </div>
            </div>
        </div>
    )
}
