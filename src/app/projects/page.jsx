import New from '../../components/New';
import WhatsappLottie from '../../components/WhatsappLottie';
import SEOHead from '../../components/SEOHead';

export default function ProjectsPage() {
  return (
    <main>
      <SEOHead 
        title="Our Projects - Maydiv Portfolio"
        description="Explore Maydiv's impressive portfolio of successful digital projects. From web applications to mobile apps, see how we've helped businesses grow."
        keywords="maydiv projects, portfolio, case studies, web development projects, app development"
        ogImage="/Project.png"
        canonical="https://maydiv.com/projects"
      />
      <WhatsappLottie />
      <New />
    </main>
  );
}
