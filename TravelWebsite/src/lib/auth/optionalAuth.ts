import { GetServerSidePropsContext } from "next";
import { getAuth } from "@clerk/nextjs/server";

/**
 * Helper to optionally get user info for travel routes
 * Returns user email if authenticated, null otherwise
 * Usage: const { userEmail } = await optionalAuth(context);
 */
export async function optionalAuth(context: GetServerSidePropsContext) {
  const { userId } = getAuth(context.req);
  
  // For now, return null since travel routes are public
  // In the future, you can get user email from Clerk:
  // const clerkUser = await clerkClient.users.getUser(userId);
  // return { userEmail: clerkUser.emailAddresses[0]?.emailAddress || null };
  
  return { userEmail: null };
}
