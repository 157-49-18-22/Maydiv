import Services from '../../../components/Services';
import WhatsappLottie from '../../../components/WhatsappLottie';
import SEOHead from '../../../components/SEOHead';

export default function UiUxPage() {
  return (
    <main>
      <SEOHead 
        pagePath="/apps/ui-ux"
        defaultTitle="UI/UX Design Services - Maydiv"
        defaultDescription="Professional UI/UX design services by Maydiv. We create intuitive, beautiful user interfaces that enhance user experience and drive engagement."
      />
      <WhatsappLottie />
      <Services />
    </main>
  );
} 