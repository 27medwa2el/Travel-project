import AdminLayout from '../_layout';
import ProfileViewPage from '@/features/profile/components/profile-view-page';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export default function ProfilePage() {
  return (
    <AdminLayout>
      <ProfileViewPage />
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
