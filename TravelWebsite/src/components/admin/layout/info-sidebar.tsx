import * as React from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import {
  Infobar,
  InfobarContent,
  InfobarGroup,
  InfobarGroupContent,
  InfobarHeader,
  InfobarRail,
  InfobarTrigger,
  useInfobar
} from '@/components/admin/ui/infobar';

// Default/fallback data when no content is set
const defaultData = {
  title: 'Travel Admin Hub',
  sections: [
    {
      title: 'Platform Overview',
      description: 'Manage your global travel catalog including countries, cities, and local activities.',
      links: [
        {
          title: 'Managing Cities',
          url: '/admin/cities'
        },
        {
          title: 'Booking Reports',
          url: '/admin/bookings'
        }
      ]
    },
    {
      title: 'Platform Status',
      description: 'All global booking systems are currently operational.',
      links: []
    }
  ]
};

export function InfoSidebar({
  ...props
}: React.ComponentProps<typeof Infobar>) {
  const { content } = useInfobar();
  const data = content || defaultData;

  return (
    <Infobar {...props} className="border-l border-gray-100 bg-white/80 backdrop-blur-xl">
      <InfobarHeader className='flex flex-row items-center justify-between gap-2 border-b border-gray-50 px-6 py-6'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-lg font-black uppercase tracking-tighter text-gray-900'>
            {data.title}
          </h2>
        </div>
        <div className='shrink-0'>
          <InfobarTrigger className='-mr-1 text-gray-400 hover:text-gray-900 transition-colors' />
        </div>
      </InfobarHeader>
      <InfobarContent>
        <InfobarGroup>
          <InfobarGroupContent>
            <div className='flex flex-col gap-8 px-6 py-8'>
              {data.sections && data.sections.length > 0 ? (
                data.sections.map((section, index) => (
                  <div key={index} className='flex flex-col gap-4'>
                    {section.title && (
                      <h3 className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400'>
                        {section.title}
                      </h3>
                    )}
                    {section.description && (
                      <p className='text-gray-600 text-sm font-medium leading-relaxed'>
                        {section.description}
                      </p>
                    )}
                    {section.links && section.links.length > 0 && (
                      <div className='flex flex-col gap-3 mt-2'>
                        {section.links.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            href={link.url}
                            className='group flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-purple-50 transition-all border border-transparent hover:border-purple-100'
                          >
                            <span className="text-xs font-black uppercase tracking-widest text-gray-900 group-hover:text-purple-600">{link.title}</span>
                            <IconChevronRight className='h-4 w-4 text-gray-300 group-hover:text-purple-400 transition-transform group-hover:translate-x-1' />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className='text-gray-400 px-2 py-4 text-center text-xs font-bold uppercase tracking-widest'>
                  No alerts at this time
                </div>
              )}
            </div>
          </InfobarGroupContent>
        </InfobarGroup>
      </InfobarContent>
      <InfobarRail />
    </Infobar>
  );
}
