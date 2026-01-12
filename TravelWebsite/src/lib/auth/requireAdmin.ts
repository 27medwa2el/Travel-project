import { GetServerSidePropsContext } from "next";
import { getAuth } from "@clerk/nextjs/server";

/**
 * Server-side helper to protect admin routes
 * Redirects to sign-in if not authenticated
 * Usage: export const getServerSideProps = requireAdmin;
 */
export async function requireAdmin(context: GetServerSidePropsContext) {
  const { userId } = getAuth(context.req);

  if (!userId) {
    return {
      redirect: {
        destination: "/admin/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
