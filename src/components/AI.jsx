'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image'; // Assuming you're using Next.js
import Link from 'next/link';   // Assuming you're using Next.js
import { FaGithub, FaInstagram, FaFacebook, FaRocket, FaPhone, FaSync, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain, FaBars, FaChevronDown, FaTimes } from 'react-icons/fa';
import Lottie from 'lottie-react';
import './AI.css';
import Testimonial from './Testimonial';
import Footer from './Footer';
import MobileDrawer from './MobileDrawer';

const AI = () => {
  // Dropdown state and timeout
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDropdownOpen, setDrawerDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('aiReloaded')) {
      sessionStorage.setItem('aiReloaded', 'true');
      window.location.reload();
    }
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 350);
  };

  return (
    <>
      <header className="header-container">
        <nav className={`header-nav${navScrolled ? ' scrolled' : ''}`}>
          <div className="header-logo">
            <Link href="/">
            <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} quality={100} unoptimized />
            </Link>
          </div>
          {/* Desktop nav links */}
          {!isMobile && (
            <ul className="header-links">
              <li><Link href="/">Home</Link></li>
              <li
                className="dropdown"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
                onFocus={handleDropdownEnter}
                onBlur={handleDropdownLeave}
              >
                <span className="dropdown-toggle" style={{marginBottom: '10px'}}>Services</span>
                <ul className="dropdown-menu" style={{display: dropdownOpen ? 'flex' : 'none', opacity: dropdownOpen ? 1 : 0, pointerEvents: dropdownOpen ? 'auto' : 'none', transform: dropdownOpen ? 'translateX(-43%) translateY(0) scale(1)' : 'translateX(-50%) translateY(10px) scale(0.95)'}}>
                  <li><Link href="/web-development"><span><FaCode className="dropdown-icon" /> Web Development</span></Link></li>
                  <li><Link href="/apps/ui-ux"><span><FaPalette className="dropdown-icon" /> UI/UX Design</span></Link></li>
                  <li><Link href="/marketing"><span><FaBullhorn className="dropdown-icon" /> Social Media and Marketing</span></Link></li>
                  <li><Link href="/app-development"><span><FaMobileAlt className="dropdown-icon" /> App Development</span></Link></li>
                  <li><Link href="/ai"><span><FaBrain className="dropdown-icon" /> Artificial Intelligence</span></Link></li>
                </ul>
              </li>
              <li><Link href="/projects"><span>Projects</span></Link></li>
              <li><Link href="/contact"><span>Contact</span></Link></li>
              <li><Link href="/about"><span>About Us</span></Link></li>
            </ul>
          )}
          {/* MobileDrawer usage here */}
          <MobileDrawer
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            drawerDropdownOpen={drawerDropdownOpen}
            setDrawerDropdownOpen={setDrawerDropdownOpen}
            isMobile={isMobile}
          />
          <div className="header-socials">
          <a href="https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.facebook.com/profile.php?id=615720000000000" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
        </nav>
      </header>

      <section className="ai-hero-section">
        <div className="ai-hero-left">
          <h1 className="ai-hero-title">Elevate With<br />Ai Agent.</h1>
          <p className="ai-hero-desc">
            Elevate your site's visibility effortlessly with AI, where smart technology meets user-friendly SEO tools. Elevate your site's visibility effortlessly with AI, where smart technology meets user-friendly SEO tools.
          </p>
          <Link href="/contact">
            <button className="fancy"><span className="top-key"></span><span className="text">Contact Us</span><span className="bottom-key-1"></span><span className="bottom-key-2"></span></button>
          </Link>
        </div>
        <div className="Ai-hero-right">
          <div className="rock-group">
            <Image src="/Rock1.png" alt="Rock1" width={400} height={400} className="rock-img rock1" />
            <Image src="/Rock2.png" alt="Rock2" width={400} height={400} className="rock-img rock2" />
            <Image src="/Rock3.png" alt="Rock3" width={400} height={400} className="rock-img rock3" />
            <Image src="/Rock4.png" alt="Rock4" width={400} height={400} className="rock-img rock4" />
            <Image src="/Rock5.png" alt="Rock5" width={400} height={400} className="rock-img rock5" />
            <Image src="/Rock6.png" alt="Rock6" width={400} height={400} className="rock-img rock6" />
          </div>
        </div>
       
      </section>

      <div className="ai-seamless-background">
      {/* AI elevate your brands growth section */}
      <section className="ai-growth-section">
        <div className="ai-growth-content">
          <div className="ai-growth-left-col">
            <h2 className="ai-growth-title">AI elevate your brands growth</h2>
            <Lottie animationData={require('../../public/Ai.json')} style={{   }} loop autoplay />
            <p className="ai-growth-desc">One stop for all your E-commerce marketing solutions. Scale your brand with our digital & result driven marketing services. Ready to take your brand to the next level?</p>
            <Link href="/contact">
              <button className="fancy"><span className="top-key"></span><span className="text">Contact Us</span><span className="bottom-key-1"></span><span className="bottom-key-2"></span></button>
            </Link>
          </div>
          <div className="ai-growth-right-col">
            <div className="ai-growth-cards">
              <div className="ai-growth-card">
                <Image src="/chart.png" alt="Performance" width={36} height={36} className="ai-growth-card-icon" />
                <div className="ai-growth-card-title">Performance</div>
                <div className="ai-growth-card-desc">Get exponential growth with our marketing strategies.</div>
                
              </div>
              <div className="ai-growth-card">
                <Image src="/people.png" alt="Retention" width={36} height={36} className="ai-growth-card-icon" />
                <div className="ai-growth-card-title">Retention</div>
                <div className="ai-growth-card-desc">Let us help you retarget your customer base.</div>
                
              </div>
              <div className="ai-growth-card">
                <Image src="/shoppingcart.png" alt="Marketplaces" width={36} height={36} className="ai-growth-card-icon" />
                <div className="ai-growth-card-title">Marketplaces</div>
                <div className="ai-growth-card-desc">Get more visibility, more customers, and more sales.</div>
                
              </div>
              <div className="ai-growth-card">
                <Image src="/arrowsquare.png" alt="Other Services" width={36} height={36} className="ai-growth-card-icon" />
                <div className="ai-growth-card-title">Other Services</div>
                <div className="ai-growth-card-desc">Besides marketing, we do a lot more.</div>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Automation & Integration Section */}
      <section className="ai-integration-section">
        <div className="ai-integration-card">
          <div className="ai-integration-left">
            <h2 className="ai-integration-title">Ai Automation & Integration</h2>
            <p className="ai-integration-desc">Ever since implementing Wonderchat on our site, I've seen up to a 70% reduction of customer support queries in my inbox."</p>
            <div className="ai-integration-user">
              <img src="/Security.jpg" alt="Bryce Conway" className="ai-integration-avatar" />
              <div>
                <div className="ai-integration-user-name">Divyanshu</div>
                <div className="ai-integration-user-role">Founder of Maydiv</div>
              </div>
            </div>
          </div>
          <div className="ai-integration-right">
            <Lottie animationData={require('../../public/Robot1.json')} style={{ width: 340, height: 340, maxWidth: '100%', margin: '0 auto' }} loop autoplay />
          </div>
        </div>
      </section>

      {/* AI Multiverse Section */}
      <section className="ai-multiverse-row">
        <div className="ai-multiverse-row-content">
          <div className="ai-multiverse-row-lottie">
            <Lottie animationData={require('../../public/Multiverse.json')} style={{ width: 420, height: 220, marginBottom: '1.2rem' }} loop autoplay />
          </div>
          <div className="ai-multiverse-row-text">
            <h3 className="ai-multiverse-heading"><span className="gradient-text">AI Multiverse</span></h3>
            <div className="ai-multiverse-subheading">Optimized Reach</div>
            <p className="ai-multiverse-desc">It's all about getting your message in front of the right audience and creating those valuable <span className="ai-multiverse-link">relationships</span>.<br/>Learn More about how DOML can help you do just that - all with a simple, easy-to-use platform.</p>
            <img src="/Frame 14.png" alt="divider" className="ai-multiverse-divider-img" />

          </div>
        </div>
      </section>

      {/* AI Marketing Section (flipped) */}
      <section className="ai-multiverse-row">
        <div className="ai-multiverse-row-content ai-multiverse-row-flip">
          <div className="ai-multiverse-row-lottie">
            <Lottie animationData={require('../../public/Marketing.json')} style={{ width: 440, height: 240, marginBottom: '1.2rem', transform: 'scaleX(-1)' }} loop autoplay />
          </div>
          <div className="ai-multiverse-row-text">
            <h3 className="ai-multiverse-heading"><span className="gradient-text">AI Marketing</span></h3>
            <div className="ai-multiverse-subheading">Optimized Reach</div>
            <p className="ai-multiverse-desc">DOML is a digital media agency powered by AI technology providing real time, <span className="ai-multiverse-link">data-driven insights</span> on your business and audience. The mission of DOML is to create the best experiences for companies through intelligent insights, powerful analytics and <span className="ai-multiverse-link">strategic execution</span>.</p>
            <img src="/Frame 14.png" alt="divider" className="ai-multiverse-divider-img" />

          </div>
        </div>
      </section>

      {/* Our Projects Section removed as per request */}
      <Testimonial />
      <section className="ai-get-section ai-gradient-cta-section">
        <div className="ai-gradient-cta-content">
          <div className="ai-gradient-cta-left">
            <img src="/Get.png" alt="Swirl" className="ai-gradient-cta-img" />
          </div>
          <div className="ai-gradient-cta-right">
            <h2 className="ai-gradient-cta-heading">Get exponential reach via <span>AI Technology</span></h2>
            <form className="ai-gradient-cta-form" onSubmit={e => e.preventDefault()}>
              <input type="email" className="ai-gradient-cta-input" placeholder="Enter your work email" required />
              <button type="submit" className="fancy"><span className="top-key"></span><span className="text">Get in touch </span><span className="bottom-key-1"></span><span className="bottom-key-2"></span></button>
            </form>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
};

export default AI;

