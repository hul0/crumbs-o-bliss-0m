
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
// @ts-ignore
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect Admin Routes
  // Check if the path includes /admin (handling locale prefix)
  const pathname = request.nextUrl.pathname
  const isAdminRoute = pathname.includes('/admin') || pathname.match(/^\/(en|bn)\/admin/)

  if (isAdminRoute && !user) {
    // Ensure we redirect to the correct locale login page
    // Just standard redirect for now, next-intl might handle it if we used Link, but here we are in middleware.
    // extract locale
    const localeMatch = pathname.match(/^\/(en|bn)/)
    const locale = localeMatch ? localeMatch[1] : 'en'

    const url = request.nextUrl.clone()
    url.pathname = `/${locale}/login`
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}