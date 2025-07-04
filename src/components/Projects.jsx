'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaFacebook, FaRocket, FaPhone, FaSync, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import './Projects.css';
import Testimonial from './Testimonial';
import Discuss from './Discuss';
import Footer from './Footer';

const Projects = () => {
  const [showScreen, setShowScreen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const nextgenRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDropdownOpen, setDrawerDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownTimeout = useRef(null);

 
  useEffect(() => {
    return () => {
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
      const next = document.getElementById('__next');
      if (next) next.style.overflowX = 'hidden';
      window.location.reload(); // Force full page reload on unmount
    };
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowScreen(true);
          setTimeout(() => setAnimate(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (nextgenRef.current) {
      observer.observe(nextgenRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cleanup nav/drawer/dropdown state on unmount
  useEffect(() => {
    return () => {
      setDrawerOpen(false);
      setDrawerDropdownOpen(false);
    };
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
    <div className="services-container">
      {/* Hero Section */}
      <nav className="header-nav">
        <div className="header-logo">
          <Link href="/">
          <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} quality={100} unoptimized/>
          </Link>
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
              <ul className="dropdown-menu" style={{display: dropdownOpen ? 'flex' : 'none', opacity: dropdownOpen ? 1 : 0, pointerEvents: dropdownOpen ? 'auto' : 'none', transform: dropdownOpen ? 'translateX(-43%) translateY(0) scale(1)' : 'translateX(-50%) translateY(10px) scale(0.95)'}}>
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
                <button className={`drawer-dropdown${drawerDropdownOpen ? ' open' : ''}`} onClick={handleDrawerDropdownToggle}>
                  Services <FaChevronDown style={{ marginRight: 25, transform: drawerDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
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

      {/* Hero Section */}
      <section className="projects-hero-section">
        <div className="projects-hero-text-wrap">
          <div className="projects-hero-glow"></div>
          <div className="projects-hero-badge">Latest integration just arrived</div>
          <h1 className="projects-hero-heading">Develop your <br />Websites with Maydiv</h1>
          <div className="projects-hero-subheading">
            Elevate your site's visibility effortlessly with Maydiv, <br />where smart technology meets user-friendly SEO tools.
          </div>
          <Link href="/contact">
          <button className="projects-hero-btn">Contact Us</button>
          </Link>
        </div>
      </section>

      {/* Project Image Section */}
      <div className="projects-hero-image-wrap">
        <Image src="/Project.png" alt="Project Dashboard" width={900} height={420} className="projects-hero-image" quality={100} unoptimized />
        <div className="projects-hero-image-fade"></div>
      </div>
      <div className="projects-partners-section">
        <div className="projects-partners-heading">
          Trusted by the world's most innovative teams
        </div>
        <div className="projects-partners-grid">
          <div className="projects-partner-card"><img src="/Acme.png" alt="Acme Corp" className="partner-logo" /></div>
          <div className="projects-partner-card"><img src="/Echo.png" alt="Echo Valley" className="partner-logo" /></div>
          <div className="projects-partner-card"><img src="/Quantum.png" alt="Quantum" className="partner-logo" /></div>
          <div className="projects-partner-card"><img src="/Pulse.png" alt="Pulse" className="partner-logo" /></div>
          <div className="projects-partner-card"><img src="/Outside.png" alt="Outside" className="partner-logo" /></div>
          <div className="projects-partner-card"><img src="/Apex.png" alt="Apex" className="partner-logo" /></div>
          <div className="projects-partner-card"><img src="/Celestial.png" alt="Celestial" className="partner-logo" /></div>
          <div className="projects-partner-card"><img src="/Twice.png" alt="2TWICE" className="partner-logo" /></div>
        </div>
      </div>

      {/* New About/Showcase Section */}
      <section className="projects-nextgen-section">
        <div className="nextgen-content">
          <div className="nextgen-text">
            <h2>Next Generation<br />Web Development</h2>
            <p>
              Experience the thrill of fully immersive virtual environments that transport you to captivating worlds.
            </p>
            <button className="nextgen-btn">Get it Now</button>
          </div>
          <div className="nextgen-images" ref={nextgenRef}>
            {showScreen && (
              <img
                src="/Screen.png"
                alt="Screen"
                className={`nextgen-screen${animate ? ' animate' : ''}`}
              />
            )}
            <img
              src="/Girl.png"
              alt="Girl"
              className={`nextgen-girl${animate ? ' animate' : ''}`}
            />
          </div>
        </div>
      </section>

      {/* New Online Presence Section */}
      <section className="projects-online-section">
        <div className="online-content">
          <div className="online-image-wrap">
            <img src="/Man.png" alt="Man working" className="online-image" />
          </div>
          <div className="online-text">
            <h2>Build an online presence<br />for your business</h2>
            <p>On a mission to empower <b>D2C brands</b>, to make them a unicorn with phenomenal performance marketing strategies.</p>
            <div className="online-avatars-row">
              <div className="online-avatars">
                <img src="/Girl1.png" alt="Girl 1" />
                <img src="/Girl2.png" alt="Girl 2" />
                <img src="/Girl3.png" alt="Girl 3" />
                <img src="/Girl4.png" alt="Girl 4" />
              </div>
              <div className="online-separator"></div>
              <button className="online-btn">Contact Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* Maydiv web Development Services Section */}
      <section className="services-section">
        <div className="services-content">
          <div className="services-left">
            <h2>Maydiv web<br />Development Services</h2>
            <p>
            Crafting digital experiences that connect and convert
            </p>
          </div>
          <div className="services-right">
            <div className="service-card">
              <img src="/Responsive.png" alt="Responsive Website" className="service-icon" />
              <div>
                <div className="service-title">Responsive Website</div>
                <div className="service-projects">80+ Project</div>
              </div>
              <span className="service-arrow">→</span>
            </div>
            <div className="service-card">
              <img src="/Modern.png" alt="Modern Design" className="service-icon" />
              <div>
                <div className="service-title">Modern Design</div>
                <div className="service-projects">76+ Project</div>
              </div>
              <span className="service-arrow">→</span>
            </div>
            <div className="service-card">
              <img src="/User1.png" alt="User Dashboard" className="service-icon" />
              <div>
                <div className="service-title">User Dashboard</div>
                <div className="service-projects">32+ Project</div>
              </div>
              <span className="service-arrow">→</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Web Projects Section */}
      <section className="projects-showcase-section">
        <h2 className="showcase-heading">Our Web Projects</h2>
        <div className="showcase-filters">
          <button className="active">All</button>
          <button>Agency Website</button>
          <button>Mobile App</button>
          <button>Health Website</button>
          <button>Educational Website</button>
        </div>
        <div className="showcase-grid">
          <div className="showcase-card">
            <img src="/Project 1.png" alt="Project 1" />
          </div>
          <div className="showcase-card">
            <img src="/2.png" alt="Project 2" />
          </div>
          <div className="showcase-card">
            <img src="/3.png" alt="Project 3" />
          </div>
          <div className="showcase-card">
            <img src="/4.png" alt="Project 4" />
          </div>
          <div className="showcase-card">
            <img src="/5.png" alt="Project 5" />
          </div>
          <div className="showcase-card1">
            <img src="/6.jpeg" alt="Project 6" />
          </div>
        </div>
        <div className="showcase-viewmore-wrap">
          <button className="showcase-viewmore-btn">View more</button>
        </div>
      </section>

      {/* Dummy cards below (optional, can remove if not needed) */}
      {/* <h1 className="projects-page-heading">Projects</h1>
      <div className="projects-page-list">
        <div className="projects-page-card">
          <div className="projects-page-card-title">Project Alpha</div>
          <div className="projects-page-card-desc">A dummy project description for Alpha.</div>
        </div>
        <div className="projects-page-card">
          <div className="projects-page-card-title">Project Beta</div>
          <div className="projects-page-card-desc">A dummy project description for Beta.</div>
        </div>
        <div className="projects-page-card">
          <div className="projects-page-card-title">Project Gamma</div>
          <div className="projects-page-card-desc">A dummy project description for Gamma.</div>
        </div>
      </div> */}
      <Testimonial />
      <br /> 
      <br /> 
      <Discuss />
      <Footer />
    </div>
  );
};

export default Projects;
