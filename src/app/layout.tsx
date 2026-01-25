import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import './globals.scss';
import Nav from '@/components/Nav';
import { Suspense } from 'react';
import { cookies } from 'next/headers';

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

export type Themes = 'green' | 'purple';

export const metadata: Metadata = {
  title: 'pretty budget'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  // TODO: see if we can access local storage here somehow
  const theme = cookieStore.get('theme')?.value || 'green';

  return (
    <html lang="en">
      <body id="theme" data-theme={theme} className={`${karla.variable}`}>
        <Suspense>
          <Nav />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
