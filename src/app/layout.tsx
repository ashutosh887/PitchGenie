import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import appConfig from "../config/appConfig";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastProviderWrapper } from "@/components/ui/use-toast";

const geist = Geist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: appConfig.appName,
  description: appConfig.appDescription,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${geist.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ClerkProvider>
            <ToastProviderWrapper>{children}</ToastProviderWrapper>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
