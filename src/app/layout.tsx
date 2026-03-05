// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bhawana Ecommerce",
  description: "Premium Fashion & Lifestyle Store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-br from-pink-100 via-purple-100 to-indigo-200 min-h-screen flex flex-col`}
      >
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="grow container mx-auto px-6 py-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-linear-to-r from-purple-600 to-pink-500 text-white py-6 text-center mt-auto">
          <h2 className="text-xl font-semibold">Bhawana Ecommerce</h2>
          <p className="text-sm mt-2">
            Premium Collection by riffat ismail • Trusted Quality • Secure Shopping
          </p>
          <p className="text-xs mt-3 opacity-80">
            © {new Date().getFullYear()} Bhawana. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}