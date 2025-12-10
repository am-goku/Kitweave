import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { SessionProvider } from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: "KitWeaver",
  description: "AI-Powered React Component Library",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white min-h-screen flex flex-col font-sans selection:bg-indigo-500/30">
        <SessionProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
