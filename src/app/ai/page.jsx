

import AI from '../../components/AI';
import WhatsappLottie from '../../components/WhatsappLottie';
import SEOHead from '../../components/SEOHead';

export default function RealAiPage() {
  return (
    <main>
      <SEOHead 
        title="AI Solutions - Maydiv"
        description="Cutting-edge AI solutions by Maydiv. We leverage artificial intelligence to automate processes, enhance decision-making, and drive business innovation."
        keywords="AI solutions, artificial intelligence, machine learning, automation, business AI"
        ogImage="/Servicesai.png"
        canonical="https://maydiv.com/ai"
      />
      <WhatsappLottie />
      <AI />
    </main>
  );
} 