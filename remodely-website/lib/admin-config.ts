// Admin Development Configuration
// This file contains settings specific to admin portal development

export const adminConfig = {
  // Development mode settings
  isDevelopment: process.env.ADMIN_DEVELOPMENT_MODE === 'true',
  debugMode: process.env.ADMIN_DEBUG === 'true',
  
  // Database settings for admin development
  useAdminDatabase: process.env.ADMIN_DEVELOPMENT_MODE === 'true',
  adminDatabasePrefix: 'admin_dev_',
  
  // API endpoints for admin development
  apiEndpoints: {
    images: process.env.ADMIN_DEVELOPMENT_MODE === 'true' ? '/api/admin/images' : '/api/images',
    upload: '/api/admin/images/upload',
    projects: '/api/admin/gallery-projects'
  },
  
  // UI settings for admin development
  ui: {
    showDebugInfo: process.env.ADMIN_DEBUG === 'true',
    enableDevTools: process.env.ADMIN_DEVELOPMENT_MODE === 'true',
    disableProductionWarnings: process.env.ADMIN_DEVELOPMENT_MODE === 'true'
  },
  
  // Performance settings
  performance: {
    enableHotReload: true,
    disableOptimizations: process.env.ADMIN_DEVELOPMENT_MODE === 'true',
    verboseLogging: process.env.ADMIN_DEBUG === 'true'
  }
}

export default adminConfig
