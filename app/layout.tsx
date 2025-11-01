// app/layout.tsx
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QueryProvider from '@/components/providers/QueryProvider';
// FIX: You need to import ChatProvider
import { ChatProvider } from '@/context/ChatProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ApeBodima.lk: Find Bodim, Rooms & Houses in Sri Lanka',
  description: 'Find affordable bodim, rooms, and annexes for rent near universities in Sri Lanka. Perfect for students.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <QueryProvider>
          {/* FIX: Wrap with ChatProvider so the whole app can access it */}
          <ChatProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              {/* FIX: Changed 'flex-grow' to 'grow' */}
              <main className="grow">
                {children}
              </main>
              <Footer />
            </div>
          </ChatProvider>
        </QueryProvider>
      </body>
    </html>
  );
}