import { initializeApp } from '@/lib/app-initializer'

// Initialize app on server startup
let initialized = false

export default function AppInitializer() {
  if (!initialized) {
    try {
      initializeApp()
      initialized = true
      console.log('App initialized successfully')
    } catch (error) {
      console.error('App initialization failed:', error)
      // Don't throw error to prevent site crash
    }
  }
  
  return null // This is a server-only component
}
