import { NavItem } from '@/types';

/**
 * Navigation configuration with RBAC support
 *
 * This configuration is used for both the sidebar navigation and Cmd+K bar.
 *
 * RBAC Access Control:
 * Each navigation item can have an `access` property that controls visibility
 * based on permissions, plans, features, roles, and organization context.
 *
 * Examples:
 *
 * 1. Require organization:
 *    access: { requireOrg: true }
 *
 * 2. Require specific permission:
 *    access: { requireOrg: true, permission: 'org:teams:manage' }
 *
 * 3. Require specific plan:
 *    access: { plan: 'pro' }
 *
 * 4. Require specific feature:
 *    access: { feature: 'premium_access' }
 *
 * 5. Require specific role:
 *    access: { role: 'admin' }
 *
 * 6. Multiple conditions (all must be true):
 *    access: { requireOrg: true, permission: 'org:teams:manage', plan: 'pro' }
 *
 * Note: The `visible` function is deprecated but still supported for backward compatibility.
 * Use the `access` property for new items.
 */
export const navItems: NavItem[] = [
  {
    title: 'Overview',
    url: '/admin/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['o', 'o'],
    items: []
  },
  {
    title: 'Travel Data',
    url: '#',
    icon: 'globe',
    isActive: true,
    items: [
      {
        title: 'Countries',
        url: '/admin/countries',
        icon: 'globe'
      },
      {
        title: 'Cities',
        url: '/admin/cities',
        icon: 'building'
      },
      {
        title: 'Activities',
        url: '/admin/activities',
        icon: 'activity'
      },
      {
        title: 'Drivers',
        url: '/admin/drivers',
        icon: 'car'
      }
    ]
  },
  {
    title: 'Customer Bookings',
    url: '/admin/bookings',
    icon: 'ticket',
    isActive: false,
    shortcut: ['b', 'b'],
    items: []
  },
  {
    title: 'Account',
    url: '#',
    icon: 'account',
    isActive: true,
    items: [
      {
        title: 'Profile',
        url: '/admin/profile',
        icon: 'profile',
        shortcut: ['p', 'p']
      },
      {
        title: 'Billing',
        url: '/admin/billing',
        icon: 'billing',
        shortcut: ['b', 'l']
      }
    ]
  }
];
