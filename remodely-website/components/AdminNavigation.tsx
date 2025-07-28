import Link from 'next/link'

const AdminNavigation = () => {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/admin" className="text-xl font-bold text-gray-900">
              RemodelyAz Admin
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link
              href="/admin"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/gallery"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Gallery Manager
            </Link>
            <Link
              href="/"
              className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              View Site
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavigation
