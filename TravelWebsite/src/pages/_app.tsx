import ProgressBar from "@badrap/bar-of-progress";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import AdminThemeProvider from "@/components/admin/layout/ThemeToggle/theme-provider";
import { ActiveThemeProvider } from "@/components/admin/active-theme";
import { Toaster } from "@/components/admin/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const progress = new ProgressBar({
  size: 4,
  color: "orange",
  className: "z-50",
  delay: 80,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function AdminProviders({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<string>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const themeCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("active_theme="))
        ?.split("=")[1];
      if (themeCookie) {
        setActiveTheme(themeCookie);
      }
    }
  }, []);

  return (
    <ActiveThemeProvider initialTheme={activeTheme}>
      {mounted && <NextTopLoader color="var(--primary)" showSpinner={false} />}
      {mounted && <Toaster />}
      {children}
    </ActiveThemeProvider>
  );
}

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const isAdminRoute = router.pathname?.startsWith("/admin");

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <ClerkProvider {...pageProps}>
        {isAdminRoute ? (
            <AdminProviders>
              <Component {...pageProps} />
            </AdminProviders>
        ) : (
          <>
            <Navbar />
          <Component {...pageProps} />
          </>
        )}
      </ClerkProvider>
    </ThemeProvider>
  );
};

export default MyApp;
