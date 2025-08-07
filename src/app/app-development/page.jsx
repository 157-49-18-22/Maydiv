'use client';
import Apps from '../../components/Apps';
import WhatsappLottie from '../../components/WhatsappLottie';
import SEOHead from '../../components/SEOHead';

export default function RealAppsPage() {
  return (
    <main>
      <SEOHead 
        title="App Development Services - Maydiv"
        description="Expert mobile app development services by Maydiv. We build native and cross-platform mobile applications that engage users and drive business results."
        keywords="app development, mobile apps, iOS development, Android development, cross-platform apps"
        ogImage="/App.png"
        canonical="https://maydiv.com/app-development"
      />
      <WhatsappLottie />
      <Apps />
    </main>
  );
} 