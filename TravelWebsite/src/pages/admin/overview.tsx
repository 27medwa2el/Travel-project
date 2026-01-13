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

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
            <Card className='bg-white rounded-[32px] shadow-xl shadow-black/[0.02] border-gray-100 overflow-hidden group hover:scale-[1.02] transition-transform duration-500'>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Revenue</CardDescription>
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                  <IconTrendingUp className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardHeader className="pt-0 pb-8">
                <CardTitle className='text-4xl font-black tracking-tighter text-gray-900'>
                  ${stats.revenue.toLocaleString()}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    From {stats.bookingsCount} confirmed bookings
                  </p>
                </div>
              </CardHeader>
            </Card>

            <Card className='bg-white rounded-[32px] shadow-xl shadow-black/[0.02] border-gray-100 overflow-hidden group hover:scale-[1.02] transition-transform duration-500'>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Global Locations</CardDescription>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <IconGlobe className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardHeader className="pt-0 pb-8">
                <CardTitle className='text-4xl font-black tracking-tighter text-gray-900'>
                  {stats.countriesCount} Countries
                </CardTitle>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                  Across {stats.citiesCount} different cities
                </p>
              </CardHeader>
            </Card>

            <Card className='bg-white rounded-[32px] shadow-xl shadow-black/[0.02] border-gray-100 overflow-hidden group hover:scale-[1.02] transition-transform duration-500'>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Active Activities</CardDescription>
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                  <IconActivity className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardHeader className="pt-0 pb-8">
                <CardTitle className='text-4xl font-black tracking-tighter text-gray-900'>
                  {stats.activitiesCount} Places
                </CardTitle>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                  Curated local experiences
                </p>
              </CardHeader>
            </Card>

            <Card className='bg-white rounded-[32px] shadow-xl shadow-black/[0.02] border-gray-100 overflow-hidden group hover:scale-[1.02] transition-transform duration-500'>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Professional Drivers</CardDescription>
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                  <IconCar className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardHeader className="pt-0 pb-8">
                <CardTitle className='text-4xl font-black tracking-tighter text-gray-900'>
                  {stats.driversCount} Drivers
                </CardTitle>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
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
