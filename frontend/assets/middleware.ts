import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const DOMAIN_URL = process.env.DOMAIN_URL || ""

const isPublicRoute = createRouteMatcher(['/auth(.*)', '/api/health'])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
}, {
  signInUrl: `https://${DOMAIN_URL}/auth`,
  signUpUrl: `https://${DOMAIN_URL}/auth`,
  afterSignInUrl: `https://${DOMAIN_URL}/`,
  afterSignUpUrl: `https://${DOMAIN_URL}/`,
  domain: DOMAIN_URL,
  proxyUrl: `https://${DOMAIN_URL}/`
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};