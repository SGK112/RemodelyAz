import AdminNavigation from '@/components/AdminNavigation'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavigation />
            <main>{children}</main>
        </div>
    )
}
