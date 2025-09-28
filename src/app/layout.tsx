import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import './globals.scss';
import Nav from '@/components/Nav';
import { Suspense } from 'react';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin']
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin']
// });

const karla = Karla({
  variable: '--karla',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'pretty budget'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${karla.variable}`}>
        <Suspense>
          <Nav />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
