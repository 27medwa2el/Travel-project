
import AdminLayout from './_layout';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import PageContainer from '@/components/admin/layout/page-container';
import { OrganizationList } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import { workspacesInfoContent } from '@/config/infoconfig';

export default function WorkspacesPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <AdminLayout>
      <PageContainer
        pageTitle='Workspaces'
        pageDescription='Manage your workspaces and switch between them'
        infoContent={workspacesInfoContent}
      >
        <OrganizationList
          appearance={{
            baseTheme: isDark ? dark : undefined,
            elements: {
              organizationListBox: 'space-y-2',
              organizationPreview: 'rounded-lg border p-4 hover:bg-accent',
              organizationPreviewMainIdentifier: 'text-lg font-semibold',
              organizationPreviewSecondaryIdentifier:
                'text-sm text-muted-foreground'
            }
          }}
          afterSelectOrganizationUrl='/admin/workspaces/team'
          afterCreateOrganizationUrl='/admin/workspaces/team'
        />
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
