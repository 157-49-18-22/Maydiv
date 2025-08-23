import About from '../../components/About';
import WhatsappLottie from '../../components/WhatsappLottie';
import SEOHead from '../../components/SEOHead';

export default function Page() {
  return (
    <>
      <SEOHead 
        pagePath="/about"
        defaultTitle="About Us - Maydiv Digital Solutions"
        defaultDescription="Learn about Maydiv's journey in digital transformation. We are a team of experts dedicated to delivering innovative digital solutions for businesses worldwide."
      />
      <About />
      <WhatsappLottie />
    </>
  );
}