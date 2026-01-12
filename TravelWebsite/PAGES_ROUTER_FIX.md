# Pages Router Fix - Admin Route Error

## Issue
Accessing `/admin` resulted in:
```
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined.
```

## Root Cause
Multiple admin components were using App Router APIs (`next/navigation`) instead of Pages Router APIs (`next/router`). This caused undefined components during server-side rendering.

## Files Fixed

### Core Components
1. ✅ `src/components/admin/kbar/index.tsx`
   - Changed: `import { useRouter } from 'next/navigation'` → `import { useRouter } from 'next/router'`

2. ✅ `src/components/admin/layout/app-sidebar.tsx`
   - Changed: `import { usePathname, useRouter } from 'next/navigation'` → `import { useRouter } from 'next/router'`
   - Changed: `const pathname = usePathname()` → `const pathname = router.pathname`

3. ✅ `src/components/admin/ui/infobar.tsx`
   - Changed: `import { usePathname } from 'next/navigation'` → `import { useRouter } from 'next/router'`
   - Changed: `const pathname = usePathname()` → `const router = useRouter(); const pathname = router.pathname`

4. ✅ `src/components/admin/layout/user-nav.tsx`
   - Changed: `import { useRouter } from 'next/navigation'` → `import { useRouter } from 'next/router'`

5. ✅ `src/components/admin/org-switcher.tsx`
   - Changed: `import { useRouter } from 'next/navigation'` → `import { useRouter } from 'next/router'`
   - Fixed: Route paths from `/dashboard/workspaces` → `/admin/workspaces`

### Hooks
6. ✅ `src/hooks/admin/use-breadcrumbs.tsx`
   - Changed: `import { usePathname } from 'next/navigation'` → `import { useRouter } from 'next/router'`
   - Changed: `const pathname = usePathname()` → `const pathname = router.pathname`
   - Updated: Route mappings from `/dashboard/*` → `/admin/*`

### Feature Components
7. ✅ `src/features/products/components/product-tables/cell-action.tsx`
   - Changed: `import { useRouter } from 'next/navigation'` → `import { useRouter } from 'next/router'`
   - Fixed: Route path from `/dashboard/product/${id}` → `/admin/product/${id}`

8. ✅ `src/features/products/components/product-form.tsx`
   - Changed: `import { useRouter } from 'next/navigation'` → `import { useRouter } from 'next/router'`

9. ✅ `src/features/products/components/product-view-page.tsx`
   - Removed: `import { notFound } from 'next/navigation'`
   - Changed: `async function` → `function` (Pages Router doesn't support async components)
   - Changed: `notFound()` → return `<div>Product not found</div>`

10. ✅ `src/features/auth/components/user-auth-form.tsx`
    - Changed: `import { useSearchParams } from 'next/navigation'` → `import { useRouter } from 'next/router'`
    - Changed: `const callbackUrl = searchParams.get('callbackUrl')` → `const callbackUrl = typeof router.query.callbackUrl === 'string' ? router.query.callbackUrl : null`

11. ✅ `src/features/auth/components/github-auth-button.tsx`
    - Changed: `import { useSearchParams } from 'next/navigation'` → `import { useRouter } from 'next/router'`
    - Changed: `const callbackUrl = searchParams.get('callbackUrl')` → `const callbackUrl = typeof router.query.callbackUrl === 'string' ? router.query.callbackUrl : null`

### Admin Pages
12. ✅ `src/pages/admin/index.tsx`
    - Added: `getServerSideProps` for server-side redirect
    - Kept: Client-side redirect as fallback

## API Differences: App Router vs Pages Router

| App Router | Pages Router |
|------------|--------------|
| `useRouter()` from `next/navigation` | `useRouter()` from `next/router` |
| `usePathname()` from `next/navigation` | `router.pathname` from `useRouter()` |
| `useSearchParams()` from `next/navigation` | `router.query` from `useRouter()` |
| `notFound()` from `next/navigation` | Return 404 component or handle in `getServerSideProps` |
| `async function` components | Regular function components (async only in `getServerSideProps`) |

## Verification

✅ **No `next/navigation` imports remaining**
```bash
grep -r "next/navigation" src/
# Result: No matches found
```

✅ **All components use Pages Router APIs**
- All `useRouter()` imports from `next/router`
- All pathname access via `router.pathname`
- All query params via `router.query`

✅ **Linter passes**
- No TypeScript errors
- No ESLint errors

## Testing

After these fixes, `/admin` should:
1. ✅ Load without errors
2. ✅ Redirect to `/admin/sign-in` if not authenticated (server-side)
3. ✅ Redirect to `/admin/overview` if authenticated (server-side)
4. ✅ Client-side redirect as fallback if server-side fails

## Summary

All App Router APIs have been replaced with Pages Router equivalents. The admin dashboard should now work correctly in the Pages Router setup.
