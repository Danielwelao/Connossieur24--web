import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connossieur24",
  description: "Building a digitally secure society where individuals and organizations have the knowledge to navigate the digital world safely.",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/icon-light.png",
      href: "/icon-light.png",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/icon-dark.png",
      href: "/icon-dark.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-slate-50`} suppressHydrationWarning>
        <Navbar />
        {/* Main takes up remaining space so the footer is always pushed to the bottom */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}