import type { Metadata } from "next";
import "../styles/globals.css";
import BetterBotPanel from "@/components/features/chat/BetterBotPanel";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

export const metadata: Metadata = {
  title: "Relay — A Client Operations Platform",
  description:
    "Relay is a lightweight client operations platform designed to centralize post-sale work, internal handoffs, and ongoing client context without the overhead of a traditional CRM.",
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            {/* Header hides itself on /login so this is safe */}
            <Header />
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 w-full">
              {children}
            </main>
            <Footer />
          </div>
          <BetterBotPanel />
        </ThemeProvider>
      </body>
    </html>
  );
}

