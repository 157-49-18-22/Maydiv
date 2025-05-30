'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './About.css';
import TrustedLogos from './TrustedLogos';
import Testimonial from './Testimonial';
import Discuss from './Discuss';
import Footer from './Footer';

export default function About() {
  return (
    <main className="about-main">
      {/* Hero Section */}
      <nav className="header-nav">
        <div className="header-logo">
          <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} />
        </div>
        <ul className="header-links">
          <li><Link href="#home">Home</Link></li>
          <li><Link href="#services">Services</Link></li>
          <li><Link href="#projects">Projects</Link></li>
          <li><Link href="#testimonials">Testimonials</Link></li>
          <li><Link href="#contact">Contact</Link></li>
        </ul>
        <div className="header-socials">
          <a href="#" aria-label="GitHub"><FaGithub /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
        </div>
      </nav>
      <section className="about-hero-section">
        <h1 className="about-gradient-heading">
          Innovating Digital Experience<br />
          <span className="about-gradient-blue">About Us</span>
        </h1>
        <p className="about-subheading">
          Step into the future with maydiv! I offer a range of digital solutions that can transform your business landscape. With our expertise, your digital needs will be met with creativity and innovation.
        </p>
        <div className="about-btn-row">
          <button className="about-btn about-btn-primary">Get started</button>
          <button className="about-btn about-btn-secondary">Our Portfolio</button>
        </div>
      </section>
      <TrustedLogos />
      {/* Features Section */}
      <section className="about-features-section">
        <div className="about-features-label">FEATURES</div>
        <h2 className="about-features-heading">Discover the Tools that Drive Success</h2>
        <div className="about-features-desc">
          Unleash innovation and accelerate growth with our dynamic product.
        </div>
        <div className="about-features-card-group">
          <div className="about-feature-card">
            <div className="about-feature-icon">
              <Image src="/Cutting.png" alt="Cutting Edge Icon" width={48} height={48} quality={100} priority />
            </div>
            <div className="about-feature-title">Cutting-Edge Innovation</div>
            <div className="about-feature-text">
              Experience groundbreaking technological advancements that push the boundaries of what's possible, revolutionizing workflows and transforming your reality.
            </div>
          </div>
          <div className="about-feature-divider"></div>
          <div className="about-feature-card">
            <div className="about-feature-icon">
              <Image src="/Seamless.png" alt="Seamless Icon" width={48} height={48} quality={100} priority />
            </div>
            <div className="about-feature-title">Seamless Connectivity</div>
            <div className="about-feature-text">
              Stay connected anytime, anywhere with our robust and reliable network infrastructure, ensuring uninterrupted communication and effortless access to the digital world.
            </div>
          </div>
          <div className="about-feature-divider"></div>
          <div className="about-feature-card">
            <div className="about-feature-icon">
              <Image src="/Intuitive.png" alt="Intuitive Icon" width={48} height={48} quality={100} priority />
            </div>
            <div className="about-feature-title">Intuitive User Interface</div>
            <div className="about-feature-text">
              Enjoy a seamless and intuitive user experience with our sleek and user-friendly interface, designed to simplify complex tasks and enhance productivity.
            </div>
          </div>
        </div>
        <div className="about-features-btn-row">
          <button className="about-features-btn about-features-btn-outline">Contact Us</button>
          <button className="about-features-btn about-features-btn-viewall">View All <span className="about-features-btn-arrow">→</span></button>
        </div>
        <Image src="/Bg1.png" alt="Decorative Left Dots" width={90} height={90} className="about-features-bg-left" />
        <Image src="/Bg.png" alt="Decorative Right Dots" width={120} height={90} className="about-features-bg-right" />
      </section>
      {/* Integration Section */}
      <section className="about-integration-section">
        <div className="about-integration-content">
          <div className="about-integration-left">
            <div className="about-integration-label">INTEGRATIONS</div>
            <h2 className="about-integration-heading">Unified view of your <br />customers</h2>
            <div className="about-integration-desc">
              Enterpact will integrate directly with any feedback channel.<br />
              Take advantage of our CSV importer or API
            </div>
            <button className="about-integration-btn">View all integrations</button>
          </div>
          <div className="about-integration-right">
            <Image src="/Integration.png" alt="Integration" width={420} height={420} quality={100} className="about-integration-img" />
          </div>
        </div>
      </section>
      {/* Security Section */}
      <section className="about-security-section">
        <Image src="/Bg1.png" alt="Decorative Dots" width={70} height={260} className="about-security-bg-dots" />
        <div className="about-security-content">
          <div className="about-security-left">
            <div className="about-security-visual">
              <div className="about-security-glow"></div>
              <Image src="/Security.png" alt="Security" width={340} height={340} quality={100} className="about-security-img" />
            </div>
          </div>
          <div className="about-security-right">
            <div className="about-security-label">SECURITY</div>
            <h2 className="about-security-heading">Built for scale and enterprise level security</h2>
            <div className="about-security-desc">
              SOC-2 Type II certification, penetration tested, and regular vulnerability scans. Hosted behind a VPC. Data encryption at rest and transit.
            </div>
            <button className="about-security-btn">Learn More</button>
          </div>
        </div>
      </section>
      {/* Meet Our Team Section */}
      <section className="about-team-section">
        <h2 className="about-team-heading">Meet our team</h2>
        <div className="about-team-subheading">
          Meet our passionate and talented team, committed to delivering exceptional results, driving innovation, and transforming your vision into reality.
        </div>
        <div className="about-team-testimonial-card">
          <div className="about-team-quote">
            During a train ride, a moment of inspiration struck Vishal; he wished for a convenient study tool on his phone to help prep for the LSAT. However, such an app didn't exist at the time. Determined to overcome this hurdle, Vishal took matters into his own hands and developed one of the easiest and most comprehensive LSAT apps on the market. The app quickly gained popularity, becoming the #1 paid LSAT app for over a year.
          </div>
          <div className="about-team-person">
            <div className="about-team-name">John Wick</div>
            <div className="about-team-role">CEO Maydiv</div>
            <div className="about-team-socials">
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>
          <div className="about-team-card-triangle"></div>
        </div>
        <div className="about-team-image-row">
          <div className="about-team-image about-team-image-small">
            <Image src="/Pic1.png" alt="Team Member 1" width={170} height={170} quality={100} />
          </div>
          <div className="about-team-image about-team-image-small">
            <Image src="/Pic2.png" alt="Team Member 2" width={170} height={170} quality={100} />
          </div>
          <div className="about-team-image about-team-image-small">
            <Image src="/Pic3.png" alt="Team Member 3" width={170} height={170} quality={100} />
          </div>
          <div className="about-team-image about-team-image-large">
            <Image src="/Pic4.png" alt="Team Member 4" width={280} height={280} quality={100} />
          </div>
          <div className="about-team-image about-team-image-small">
            <Image src="/Pic5.png" alt="Team Member 5" width={170} height={170} quality={100} />
          </div>
          <div className="about-team-image about-team-image-small">
            <Image src="/Pic6.png" alt="Team Member 6" width={170} height={170} quality={100} />
          </div>
          <div className="about-team-image about-team-image-small">
            <Image src="/Pic7.png" alt="Team Member 7" width={170} height={170} quality={100} />
          </div>
        </div>
        {/* Stats Section Below Testimonials/Team */}
        <StatsSection />
        {/* Testimonials Section Below Stats */}
        <Testimonial />
        {/* Discuss Section Below Testimonials */}
        <Discuss />
      </section>
      {/* Footer at the very bottom */}
      <Footer />
    </main>
  );
}

