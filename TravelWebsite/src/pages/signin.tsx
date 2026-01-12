import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// Travel routes are now public, redirect to home
const SignIn = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Head>
        <title>Travel - Sign In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>Redirecting...</p>
    </div>
  );
};

export default SignIn;
