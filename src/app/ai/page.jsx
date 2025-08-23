

import AI from '../../components/AI';
import WhatsappLottie from '../../components/WhatsappLottie';
import SEOHead from '../../components/SEOHead';

export default function RealAiPage() {
  return (
    <main>
      <SEOHead 
        pagePath="/ai"
        defaultTitle="AI Solutions - Maydiv"
        defaultDescription="Cutting-edge AI solutions by Maydiv. We leverage artificial intelligence to automate processes, enhance decision-making, and drive business innovation."
      />
      <WhatsappLottie />
      <AI />
    </main>
  );
} 