import type { Metadata } from "next";
import "./globals.css";
import BetterBotPanel from "@/components/BetterBotPanel";

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
    <html lang="en" className="light">
      <body className="antialiased">
        {children}
        <BetterBotPanel />
      </body>
    </html>
  );
}

