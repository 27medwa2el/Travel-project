import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { UserNav } from './user-nav';
import { ThemeSelector } from '../theme-selector';
import { ModeToggle } from './ThemeToggle/theme-toggle';
import CtaGithub from './cta-github';

export default function Header() {
  return (
    <header className='flex h-20 shrink-0 items-center justify-between gap-2 transition-all px-6'>
      <div className='flex items-center gap-4'>
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          <SidebarTrigger className='text-gray-400 hover:text-gray-900 transition-colors' />
        </div>
        <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block" />
        <div className="hidden sm:block">
          <Breadcrumbs />
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <div className='hidden lg:flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm'>
          <SearchInput />
        </div>
        <div className="h-10 w-px bg-gray-200 mx-2 hidden sm:block" />
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
