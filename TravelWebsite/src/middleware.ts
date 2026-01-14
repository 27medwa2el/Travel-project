import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/search(.*)',
  '/details(.*)',
  '/favorites(.*)',
  '/bookings(.*)',
  '/success(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/signin(.*)',
  '/api/public(.*)',
  '/admin/sign-in(.*)',
  '/admin/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
