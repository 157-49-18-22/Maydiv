'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaChevronLeft, FaChevronRight, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { FaInstagram, FaFacebook, FaRocket, FaPhone, FaSync, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain } from 'react-icons/fa';
import "./Services.css";
import Testimonial from './Testimonial';
import Discuss from './Discuss';
import Footer from './Footer';
import MobileDrawer from './MobileDrawer';

const Services = () => {
  const [showBulb, setShowBulb] = useState(false);
  const [cloud1X, setCloud1X] = useState(0);
  const [cloud2X, setCloud2X] = useState(0);
  const [cloud3X, setCloud3X] = useState(0);
  const [pinkBallBounce, setPinkBallBounce] = useState(true);
  const [bounceCount, setBounceCount] = useState(0);
  const logosRowRef = React.useRef(null);
  const [highlightedIndex, setHighlightedIndex] = React.useState(2); // Start with the middle logo
  const logos = [
    { src: '/Moven.png', alt: 'Movenpick' },
    { src: '/Raz.png', alt: 'Raz Amwal' },
    { src: '/Rosegal.png', alt: 'Rosegal' },
    { src: '/Eyab.png', alt: 'Eyab' },
    { src: '/Council.png', alt: 'Council of Health Insurance' },
  ];

  // Dropdown state and timeout
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeout = useRef(null);
  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 350);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDropdownOpen, setDrawerDropdownOpen] = useState(false);

  const [isDesktop, setIsDesktop] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth > 900);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowBulb(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Animate clouds
  useEffect(() => {
    const interval = setInterval(() => {
      setCloud1X((prev) => (prev >= 60 ? 0 : prev + 0.25));
      setCloud2X((prev) => (prev >= 80 ? 0 : prev + 0.18));
      setCloud3X((prev) => (prev >= 100 ? 0 : prev + 0.12));
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!pinkBallBounce) return;
    if (bounceCount >= 3) {
      setPinkBallBounce(false);
      return;
    }
    const handle = setTimeout(() => {
      setBounceCount((prev) => prev + 1);
    }, 2200); // match animation duration
    return () => clearTimeout(handle);
  }, [bounceCount, pinkBallBounce]);

  const handleScrollLeft = () => {
    setHighlightedIndex((prev) => (prev - 1 + logos.length) % logos.length);
    logosRowRef.current && logosRowRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  };
  const handleScrollRight = () => {
    setHighlightedIndex((prev) => (prev + 1) % logos.length);
    logosRowRef.current && logosRowRef.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  // Mobile auto-reload logic
  useEffect(() => {
    return () => {
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
      const next = document.getElementById('__next');
      if (next) next.style.overflowX = 'hidden';
      window.location.reload(); // Force full page reload on unmount
    };
  }, []);

  // Cleanup nav/drawer/dropdown state on unmount
  useEffect(() => {
    return () => {
      setDrawerOpen(false);
      setDrawerDropdownOpen(false);
      setDropdownOpen(false);
    };
  }, []);

  // Cleanup and force page reload on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
      const next = document.getElementById('__next');
      if (next) next.style.overflowX = 'hidden';
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('servicesReloaded')) {
      sessionStorage.setItem('servicesReloaded', 'true');
      window.location.reload();
    }
  }, []);

  return (
    <div className="services-container">
      {/* Hero Section */}
      <nav className={`header-nav${navScrolled ? ' scrolled' : ''}`}>
        <div className="header-logo">
        <Link href="/">
          <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} quality={100} unoptimized/>
          </Link>
        </div>
        {/* Desktop nav links */}
        {isDesktop && (
          <ul className="header-links">
            <li><Link href="/">Home</Link></li>
            <li className="dropdown"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              onFocus={handleDropdownEnter}
              onBlur={handleDropdownLeave}
            >
              <span className="dropdown-toggle" style={{marginBottom: '10px'}}>Services</span>
              <ul className="dropdown-menu" style={{display: dropdownOpen ? 'flex' : 'none', opacity: dropdownOpen ? 1 : 0, pointerEvents: dropdownOpen ? 'auto' : 'none', transform: dropdownOpen ? 'translateX(-43%) translateY(0) scale(1)' : 'translateX(-50%) translateY(10px) scale(0.95)'}}>
                <Link href="/web-development" onClick={() => setDrawerOpen(false)}><span><FaCode className="dropdown-icon" /> Web Development</span></Link>
                <Link href="/apps/ui-ux" onClick={() => setDrawerOpen(false)}><span><FaPalette className="dropdown-icon" /> UI/UX Design</span></Link>
                <Link href="/marketing" onClick={() => setDrawerOpen(false)}><span><FaBullhorn className="dropdown-icon" /> Social Media and Marketing</span></Link>
                <Link href="/app-development" onClick={() => setDrawerOpen(false)}><span><FaMobileAlt className="dropdown-icon" /> App Development</span></Link>
                <Link href="/ai" onClick={() => setDrawerOpen(false)}><span><FaBrain className="dropdown-icon" /> Artificial Intelligence</span></Link>
              </ul>
            </li>
            <li><Link href="/projects"><span>Projects</span></Link></li>
            <li><Link href="/blog">Blog</Link></li>
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
          isMobile={!isDesktop}
        />
        <div className="header-socials">
        <a href="https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.facebook.com/profile.php?id=615720000000000" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
      </nav>
      {/* Hero Content Row */}
      <div className="hero-pattern-bg">
        <div className="services-hero-row">
          {/* Decorative Cloud Image 3 */}
          <div className="services-cloud-img3" style={{ transform: `translateX(${cloud3X}px)` }}>
            <Image src="/Image5.png" alt="Cloud3" width={170} height={70} />
          </div>
          {/* Decorative Cloud Image */}
          <div className="services-cloud-img" style={{ transform: `translateX(${cloud1X}px)` }}>
            <Image src="/Image3.png" alt="Cloud" width={170} height={170} />
          </div>
          {/* Decorative Bulb Image */}
          <div className={`services-bulb-img${showBulb ? ' glow' : ' hide'}`}>
            <Image src="/Image2.png" alt="Bulb" width={140} height={140} />
          </div>
          {/* Decorative Cloud Image 2 */}
          <div className="services-cloud-img2" style={{ transform: `translateX(${cloud2X}px)` }}>
            <Image src="/Image4.png" alt="Cloud2" width={170} height={90} />
          </div>
          {/* Decorative Pink Ball */}
          <div className={`services-pinkball-img${pinkBallBounce ? '' : ' no-bounce'}`}>
            <Image src="/Image6.png" alt="Pink Ball" width={70} height={70} />
          </div>
          <div className="services-intro-text">
            <h1>UI/UX Provide Smart Business Solutions</h1>
            <p>Grow your Business With Us Best Business Solutions</p>
          </div>
          <div className="services-hero-img">
            <Image src="/Image1.png" alt="Hero Visual" width={400} height={400} />
          </div>
        </div>
      </div>
      {/* Partners Section */}
      <div className="services-partners-section">
        <div className="partners-bg-wrap">
          <img src="/Brand.png" alt="Brand Background" className="partners-bg-img" />
          <div className="partners-row-flex">
            <div className="partners-main-text">
              <span className="partners-wave">~</span> We've More Then 254+ <br /> Global Partners
            </div>
            <div className="partners-desc">
            Trusted by over 254+ global partners shaping the digital future.
            </div>
          </div>
        </div>
        <div className="partners-logos-row-wrapper">
          <div className="partners-logos-topline"></div>
          
          
         
          <div className="partners-logos-row" ref={logosRowRef}>
            {logos.map((logo, idx) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className={idx === highlightedIndex ? 'highlighted-logo' : ''}
              />
            ))}
          </div>
         
        </div>
      </div>
      {/* Explore Section (new) */}
      <div className="explore-section">
        <div className="explore-img-col">
          <img src="/Explore1.png" alt="Explore Professional" className="explore-main-img" />
          <img src="/Explore2.png" alt="Explore Icons" className="explore-floating-icons" />
        </div>
        <div className="explore-content-col">
          <div className="explore-features-bg-wrap">
            <img src="/pseudo.png" alt="Pseudo Line" className="explore-features-pseudo-img" />
            <img src="/features.png" alt="Features Background" className="explore-features-bg-img" />
            <h2 className="explore-heading">Explore Our Professional Business Solutions</h2>
          </div>
          <div className="explore-cards-grid">
            <div className="explore-card">
              <img src="/Business.png" alt="Business Growth" className="explore-card-icon" />
              <div>
                <div className="explore-card-title">Business Growth</div>
                <div className="explore-card-desc">Accelerating your business growth with smart digital strategies</div>
              </div>
            </div>
            <div className="explore-card">
              <img src="/User.png" alt="User Research" className="explore-card-icon" />
              <div>
                <div className="explore-card-title">User Research</div>
                <div className="explore-card-desc">In-depth insights that shape user-centric solutions.</div>
              </div>
            </div>
            <div className="explore-card">
              <img src="/Big.png" alt="Big Data Solution" className="explore-card-icon" />
              <div>
                <div className="explore-card-title">Big Data Solution</div>
                <div className="explore-card-desc">Transforming complex data into clear business insights</div>
              </div>
            </div>
            <div className="explore-card">
              <img src="/Product.png" alt="Product Design" className="explore-card-icon" />
              <div>
                <div className="explore-card-title">Product Design</div>
                <div className="explore-card-desc">From idea to pixel-perfect product experiences.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About/Awards Section (new) */}
      <div className="about-section">
        <div className="about-content-col">
          <div className="about-heading-bg-wrap">
            <img src="/pseudo1.png" alt="Pseudo1 Line" className="about-heading-pseudo-img" />
            <img src="/Who.png" alt="Who Background" className="about-heading-bg-img" />
            <h2 className="about-heading">We're Awards Winning Modern Business Solutions Agency</h2>
          </div>
          <div className="about-desc">Award-winning modern business solutions for forward-thinking brands.</div>
          <div className="about-pills-row">
            <span className="about-pill">Tech Solutions</span>
            <span className="about-pill">IT Consulting</span>
            <span className="about-pill">Web Solutions</span>
            <span className="about-pill">Business Growth</span>
            <span className="about-pill">Product Design</span>
          </div>
        </div>
        <div className="about-img-col">
          <img src="/about-1.png" alt="About Agency" className="about-main-img" />
        </div>
      </div>
      {/* Features Section (new) */}
      <div className="features-section">
        <div className="features-heading-wrap">
          <span className="features-bg-text">SERVICES</span>
          <img src="/pseudo1.png" alt="Wave" className="features-heading-wave" />
          <h2 className="features-heading">Great Features To Do Your Business Growth & Development</h2>
        </div>
        <div className="features-content-row">
          <div className="features-chart-col">
            <img src="/Graph.png" alt="Graph Illustration" className="features-graph-img" />
          </div>
          <div className="features-cards-col">
            <div className="features-card">
              <img src="/Graphics.png" alt="Graphics Design" className="features-card-icon" />
              <div>
                <div className="features-card-title">Graphics Design</div>
                <div className="features-card-desc">Creating visual stories that elevate your brand</div>
              </div>
              <span className="features-card-arrow">→</span>
            </div>
            <div className="features-card">
              <img src="/Idea.png" alt="Ideation & Evaluation" className="features-card-icon" />
              <div>
                <div className="features-card-title">Ideation & Evaluation</div>
                <div className="features-card-desc">Turning bold ideas into tested, user-validated solutions.</div>
              </div>
              <span className="features-card-arrow">→</span>
            </div>
            <div className="features-card">
              <img src="/Brand1.png" alt="Brand Identity" className="features-card-icon" />
              <div>
                <div className="features-card-title">Brand Identity</div>
                <div className="features-card-desc">Crafting unique identities that resonate and inspire</div>
              </div>
              <span className="features-card-arrow">→</span>
            </div>
            <div className="features-card">
              <img src="/Costume.png" alt="Custome Service" className="features-card-icon" />
              <div>
                <div className="features-card-title">Custome Service</div>
                <div className="features-card-desc">Delivering support that's fast, friendly, and always on.</div>
              </div>
              <span className="features-card-arrow">→</span>
            </div>
            <div className="features-card">
              <img src="/Web1.png" alt="Web Strategy" className="features-card-icon" />
              <div>
                <div className="features-card-title">Web Strategy</div>
                <div className="features-card-desc">Aligning digital vision with measurable business goals.</div>
              </div>
              <span className="features-card-arrow">→</span>
            </div>
          </div>
        </div>
      </div>
      {/* UI/UX Projects Section (new) */}
      <div className="projects-section">
        <div className="projects-header-row">
          <h2 className="projects-heading">UI/UX Projects</h2>
         
        </div>
        <div className="projects-cards-grid">
          <div className="project-card">
            <img src="/Project 1.png" alt="VPN Mobile App Design" className="project-card-img" />
          
          </div>
          <div className="project-card">
            <img src="/2.png" alt="Streaming App Design" className="project-card-img" />
        
          </div>
          <div className="project-card">
            <img src="/3.png" alt="Creative Digital Agency" className="project-card-img" />
          
          </div>
          <div className="project-card">
            <img src="/4.png" alt="Podcast Mobile App" className="project-card-img" />
          
          </div>
          <div className="project-card">
            <img src="/5.png" alt="Multimedia Design Platform" className="project-card-img" />
          
          </div>
          <div className="project-card">
            <img src="/6.jpeg" alt="Parking Mobile App" className="project-card-img" />
           
          </div>
        </div>
      </div>
      {/* Features Section (new) */}
      <Testimonial />
      <Discuss />
      <Footer />
    </div>
  );

};

export default Services;
