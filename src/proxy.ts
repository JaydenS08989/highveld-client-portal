import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/documents/:path*',
    '/requests/:path*',
    '/invoices/:path*',
    '/messages/:path*',
    '/account/:path*',
    '/api/portal/:path*',
  ],
}
