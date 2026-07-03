import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ActiveChatProvider } from "@/hooks/use-active-chat";
import { DataStreamProvider } from "@/components/chat/data-stream-provider";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import "./globals.css";

// (Keep your metadata/fonts code as it was)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            <TooltipProvider>
              {/* These providers wrap EVERYTHING */}
              <DataStreamProvider>
                <ActiveChatProvider>
                  <Suspense fallback={null}>
                    {children}
                  </Suspense>
                </ActiveChatProvider>
              </DataStreamProvider>
            </TooltipProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
