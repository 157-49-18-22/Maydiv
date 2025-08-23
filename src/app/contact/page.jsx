import ContactUs from '../../components/ContactUs';
import WhatsappLottie from '../../components/WhatsappLottie';
import SEOHead from '../../components/SEOHead';

export default function ContactPage() {
  return (
    <main>
      <SEOHead 
        pagePath="/contact"
        defaultTitle="Contact Us - Maydiv Digital Solutions"
        defaultDescription="Get in touch with Maydiv for your digital transformation needs. We're here to help you achieve your business goals with cutting-edge technology solutions."
      />
      <WhatsappLottie />
      <ContactUs />
    </main>
  );
}
