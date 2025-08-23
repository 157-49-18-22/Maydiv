"use client";
import Projects from '../../components/Projects';
import { usePathname } from 'next/navigation';
import WhatsappLottie from '../../components/WhatsappLottie';
import SEOHead from '../../components/SEOHead';

export default function RealProjectsPage() {
  const pathname = usePathname();
  return (
    <main>
      <SEOHead 
        pagePath="/web-development"
        defaultTitle="Web Development Services - Maydiv"
        defaultDescription="Professional web development services by Maydiv. We create responsive, modern websites that drive business growth and enhance user experience."
      />
      <WhatsappLottie />
      <Projects key={pathname} />
    </main>
  );
} 