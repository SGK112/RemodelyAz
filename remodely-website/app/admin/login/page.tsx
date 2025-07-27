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
            className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 flex items-center justify-center px-4"
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(to bottom right, #93c5fd, #60a5fa, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem'
            }}
        >
            <div 
                className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-8 w-full max-w-md shadow-2xl"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    width: '100%',
                    maxWidth: '28rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
            >
                <div className="text-center mb-8">
                    <div className="bg-white/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-white/80">RemodelyAz Management System</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/30 border border-red-400/50 rounded-lg p-3 text-red-100 text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="username" className="block text-white text-sm font-medium mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white/20 border border-white/30 rounded-lg px-10 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                placeholder="Enter username"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/20 border border-white/30 rounded-lg px-10 py-3 pr-12 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                placeholder="Enter password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
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
                    <p className="text-white/70 text-sm">
                        Authorized personnel only
                    </p>
                </div>
            </div>
        </div>
    )
}
