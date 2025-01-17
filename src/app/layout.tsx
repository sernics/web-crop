import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CROP",
  description: "CROP App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">

        <Header />

        <main className={`${geistSans.variable} ${geistMono.variable} antialiased flex-1 px-4 sm:px-6 lg:px-8 py-6`}>
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}
