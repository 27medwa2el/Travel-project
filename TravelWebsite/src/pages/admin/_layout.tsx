import KBar from '@/components/admin/kbar';
import AppSidebar from '@/components/admin/layout/app-sidebar';
import Header from '@/components/admin/layout/header';
import { InfoSidebar } from '@/components/admin/layout/info-sidebar';
import { InfobarProvider } from '@/components/admin/ui/infobar';
import { SidebarInset, SidebarProvider } from '@/components/admin/ui/sidebar';
import { useEffect } from 'react';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Remove Clerk's auto-mounted user button
    const removeClerkButton = () => {
      const clerkButtons = document.querySelectorAll('[data-clerk-user-button], .cl-userButton, .cl-userButtonBox, div[style*="position: fixed"][style*="z-index: 999"]');
      clerkButtons.forEach(btn => btn.remove());
    };

    removeClerkButton();
    const interval = setInterval(removeClerkButton, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <KBar>
      <SidebarProvider defaultOpen={false}>
        <InfobarProvider defaultOpen={false}>
          <div className="flex min-h-screen w-full bg-[#f8faff]">
            <AppSidebar />
            <SidebarInset className="bg-transparent border-none">
              <Header />
              <main className="flex-1 overflow-y-auto px-6 pb-10">
                {children}
              </main>
            </SidebarInset>
            <InfoSidebar side='right' />
          </div>
        </InfobarProvider>
      </SidebarProvider>
    </KBar>
  );
}
