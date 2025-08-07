import Services from '../../../components/Services';
import WhatsappLottie from '../../../components/WhatsappLottie';
import SEOHead from '../../../components/SEOHead';

export default function UiUxPage() {
  return (
    <main>
      <SEOHead 
        title="UI/UX Design Services - Maydiv"
        description="Professional UI/UX design services by Maydiv. We create intuitive, beautiful user interfaces that enhance user experience and drive engagement."
        keywords="UI design, UX design, user interface, user experience, design services"
        ogImage="/UI.png"
        canonical="https://maydiv.com/apps/ui-ux"
      />
      <WhatsappLottie />
      <Services />
    </main>
  );
} 