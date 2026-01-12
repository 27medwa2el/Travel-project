
import AdminLayout from './_layout';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import PageContainer from '@/components/admin/layout/page-container';
import { buttonVariants } from '@/components/admin/ui/button';
import { DataTableSkeleton } from '@/components/admin/ui/table/data-table-skeleton';
import ProductListingPage from '@/features/products/components/product-listing';
import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { productInfoContent } from '@/config/infoconfig';

export default function ProductPage() {
  return (
    <AdminLayout>
      <PageContainer
        scrollable={false}
        pageTitle='Products'
        pageDescription='Manage products (Server side table functionalities.)'
        infoContent={productInfoContent}
        pageHeaderAction={
          <Link
            href='/admin/product/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <IconPlus className='mr-2 h-4 w-4' /> Add New
          </Link>
        }
      >
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <ProductListingPage />
        </Suspense>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;
