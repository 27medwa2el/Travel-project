import { GetServerSidePropsContext } from 'next';
import { getAuth } from '@clerk/nextjs/server';

// This component doesn't need client-side code since we handle redirects in getServerSideProps
export default function AdminIndex() {
  // This will never render since getServerSideProps always redirects
  return null;
}

// Server-side redirect for better SEO and faster initial load
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { userId } = getAuth(context.req);

  if (!userId) {
    return {
      redirect: {
        destination: '/admin/sign-in',
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: '/admin/overview',
      permanent: false,
    },
  };
}
