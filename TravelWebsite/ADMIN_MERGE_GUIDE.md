# Admin Dashboard Merge Guide

This document outlines the changes made to merge the admin dashboard into the travel booking project.

## Summary

The admin dashboard from `AdminPanel` has been successfully merged into `TravelWebsite` under `/pages/admin`. The admin UI uses Pages Router (converted from App Router) and is fully integrated with the existing travel booking frontend.

## File Structure

### Admin Pages (Pages Router)
- `/pages/admin/index.tsx` - Redirects to overview or sign-in
- `/pages/admin/overview.tsx` - Main dashboard overview
- `/pages/admin/kanban.tsx` - Kanban board view
- `/pages/admin/product.tsx` - Product listing
- `/pages/admin/product/[productId].tsx` - Product detail view
- `/pages/admin/billing.tsx` - Billing & plans
- `/pages/admin/workspaces.tsx` - Workspace management
- `/pages/admin/exclusive.tsx` - Pro plan exclusive page
- `/pages/admin/profile/[[...profile]].tsx` - User profile
- `/pages/admin/sign-in/[[...sign-in]].tsx` - Sign in page
- `/pages/admin/sign-up/[[...sign-up]].tsx` - Sign up page
- `/pages/admin/_layout.tsx` - Admin layout wrapper

### Admin Components
- `/src/components/admin/ui/` - shadcn/ui components (58 components)
- `/src/components/admin/layout/` - Layout components (sidebar, header, etc.)
- `/src/components/admin/forms/` - Form components
- `/src/components/admin/kbar/` - Command palette components
- `/src/components/admin/modal/` - Modal components
- Other admin-specific components in `/src/components/admin/`

### Admin Features
- `/src/features/overview/` - Overview dashboard features
- `/src/features/kanban/` - Kanban board features
- `/src/features/products/` - Product management features
- `/src/features/auth/` - Authentication features
- `/src/features/profile/` - Profile features

### Admin Utilities
- `/src/lib/` - Utility functions (merged with existing)
- `/src/config/` - Configuration files
- `/src/constants/` - Constants and mock data
- `/src/hooks/admin/` - Admin-specific hooks
- `/src/types/admin/` - Admin TypeScript types

## Key Changes

### 1. Dependencies Merged
- All admin dependencies added to `package.json`
- Compatible versions selected (React 18, Next.js 13, Tailwind v3)
- Clerk authentication, shadcn/ui components, and other admin dependencies included

### 2. Tailwind Configuration
- Updated `tailwind.config.js` to support both admin and travel styles
- Added admin color variables and theme extensions
- Maintained compatibility with existing travel styles

### 3. TypeScript Configuration
- Added path aliases (`@/*` pointing to `./src/*`)
- Updated `tsconfig.json` to support admin imports

### 4. Global Styles
- Merged admin CSS variables into `globals.css`
- Added admin theme styles
- Maintained existing travel component styles

### 5. App Configuration
- Updated `_app.tsx` to conditionally load admin providers (Clerk, ThemeProvider) for admin routes
- Added NextTopLoader and Toaster for admin routes
- Preserved existing SessionProvider for travel routes

### 6. Next.js Configuration
- Added admin image domains to `next.config.js`
- Maintained existing travel image domains

### 7. Components Configuration
- Created `components.json` for shadcn/ui configuration
- Updated paths to match new structure

## Routing

### Admin Routes
- `/admin` - Redirects to overview or sign-in
- `/admin/overview` - Dashboard overview
- `/admin/kanban` - Kanban board
- `/admin/product` - Product listing
- `/admin/product/[productId]` - Product detail
- `/admin/billing` - Billing & plans
- `/admin/workspaces` - Workspace management
- `/admin/exclusive` - Pro plan exclusive
- `/admin/profile` - User profile
- `/admin/sign-in` - Sign in
- `/admin/sign-up` - Sign up

### Travel Routes (Unchanged)
- All existing travel routes remain unchanged
- `/`, `/search`, `/details`, `/bookings`, `/favorites`, `/signin`, `/success`

## Authentication

- **Travel routes**: Public (no authentication required, but prepared for optional Clerk protection)
- **Admin routes**: Use Clerk authentication (protected)
- Admin providers are conditionally loaded based on route pathname

## Testing

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add Clerk keys for admin authentication
   - Add Clerk keys for authentication
   - Keep existing Stripe keys for travel routes

3. Run development server:
   ```bash
   npm run dev
   ```

4. Test routes:
   - Travel routes: `http://localhost:3000/`
   - Admin routes: `http://localhost:3000/admin`

### Testing Admin Dashboard
1. Navigate to `/admin/sign-in`
2. Sign in with Clerk credentials
3. Test all admin pages:
   - Overview dashboard
   - Kanban board
   - Product management
   - Billing
   - Workspaces
   - Profile

## Known Issues & Notes

1. **Import Paths**: Most import paths have been automatically updated. If you encounter import errors, check that paths use `@/components/admin/` instead of `@/components/` for admin components.

2. **Parallel Routes**: The overview page's parallel routes (`@sales`, `@bar_stats`, etc.) have been converted to Suspense-wrapped components in a single page.

3. **Server Components**: Some admin components that were Server Components in App Router are now Client Components. This is expected for Pages Router.

4. **Clerk Setup**: Ensure Clerk is properly configured with environment variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

5. **Theme Provider**: Admin uses `next-themes` for dark mode. The theme provider is conditionally loaded for admin routes.

## Next Steps

1. **Install Dependencies**: Run `npm install` to install all merged dependencies
2. **Configure Clerk**: Set up Clerk authentication keys
3. **Test Routes**: Verify both travel and admin routes work correctly
4. **Customize**: Remove any demo pages or customize admin pages as needed
5. **Deploy**: Ensure all environment variables are set in production

## File Locations Reference

- Admin pages: `src/pages/admin/`
- Admin components: `src/components/admin/`
- Admin features: `src/features/`
- Admin config: `src/config/`
- Admin constants: `src/constants/`
- Admin hooks: `src/hooks/admin/`
- Admin types: `src/types/admin/`
- Admin lib: `src/lib/` (merged with existing)

## Support

If you encounter issues:
1. Check import paths match the new structure
2. Verify environment variables are set
3. Ensure all dependencies are installed
4. Check browser console for errors
5. Review Next.js build output for warnings
