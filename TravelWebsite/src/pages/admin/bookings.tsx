import React from 'react';
import AdminLayout from './_layout';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import PageContainer from '@/components/admin/layout/page-container';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/admin/ui/table';
import { Badge } from '@/components/admin/ui/badge';
import { bookingStore, activityStore, driverStore } from '@/lib/mockStore';
import { Booking } from '@/types/domain';
import { format } from 'date-fns';

export default function AdminBookingsPage({ initialBookings }: { initialBookings: any[] }) {
  return (
    <AdminLayout>
      <PageContainer scrollable={true}>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Customer Bookings</h2>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialBookings.length > 0 ? (
                  initialBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-mono text-xs">
                        {booking.id.toUpperCase()}
                      </TableCell>
                      <TableCell className="font-medium">{booking.userId.slice(0, 8)}...</TableCell>
                      <TableCell>
                        <Badge variant={booking.type === 'ACTIVITY' ? 'default' : 'secondary'}>
                          {booking.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{booking.details?.title || booking.details?.name || 'N/A'}</TableCell>
                      <TableCell>{booking.price} {booking.currency}</TableCell>
                      <TableCell>{format(new Date(booking.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 hover:bg-green-600">
                          {booking.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      No bookings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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
      initialBookings: JSON.parse(JSON.stringify(enrichedBookings))
    }
  };
};
