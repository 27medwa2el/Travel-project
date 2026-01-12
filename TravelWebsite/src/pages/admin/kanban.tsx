
import AdminLayout from './_layout';
import KanbanViewPage from '@/features/kanban/components/kanban-view-page';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export default function KanbanPage() {
  return (
    <AdminLayout>
      <KanbanViewPage />
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
