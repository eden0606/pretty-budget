import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import './globals.scss';
import Nav from '@/components/Nav';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import AuthenticatedStatus from '@/components/AuthenticatedStatus';

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
        <AuthenticatedStatus />
        <Suspense>
          <Nav />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
