import type { Metadata } from "next";
import "./globals.css";
import BetterBotPanel from "@/components/BetterBotPanel";
import { ThemeProvider } from "@/components/ThemeProvider";

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
      <body className="antialiased transition-colors duration-200">
        <ThemeProvider>
          {children}
          <BetterBotPanel />
        </ThemeProvider>
      </body>
    </html>
  );
}

