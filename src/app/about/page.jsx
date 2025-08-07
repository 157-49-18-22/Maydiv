import About from '../../components/About';
import WhatsappLottie from '../../components/WhatsappLottie';
import SEOHead from '../../components/SEOHead';

export default function Page() {
  return (
    <>
      <SEOHead 
        title="About Us - Maydiv Digital Solutions"
        description="Learn about Maydiv's journey in digital transformation. We are a team of experts dedicated to delivering innovative digital solutions for businesses worldwide."
        keywords="about maydiv, digital agency, team, company history, digital transformation"
        ogImage="/about-1.png"
        canonical="https://maydiv.com/about"
      />
      <About />
      <WhatsappLottie />
    </>
  );
}