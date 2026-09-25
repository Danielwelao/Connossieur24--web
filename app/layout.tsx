import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const jetBrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono", 
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

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
      <body 
        className={`${geistSans.variable} ${jetBrainsMono.variable} ${spaceGrotesk.variable} ${geistSans.className} flex flex-col min-h-screen bg-slate-50 antialiased`} 
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}