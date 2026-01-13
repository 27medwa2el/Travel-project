import AdminLayout from './_layout';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import PageContainer from '@/components/admin/layout/page-container';
import { Badge } from '@/components/admin/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/admin/ui/card';
import { IconTrendingUp, IconUsers, IconGlobe, IconActivity, IconCar, IconTicket } from '@tabler/icons-react';
import { RecentSales } from '@/features/overview/components/recent-sales';
import { BarGraph } from '@/features/overview/components/bar-graph';
import { PieGraph } from '@/features/overview/components/pie-graph';
import { AreaGraph } from '@/features/overview/components/area-graph';
import { countryStore, cityStore, activityStore, driverStore, bookingStore } from '@/lib/mockStore';

export default function OverviewPage({ stats, recentBookings }: { stats: any, recentBookings: any[] }) {
  return (
    <AdminLayout>
      <PageContainer scrollable={true}>
        <div className='flex flex-1 flex-col space-y-4'>
          <div className='flex items-center justify-between space-y-2'>
            <h2 className='text-3xl font-bold tracking-tight'>
              Admin Overview 👋
            </h2>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card className='bg-white shadow-sm border-gray-100'>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardDescription className="text-sm font-medium">Total Revenue</CardDescription>
                <IconTrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardHeader className="pt-0">
                <CardTitle className='text-2xl font-black'>
                  ${stats.revenue.toLocaleString()}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  From {stats.bookingsCount} confirmed bookings
                </p>
              </CardHeader>
            </Card>

            <Card className='bg-white shadow-sm border-gray-100'>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardDescription className="text-sm font-medium">Global Locations</CardDescription>
                <IconGlobe className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardHeader className="pt-0">
                <CardTitle className='text-2xl font-black'>
                  {stats.countriesCount} Countries
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Across {stats.citiesCount} different cities
                </p>
              </CardHeader>
            </Card>

            <Card className='bg-white shadow-sm border-gray-100'>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardDescription className="text-sm font-medium">Active Activities</CardDescription>
                <IconActivity className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardHeader className="pt-0">
                <CardTitle className='text-2xl font-black'>
                  {stats.activitiesCount} Places
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Curated local experiences
                </p>
              </CardHeader>
            </Card>

            <Card className='bg-white shadow-sm border-gray-100'>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardDescription className="text-sm font-medium">Professional Drivers</CardDescription>
                <IconCar className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardHeader className="pt-0">
                <CardTitle className='text-2xl font-black'>
                  {stats.driversCount} Drivers
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Available for private tours
                </p>
              </CardHeader>
            </Card>
          </div>
          
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <div className='col-span-4'>
              <BarGraph />
            </div>
            <div className='col-span-4 md:col-span-3'>
              <RecentSales bookings={recentBookings} />
            </div>
          </div>
        </div>
      </PageContainer>
    </AdminLayout>
  );
}

export const getServerSideProps = async (context: any) => {
  const adminCheck = await requireAdmin(context);
  if ('redirect' in adminCheck) return adminCheck;

  const bookings = bookingStore.getAll();
  const revenue = bookings.reduce((sum, b) => sum + b.price, 0);

  const enrichedBookings = bookings.map(b => {
    let details = null;
    if (b.type === 'ACTIVITY') {
      details = activityStore.getById(b.referenceId);
    } else if (b.type === 'DRIVER') {
      details = driverStore.getById(b.referenceId);
    }
    return { ...b, details };
  });

  return {
    props: {
      stats: {
        revenue,
        bookingsCount: bookings.length,
        countriesCount: countryStore.getAll().length,
        citiesCount: cityStore.getAll().length,
        activitiesCount: activityStore.getAll().length,
        driversCount: driverStore.getAll().length,
      },
      recentBookings: JSON.parse(JSON.stringify(enrichedBookings))
    }
  };
};
