import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/admin/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/admin/ui/chart';

export const description = 'Monthly booking volume';

const chartData = [
  { month: 'Jan', bookings: 45 },
  { month: 'Feb', bookings: 52 },
  { month: 'Mar', bookings: 38 },
  { month: 'Apr', bookings: 65 },
  { month: 'May', bookings: 48 },
  { month: 'Jun', bookings: 72 },
  { month: 'Jul', bookings: 85 },
  { month: 'Aug', bookings: 92 },
  { month: 'Sep', bookings: 54 },
  { month: 'Oct', bookings: 42 },
  { month: 'Nov', bookings: 35 },
  { month: 'Dec', bookings: 60 }
];

const chartConfig = {
  bookings: {
    label: 'Bookings',
    color: 'var(--primary)'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Booking Volume</CardTitle>
        <CardDescription>
          Monthly performance for the current year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[300px] w-full'
        >
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 12,
              left: 12,
              bottom: 0
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
            />
            <ChartTooltip
              cursor={{ fill: 'var(--primary)', opacity: 0.1 }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey='bookings'
              fill='var(--primary)'
              radius={[6, 6, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
