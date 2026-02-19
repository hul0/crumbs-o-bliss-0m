
'use client'

import { usePathname } from 'next/navigation'
import Navbar from './navbar'
import Footer from './footer'

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Hide Navbar/Footer if path contains /admin or /login
  // Note: pathname includes locale e.g. /en/admin/...
  const isAdminOrAuth = pathname.includes('/admin') || pathname.includes('/login')

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminOrAuth && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdminOrAuth && <Footer />}
    </div>
  )
}
