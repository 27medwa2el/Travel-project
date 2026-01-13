import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/admin/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/admin/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/admin/ui/sidebar';
import { UserAvatarProfile } from '@/components/admin/user-avatar-profile';
import { navItems } from '@/config/nav-config';
import { useMediaQuery } from '@/hooks/admin/use-media-query';
import { useOrganization, useUser, useClerk } from '@clerk/nextjs';
import { useFilteredNavItems } from '@/hooks/admin/use-nav';
import {
  IconBell,
  IconChevronRight,
  IconChevronsDown,
  IconCreditCard,
  IconLogout,
  IconUserCircle
} from '@tabler/icons-react';
import { BriefcaseIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Icons } from '../icons';
import { OrgSwitcher } from '../org-switcher';
import { cn } from '@/lib/utils';

export default function AppSidebar() {
  const router = useRouter();
  const pathname = router.pathname;
  const { isOpen } = useMediaQuery();
  const { user } = useUser();
  const { organization } = useOrganization();
  const { signOut } = useClerk();
  const filteredItems = useFilteredNavItems(navItems);

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, [isOpen]);

  return (
    <Sidebar collapsible='icon' className="border-r border-gray-100 bg-white/80 backdrop-blur-xl">
      <SidebarHeader className="py-6 flex items-center justify-center group-data-[collapsible=icon]:px-0">
        <div className="flex items-center gap-3 px-4 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center w-full transition-all duration-300">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#9333ea] to-[#3b82f6] rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 text-white shrink-0">
            <BriefcaseIcon className="w-6 h-6" />
          </div>
          <div className="hidden group-data-[collapsible=icon]:hidden md:block overflow-hidden whitespace-nowrap">
            <span className="text-lg font-black text-gray-900 tracking-tighter uppercase">Admin</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden px-2 group-data-[collapsible=icon]:px-1'>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 px-4 group-data-[collapsible=icon]:hidden">Main Navigation</SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {filteredItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              
              if (!Icon) return null;
              
              const isActive = pathname === item.url || item.items?.some(sub => pathname === sub.url);

              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className='group/collapsible'
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={isActive}
                        className={cn(
                          "h-12 rounded-2xl transition-all duration-300 group-data-[collapsible=icon]:justify-center",
                          isActive ? "bg-purple-50 text-purple-600 font-black" : "text-gray-500 hover:bg-gray-50"
                        )}
                      >
                        <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-purple-600" : "text-gray-400")} />
                        <span className="uppercase tracking-widest text-[10px] font-black group-data-[collapsible=icon]:hidden">{item.title}</span>
                        <IconChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden' />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="ml-4 group-data-[collapsible=icon]:hidden border-l border-gray-100 gap-1 mt-1">
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.url}
                              className={cn(
                                "h-10 rounded-xl px-4 transition-all",
                                pathname === subItem.url ? "bg-white text-gray-900 shadow-sm border border-gray-100 font-black" : "text-gray-400 hover:text-gray-600"
                              )}
                            >
                              <Link href={subItem.url}>
                                <span className="uppercase tracking-widest text-[9px] font-black">{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={isActive}
                    className={cn(
                      "h-12 rounded-2xl transition-all duration-300 group-data-[collapsible=icon]:justify-center",
                      isActive ? "bg-purple-50 text-purple-600 font-black" : "text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    <Link href={item.url}>
                      <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-purple-600" : "text-gray-400")} />
                      <span className="uppercase tracking-widest text-[10px] font-black group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2 transition-all duration-300">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='h-16 rounded-[24px] border border-gray-100 bg-gray-50/50 hover:bg-gray-100 transition-all group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center'
                >
                  {user && (
                    <UserAvatarProfile
                      className='h-10 w-10 rounded-xl shadow-sm group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:rounded-lg'
                      showInfo={false} // Force showInfo off to handle collapsed state better
                      user={user}
                    />
                  )}
                  <IconChevronsDown className='ml-auto size-4 text-gray-400 group-data-[collapsible=icon]:hidden' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-[24px] p-2 shadow-2xl border-gray-100'
                side='right'
                align='end'
                sideOffset={12}
              >
                <DropdownMenuLabel className='p-2 font-normal'>
                  <div className='px-1 py-1.5'>
                    {user && (
                      <UserAvatarProfile
                        className='h-10 w-10 rounded-xl'
                        showInfo
                        user={user}
                      />
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-50" />

                <DropdownMenuGroup className="gap-1 flex flex-col p-1">
                  <DropdownMenuItem
                    onClick={() => router.push('/admin/profile')}
                    className="rounded-xl h-10 px-3 cursor-pointer"
                  >
                    <IconUserCircle className='mr-2 h-4 w-4 text-gray-400' />
                    <span className="text-[10px] font-black uppercase tracking-widest">Profile</span>
                  </DropdownMenuItem>
                  {organization && (
                    <DropdownMenuItem
                      onClick={() => router.push('/admin/billing')}
                      className="rounded-xl h-10 px-3 cursor-pointer"
                    >
                      <IconCreditCard className='mr-2 h-4 w-4 text-gray-400' />
                      <span className="text-[10px] font-black uppercase tracking-widest">Billing</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-gray-50" />
                <DropdownMenuItem
                  onClick={() => signOut(() => router.push('/admin/sign-in'))}
                  className="rounded-xl h-10 px-3 cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <IconLogout className='mr-2 h-4 w-4' />
                  <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
