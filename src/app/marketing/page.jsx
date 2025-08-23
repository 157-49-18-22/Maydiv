'use client';
import Testimonials from '../../components/Testimonials';
import WhatsappLottie from '../../components/WhatsappLottie';
import SEOHead from '../../components/SEOHead';

export default function RealTestimonialsPage() {
  return (
    <main>
      <SEOHead 
        pagePath="/marketing"
        defaultTitle="Digital Marketing Services - Maydiv"
        defaultDescription="Comprehensive digital marketing services by Maydiv. From SEO to social media marketing, we help businesses reach their target audience and grow online."
      />
      <WhatsappLottie />
      <Testimonials />
    </main>
  );
} 