'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaFacebook, FaRocket, FaPhone, FaSync, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import './About.css';
import TrustedLogos from './TrustedLogos';
import Testimonial from './Testimonial';
import Discuss from './Discuss';
import Footer from './Footer';
import Lottie from 'lottie-react';
import aboutAnimation from '../../public/About.json';

export default function About() {
  // Dropdown state and timeout
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDropdownOpen, setDrawerDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownTimeout = useRef(null);
  const [burgerOpen, setBurgerOpen] = useState(false); // Burger menu state

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 350);
  };
  const handleDrawerDropdownToggle = () => setDrawerDropdownOpen((open) => !open);
  const handleNavClick = () => {
    setDrawerOpen(false);
    setDrawerDropdownOpen(false);
  };

  return (
    <main className="about-main">
      {/* Hero Section */}
      <nav className="header-nav">
        <div className="header-logo">
          <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} />
        </div>
        {/* Desktop nav links */}
        {!isMobile && (
          <ul className="header-links">
            <li><Link href="/">Home</Link></li>
            <li className="dropdown"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              onFocus={handleDropdownEnter}
              onBlur={handleDropdownLeave}
            >
              <span className="dropdown-toggle">Services</span>
              <ul className="dropdown-menu" style={{display: dropdownOpen ? 'flex' : 'none', opacity: dropdownOpen ? 1 : 0, pointerEvents: dropdownOpen ? 'auto' : 'none', transform: dropdownOpen ? 'translateX(-50%) translateY(0) scale(1)' : 'translateX(-50%) translateY(10px) scale(0.95)'}}>
                <li><Link href="/web-development"><span><FaCode className="dropdown-icon" /> Web Development</span></Link></li>
                <li><Link href="/apps/ui-ux"><span><FaPalette className="dropdown-icon" /> UI/UX Design</span></Link></li>
                <li><Link href="/marketing"><span><FaBullhorn className="dropdown-icon" /> Social Media and Marketing</span></Link></li>
                <li><Link href="/app-development"><span><FaMobileAlt className="dropdown-icon" /> App Development</span></Link></li>
                <li><Link href="/ai"><span><FaBrain className="dropdown-icon" /> Artificial Intelligence</span></Link></li>
              </ul>
            </li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/about">About Us</Link></li>
          </ul>
        )}
        {/* Burger menu for mobile */}
        {isMobile && !drawerOpen && (
          <div className="burger-icon" onClick={() => setDrawerOpen(true)}>
            <FaBars />
          </div>
        )}
        {/* Mobile drawer */}
        {isMobile && (
          <div className={`mobile-drawer${drawerOpen ? ' open' : ''}`}>
            <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu"><FaTimes /></button>
            <ul>
              <li><Link href="/" onClick={() => setDrawerOpen(false)}>Home</Link></li>
              <li>
                <button className={`drawer-dropdown${drawerDropdownOpen ? ' open' : ''}`} onClick={() => setDrawerDropdownOpen(v => !v)}>
                  Services <FaChevronDown style={{ marginLeft: 8, transform: drawerDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                <div className={`drawer-dropdown-list${drawerDropdownOpen ? ' open' : ''}`} style={{ display: drawerDropdownOpen ? 'flex' : 'none' }}>
                  <Link href="/web-development" onClick={() => setDrawerOpen(false)}><span><FaCode className="dropdown-icon" /> Web Development</span></Link>
                  <Link href="/apps/ui-ux" onClick={() => setDrawerOpen(false)}><span><FaPalette className="dropdown-icon" /> UI/UX Design</span></Link>
                  <Link href="/marketing" onClick={() => setDrawerOpen(false)}><span><FaBullhorn className="dropdown-icon" /> Social Media and Marketing</span></Link>
                  <Link href="/app-development" onClick={() => setDrawerOpen(false)}><span><FaMobileAlt className="dropdown-icon" /> App Development</span></Link>
                  <Link href="/ai" onClick={() => setDrawerOpen(false)}><span><FaBrain className="dropdown-icon" /> Artificial Intelligence</span></Link>
                </div>
              </li>
              <li><Link href="/projects" onClick={() => setDrawerOpen(false)}>Projects</Link></li>
              <li><Link href="/contact" onClick={() => setDrawerOpen(false)}>Contact</Link></li>
              <li><Link href="/about" onClick={() => setDrawerOpen(false)}>About Us</Link></li>
            </ul>
          </div>
        )}
        <div className="header-socials">
        <a href="https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.facebook.com/profile.php?id=615720000000000" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
      </nav>
      <section className="about-hero-section">
        <div className="about-hero-lottie-bg">
          <Lottie animationData={aboutAnimation} loop autoplay />
        </div>
        <h1 className="about-gradient-heading">
          Innovating Digital Experience<br />
          <span className="about-gradient-blue">About Us</span>
        </h1>
        <p className="about-subheading">
          Step into the future with maydiv! I offer a range of digital solutions that can transform your business landscape. With our expertise, your digital needs will be met with creativity and innovation.
        </p>
        <div className="about-btn-row">
          <button className="fancy"><span className="top-key"></span><span className="text">Get started</span><span className="bottom-key-1"></span><span className="bottom-key-2"></span></button>
          <button className="fancy"><span className="top-key"></span><span className="text">Our Portfolio</span><span className="bottom-key-1"></span><span className="bottom-key-2"></span></button>
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
          <Image src="/Integration.png" alt="Integration" width={420} height={420} quality={100} className="about-integration-img" />
          <div className="about-integration-left">
            <div className="about-story-card about-story-flex">
              <div className="about-story-main">
                <div className="about-integration-label">Managing Director</div>
                <div className="about-integration-desc">
                  We began our journey as a group of passionate freelancers with a vision — to transform ideas into digital reality. With no investors and just pure determination, we officially registered our company on February 28, 2025.
                  <br /><br />
                  From humble beginnings to growing into a full-fledged IT solutions startup, our focus remains the same: building smart, fast, and scalable digital solutions that solve real problems.
                </div>
              </div>
              <div className="about-story-project">
                <div className="about-story-project-title">Our very first project?</div>
                <div className="about-story-project-desc">
                  A fully functional salary management software, developed and delivered in just one week. That successful launch gave us the confidence to dream bigger — and today, we are building high-quality websites, mobile apps, and offering a wide range of IT services for startups, businesses, and individuals alike.
                </div>
              </div>
            </div>
          </div>
          {/* <div className="about-integration-right">
            <Image src="/Integration.png" alt="Integration" width={420} height={420} quality={100} className="about-integration-img" />
          </div> */}
        </div>
      </section>
      {/* Security Section */}
      <section className="about-security-section">
        <Image src="/Bg1.png" alt="Decorative Dots" width={70} height={260} className="about-security-bg-dots" />
        <div className="about-security-content">
          <div className="about-security-left">
            <div className="about-security-visual">
              <div className="about-security-glow"></div>
              <Image src="/Security.jpg" alt="Security" width={340} height={340} quality={100} className="about-security-img" />
            </div>
          </div>
          <div className="about-security-right">
            <div className="about-story-project founder-card">
              <div className="about-story-project-title">Founder</div>
              <div className="about-story-project-desc">
              We're a passionate team of builders, designers, and thinkers — driven by the idea of solving real problems with smart tech.

It all began on a train ride, when Vishal wished for an LSAT prep app that didn't exist. So he built it — and it became the #1 paid LSAT app for over a year.

Since then, we've been turning ideas into impactful digital products — from mobile apps to full-stack IT solutions.
              </div>
            </div>
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
          We're a passionate team of builders, designers, and thinkers — driven by the idea of solving real problems with smart tech.

It all began on a train ride, when Vishal wished for an LSAT prep app that didn't exist. So he built it — and it became the #1 paid LSAT app for over a year.

Since then, we've been turning ideas into impactful digital products — from mobile apps to full-stack IT solutions.
          </div>
          <div className="about-team-person">
            <div className="about-team-name">Mayank Varshney</div>
            <div className="about-team-role">MD Maydiv Infotech</div>
            <div className="about-team-socials">
         
              <a href="https://www.instagram.com/mayank.vy?igsh=NnRpNXN4OGF6MDI1" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/mayank-varshney-b69191284" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>
          <div className="about-team-card-triangle"></div>
        </div>
        <div className="about-team-image-row">
          
         
          <div className="about-team-image about-team-image-small">
          <Image src="/Ayush.jpeg" alt="Ayush" width={170} height={170} quality={100} />
          </div>
          <div className="about-team-image about-team-image-large">
          <Image src="/Ravi.jpeg" alt="Ravi" width={170} height={170} quality={100} />
          </div>
          <div className="about-team-image about-team-image-small">
          <Image src="/Abhi.jpeg" alt="Abhi" width={170} height={170} quality={100} />
          </div>
          <div className="about-team-image about-team-image-small">
            <Image src="/Ashish.jpeg" alt="Team Member 6" width={170} height={170} quality={100} />
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
          {showCounters ? <Counter start={40} end={120} duration={400} /> : 40}+
        </span>
        <div className="stat-label">Success Project</div>
      </div>
      <div className="header-stat">
        <span className="stat-number gradient-text">
          {showCounters ? <Counter start={1} end={2} duration={700} /> : 2}+
        </span>
        <div className="stat-label">Years Experience</div>
      </div>
      <div className="header-stat">
       
   
      <div className="header-stat">
        <span className="stat-number gradient-text">
          {showCounters ? <Counter start={2} end={10} duration={400} /> : 10}+
        </span>
        <div className="stat-label">Startup Raised</div>
      </div>
      </div>
    </div>
  );
} 