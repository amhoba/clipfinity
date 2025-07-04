import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/auth(.*)', '/api/health'])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
}, {
  signInUrl: "https://80-cs-193857718008-default.cs-europe-west4-pear.cloudshell.dev/auth",
  signUpUrl: "https://80-cs-193857718008-default.cs-europe-west4-pear.cloudshell.dev/auth",
  afterSignInUrl: "https://80-cs-193857718008-default.cs-europe-west4-pear.cloudshell.dev/",
  afterSignUpUrl: "https://80-cs-193857718008-default.cs-europe-west4-pear.cloudshell.dev/",
  domain: "80-cs-193857718008-default.cs-europe-west4-pear.cloudshell.dev",
  proxyUrl: "https://80-cs-193857718008-default.cs-europe-west4-pear.cloudshell.dev/"
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};