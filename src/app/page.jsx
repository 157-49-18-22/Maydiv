"use client";
import Header from '../components/Header';
import OurService from '../components/OurService';
import Footer from '../components/Footer';
import BestProject from '../components/BestProject';
import Discuss from '../components/Discuss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WhatsappLottie from '../components/WhatsappLottie';
import { useEffect } from 'react';

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('pageReloaded')) {
      sessionStorage.setItem('pageReloaded', 'true');
      window.location.reload();
    }
  }, []);

  return (
    <main>
      <WhatsappLottie />
      <Header />
      <OurService key={pathname} />
      <BestProject />
      <Discuss />
      <Footer>
        <Link href="/about" className="footer-link">About Us</Link>
      </Footer>
    </main>
  );
} 