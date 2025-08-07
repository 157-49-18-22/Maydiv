import ContactUs from '../../components/ContactUs';
import WhatsappLottie from '../../components/WhatsappLottie';
import SEOHead from '../../components/SEOHead';

export default function ContactPage() {
  return (
    <main>
      <SEOHead 
        title="Contact Us - Maydiv Digital Solutions"
        description="Get in touch with Maydiv for your digital transformation needs. We're here to help you achieve your business goals with cutting-edge technology solutions."
        keywords="contact maydiv, digital solutions contact, business inquiry, consultation"
        ogImage="/logo.png"
        canonical="https://maydiv.com/contact"
      />
      <WhatsappLottie />
      <ContactUs />
    </main>
  );
}
