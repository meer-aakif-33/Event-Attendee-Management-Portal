// app/layout.tsx
import { ReactNode } from "react";
import Providers from "./providers";
import Link from "next/link";
import { Toaster } from "sonner";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <header className="border-b">
            <nav className="max-w-5xl mx-auto flex h-14 items-center justify-between px-4">
              {/* Brand */}
              <Link href="/" className="font-semibold text-lg">
                Event Portal
              </Link>

              {/* Navigation */}
              <div className="flex items-center gap-6 text-sm">
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  Events
                </Link>
                <Link
                  href="/events/new"
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  Create Event
                </Link>
              </div>
            </nav>
          </header>

          <main className="max-w-5xl mx-auto p-4">
            {children}
          </main>

          {/* Global feedback */}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
