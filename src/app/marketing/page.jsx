'use client';
import Testimonials from '../../components/Testimonials';
import WhatsappLottie from '../../components/WhatsappLottie';
import SEOHead from '../../components/SEOHead';

export default function RealTestimonialsPage() {
  return (
    <main>
      <SEOHead 
        title="Digital Marketing Services - Maydiv"
        description="Comprehensive digital marketing services by Maydiv. From SEO to social media marketing, we help businesses reach their target audience and grow online."
        keywords="digital marketing, SEO, social media marketing, content marketing, online advertising"
        ogImage="/Marketing.json"
        canonical="https://maydiv.com/marketing"
      />
      <WhatsappLottie />
      <Testimonials />
    </main>
  );
} 