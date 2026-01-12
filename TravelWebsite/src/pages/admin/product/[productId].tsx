import AdminLayout from '../_layout';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import FormCardSkeleton from '@/components/admin/form-card-skeleton';
import PageContainer from '@/components/admin/layout/page-container';
import { Suspense } from 'react';
import ProductViewPage from '@/features/products/components/product-view-page';
import { useRouter } from 'next/router';

export default function ProductView() {
  const router = useRouter();
  const { productId } = router.query;

  return (
    <AdminLayout>
      <PageContainer scrollable>
        <div className='flex-1 space-y-4'>
          <Suspense fallback={<FormCardSkeleton />}>
            {productId && (
              <ProductViewPage productId={productId as string} />
            )}
          </Suspense>
        </div>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
