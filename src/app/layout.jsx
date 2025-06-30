import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

// Metadata
// title: 'MayDiv - Interactive Digital Solutions'
// description: 'Step into the future with MayDiv! We offer a range of digital solutions that can transform your business landscape.'

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    let reloaded = false;
    const handleRouteChange = () => {
      if (!reloaded) {
        reloaded = true;
        window.location.reload();
      }
    };
    router.events?.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events?.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <WhatsAppFloat />
        {children}
      </body>
    </html>
  );
} 