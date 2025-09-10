'use client';

// import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { Navbar } from '@/components/layout/navbar';
import './globals.css';
import Footer from '@/components/layout/Footer';
import AIChatWidget from './(dashboard)/ai/AiPage';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <AIChatWidget />
        </Provider>
      </body>
    </html>
  );
}