// Animated Counter component (copied from Header.jsx)
function Counter({ start, end, duration = 2000 }) {
  const [value, setValue] = useState(start);
  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      setValue(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return value;
}

// Stats Section component
function StatsSection() {
  const [showCounters, setShowCounters] = useState(false);
  const statsRef = React.useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!statsRef.current) return;
      const rect = statsRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setShowCounters(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="header-stats-section" ref={statsRef}>
      <div className="header-stat">
        <span className="stat-number gradient-text">
          {showCounters ? <Counter start={40} end={723} duration={2000} /> : 40}+
        </span>
        <div className="stat-label">Success Project</div>
      </div>
      <div className="header-stat">
        <span className="stat-number gradient-text">
          {showCounters ? <Counter start={2} end={10} duration={2000} /> : 2}+
        </span>
        <div className="stat-label">Years Experience</div>
      </div>
      <div className="header-stat">
        <span className="stat-number gradient-text">
          {showCounters ? <Counter start={30} end={500} duration={2000} /> : 30}+
        </span>
        <div className="stat-label">Product Launched</div>
      </div>
      <div className="header-stat">
        <span className="stat-number gradient-text">
          {showCounters ? <Counter start={10} end={100} duration={2000} /> : 10}+
        </span>
        <div className="stat-label">Startup Raised</div>
      </div>
    </div>
  );
} 