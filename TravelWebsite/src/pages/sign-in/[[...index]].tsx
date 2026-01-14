import { SignIn } from "@clerk/nextjs";
import Head from "next/head";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8faff] pt-20">
      <Head>
        <title>Sign In - Travel</title>
      </Head>
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-purple-600 hover:bg-purple-700 text-sm font-black uppercase tracking-widest rounded-2xl h-12',
            card: 'rounded-[40px] shadow-2xl border-none',
            headerTitle: 'text-2xl font-black uppercase tracking-tighter',
            headerSubtitle: 'text-xs font-bold text-gray-400 uppercase tracking-widest',
          }
        }}
        routing="path" 
        path="/sign-in" 
        signUpUrl="/sign-up"
      />
    </div>
  );
}
