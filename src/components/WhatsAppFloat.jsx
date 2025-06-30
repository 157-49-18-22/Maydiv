import Lottie from 'lottie-react';
import whatsappAnim from './Whatsapp.json';

const WhatsAppFloat = () => (
  <a
    href="https://wa.me/919220438999"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: 'fixed',
      right: 24,
      bottom: 24,
      zIndex: 9999,
      width: 64,
      height: 64,
      cursor: 'pointer',
    }}
    aria-label="WhatsApp"
  >
    <Lottie animationData={whatsappAnim} loop autoplay style={{ width: '100%', height: '100%' }} />
  </a>
);

export default WhatsAppFloat; 