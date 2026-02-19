
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, Package, LogOut } from 'lucide-react'

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${locale}/login`)
  }
  
  // Verify role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
    
  if (!profile || (profile.role !== 'admin' && profile.role !== 'manager')) {
      // If user is not admin/manager, redirect to home
      redirect(`/${locale}/`)
  }

  const isManager = profile.role === 'manager'

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex h-14 items-center gap-2 border-b px-4 lg:h-[60px] lg:px-6">
          <Link href={`/${locale}/admin`} className="flex items-center gap-2 font-semibold">
            <span className="">CrumsOBliss Admin</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2 mt-4">
            <Link
              href={`/${locale}/admin`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            {!isManager && (
            <Link
              href={`/${locale}/admin/products`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <Package className="h-4 w-4" />
              Products
            </Link>
            )}
            <Link
              href={`/${locale}/admin/orders`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <ShoppingBag className="h-4 w-4" />
              Orders
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
            <form action="/auth/signout" method="post">
                <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted w-full">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </form>
        </div>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            {/* Mobile Menu trigger could go here */}
            <div className="ml-auto">
                <span className="text-sm text-muted-foreground">Logged in as {profile.role}</span>
            </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  )
}
