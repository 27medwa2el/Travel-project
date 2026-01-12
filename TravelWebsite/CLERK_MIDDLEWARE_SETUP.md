# Clerk Middleware Setup for Pages Router

## Issue
Error: `Clerk: getAuth() was called but Clerk can't detect usage of clerkMiddleware()`

## Solution
Created `src/middleware.ts` with Clerk middleware configuration.

## Why Middleware is Required

In Pages Router, Clerk requires middleware to be present for `getAuth()` to work in `getServerSideProps`. The middleware doesn't need to protect routes directly - that's handled in `getServerSideProps` using the `requireAdmin` helper.

## Middleware Configuration

**File**: `src/middleware.ts`

```typescript
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

## How It Works

1. **Middleware**: Makes Clerk authentication context available to all routes
2. **getServerSideProps**: Uses `getAuth(context.req)` to check authentication
3. **requireAdmin helper**: Handles redirects for unauthenticated users

## Route Protection Strategy

- **Middleware**: Provides Clerk context (required for `getAuth()`)
- **getServerSideProps**: Checks authentication and redirects if needed
- **Client-side**: Uses `useAuth()` hook for UI state

## Testing

After adding middleware:
1. ✅ `getAuth()` works in `getServerSideProps`
2. ✅ Admin routes redirect to sign-in if not authenticated
3. ✅ Authenticated users can access admin routes
4. ✅ Travel routes remain public (no middleware protection)

## Notes

- Middleware must be in `src/middleware.ts` (or root if no src directory)
- The middleware matcher ensures it runs on all routes except static files
- Route protection logic is in `getServerSideProps`, not middleware
- This approach gives more control over redirects and error handling
