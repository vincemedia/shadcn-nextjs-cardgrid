import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shadcn/ui test with cards',
  description: 'Shadcn/ui serving trading card data from a mock api',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <nav>
          <h1 className='pl-8'>Shadcn/ui test with cards</h1>
          {children}
        </nav>
      </body>
    </html>
  );
}
