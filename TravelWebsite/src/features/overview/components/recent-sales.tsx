import { Avatar, AvatarFallback, AvatarImage } from '@/components/admin/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/admin/ui/card';

export function RecentSales({ bookings = [] }: { bookings?: any[] }) {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardDescription>
          {bookings.length > 0 
            ? `You have ${bookings.length} total bookings.`
            : "No recent bookings found."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {bookings.slice(0, 5).map((booking, index) => (
            <div key={booking.id || index} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.userId}`} alt='Avatar' />
                <AvatarFallback>{booking.userId.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm leading-none font-black uppercase tracking-tighter'>
                  {booking.details?.title || booking.details?.name || 'Customer'}
                </p>
                <p className='text-muted-foreground text-xs font-bold uppercase tracking-widest'>
                  {booking.type} • {booking.status}
                </p>
              </div>
              <div className='ml-auto font-black text-blue-600'>+${booking.price}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
