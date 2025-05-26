import Header from '../components/Header';
import OurService from '../components/OurService';
import BestProject from '../components/BestProject';
import Testimonial from '../components/Testimonial';
import Discuss from '../components/Discuss';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Header />
      <OurService />
      <BestProject />
      <Testimonial />
      <Discuss />
      <Footer>
        <Link href="/about" className="footer-link">About Us</Link>
      </Footer>
    </main>
  );
} 