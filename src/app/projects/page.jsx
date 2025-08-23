import New from '../../components/New';
import WhatsappLottie from '../../components/WhatsappLottie';
import SEOHead from '../../components/SEOHead';

export default function ProjectsPage() {
  return (
    <main>
      <SEOHead 
        pagePath="/projects"
        defaultTitle="Our Projects - Maydiv Portfolio"
        defaultDescription="Explore Maydiv's impressive portfolio of successful digital projects. From web applications to mobile apps, see how we've helped businesses grow."
      />
      <WhatsappLottie />
      <New />
    </main>
  );
}
