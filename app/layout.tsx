import type { Metadata } from "next";
import "./globals.css";
import BetterBotPanel from "@/components/BetterBotPanel";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Better Direct - Client Ordering",
  description: "Streamline your hardware ordering and tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className="antialiased bg-gray-50 text-gray-900">
        <ThemeProvider>
          <AuthProvider>
            <div className="min-h-screen">
              {/* Header hides itself on /login so this is safe */}
              <Header />
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
            </div>
            <BetterBotPanel />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
