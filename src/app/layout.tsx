import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import Navbar from './../components/share/Navbar';
import Footer from '@/components/share/Footer';
import { ToastContainer } from 'react-toastify';
import NavigationLoader from '@/components/share/NavigationLoader';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Luxury | Premium E-Commerce',
  description: 'Discover exclusive luxury products — curated for the discerning buyer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavigationLoader />
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />

        {children}

        <Footer />
      </body>
    </html>
  );
}
