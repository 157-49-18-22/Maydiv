import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import whatsappAnimation from '../../public/Whatsapp.json';

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
        <a
          href="https://wa.me/919999999999" // Change to your WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            right: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 9999,
            width: 70,
            height: 70,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: '50%',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Lottie animationData={whatsappAnimation} loop autoplay style={{ width: 60, height: 60 }} />
        </a>
        {/* WhatsApp Lottie will be added here */}
        {children}
      </body>
    </html>
  );
} 