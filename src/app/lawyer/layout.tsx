"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/mainNavbar";
import LawyerSideBar from "@/components/lawyerSidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { NotificationProvider } from "../context/NotificationContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const noSidebarRoutes = [
    "/lawyer/updateProfile",
    /^\/lawyer\/cases\/\d+$/,
    /^\/lawyer\/cases\/\d\/dispute+$/,
    "/lawyer/notification",
  ];
  const shouldHideSidebar = (path: string) => {
    return noSidebarRoutes.some((route) =>
      route instanceof RegExp ? route.test(path) : route === path
    );
  };
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <NotificationProvider>
          <div vaul-drawer-wrapper="" className="relative">
            <Navbar />
            {!shouldHideSidebar(pathname) && <LawyerSideBar />}

            <div className="relative max-w-screen-2xl flex min-h-screen  flex-col bg-background">
              {children}
            </div>
          </div>
        </NotificationProvider>
      </body>
    </html>
  );
}
