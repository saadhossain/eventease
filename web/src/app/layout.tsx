import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import HeaderNav from './components/shared/HeaderNav';
import DataProvider from './context/DataContext';
import "./globals.css";
import AuthProvider from './provider/AuthProvider';

const inter = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-fira_code'
});


export const metadata: Metadata = {
  title: "EventEase - Arrange, Track & Manage Events",
  description: "Arrange, Track & Manage Events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} fira_code`}
      >
        <DataProvider>
          <AuthProvider>
            <HeaderNav />
            <div className='min-h-[70vh]'>
              {children}
            </div>
          </AuthProvider>
        </DataProvider>
        <Toaster />
      </body>
    </html>
  );
}
