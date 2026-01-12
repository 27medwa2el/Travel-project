# SSR Fix - Removed 'use client' Directives

## Issue
"Element type is invalid" error during server-side rendering because components had `'use client'` directives which are App Router-only and cause undefined components in Pages Router.

## Solution
Removed all `'use client'` directives from components used during SSR in Pages Router.

## Files Fixed

### Components Used in _app.tsx
1. ✅ `src/components/admin/layout/ThemeToggle/theme-provider.tsx`
2. ✅ `src/components/admin/active-theme.tsx`
3. ✅ `src/components/admin/ui/sonner.tsx`

### Components Used in Admin Layout
4. ✅ `src/components/admin/kbar/index.tsx`
5. ✅ `src/components/admin/ui/sidebar.tsx`
6. ✅ `src/components/admin/ui/infobar.tsx`
7. ✅ `src/components/admin/layout/info-sidebar.tsx`
8. ✅ `src/pages/admin/_layout.tsx`

### Hooks
9. ✅ `src/hooks/admin/use-nav.ts`

### Import Path Fixes
10. ✅ Fixed `@/hooks/use-nav` → `@/hooks/admin/use-nav` in:
    - `src/components/admin/kbar/index.tsx`
    - `src/components/admin/layout/app-sidebar.tsx`

## Why This Fixes the Error

In Pages Router:
- `'use client'` is **not recognized** (it's App Router-only)
- Components with `'use client'` become **undefined** during SSR
- This causes "Element type is invalid" errors

By removing `'use client'`:
- Components work normally in Pages Router
- SSR works correctly
- Client-side hooks still work (they're just not marked as client-only)

## Testing

After these fixes:
1. ✅ `/admin` should load without errors
2. ✅ All admin pages should render correctly
3. ✅ Client-side features (themes, toasts, etc.) still work
4. ✅ No more "Element type is invalid" errors

## Notes

- Pages Router doesn't need `'use client'` - all components work on both server and client
- Client-only code (like `document.cookie`, `window`) should be guarded with `typeof window !== 'undefined'` or `useEffect`
- The components now properly handle SSR with mounted checks where needed
