import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import AuthProvider from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bottry",
  description: "Attempt at making a chatgpt clone",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme:light)",
        url: "/icons/logo.png",
        href: "/icons/logo.png",
      },
      {
        media: "(prefers-color-scheme:dark)",
        url: "/icons/logo-dark.png",
        href: "/icons/logo-dark.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="bottry-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
