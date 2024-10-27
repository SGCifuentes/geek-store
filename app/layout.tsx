import { auth } from '@/auth';
import { ApolloWrapper } from '@/lib/apollo/apollo-wrapper';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Geek Store',
  description: ' Your Ultimate Destination for Geek Products'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang='en'>
      <body className='antialiased'>
        <SessionProvider session={session}>
          <ApolloWrapper>
            <Header />
            {children}
          </ApolloWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
