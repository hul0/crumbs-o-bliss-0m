import createMiddleware from "next-intl/middleware"
import type { NextRequest } from "next/server"

const handleI18nRouting = createMiddleware({
  locales: ["en", "bn"],
  defaultLocale: "en",
})

export function proxy(request: NextRequest) {
  return handleI18nRouting(request)
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
