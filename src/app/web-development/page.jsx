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
        title="Web Development Services - Maydiv"
        description="Professional web development services by Maydiv. We create responsive, modern websites that drive business growth and enhance user experience."
        keywords="web development, website design, responsive websites, custom web applications"
        ogImage="/Web.png"
        canonical="https://maydiv.com/web-development"
      />
      <WhatsappLottie />
      <Projects key={pathname} />
    </main>
  );
} 