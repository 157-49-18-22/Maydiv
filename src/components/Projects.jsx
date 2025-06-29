'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { FaInstagram, FaFacebook, FaRocket, FaPhone, FaSync, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain, FaBars, FaTimes } from 'react-icons/fa';
import './Projects.css';
import Testimonial from './Testimonial';
import Discuss from './Discuss';
import Footer from './Footer';

const Projects = () => {
  const [showScreen, setShowScreen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const nextgenRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownTimeout = useRef(null);

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


  // Cleanup nav/drawer/dropdown state on unmount
  useEffect(() => {
    return () => {
      setBurgerOpen(false);
      setServicesOpen(false);
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
      window.location.reload(); // Force full page reload on unmount
    };
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 350);
  };

  return (
    <div className="services-container">
      {/* Hero Section */}
      <nav className="header-nav">
        <div className="header-logo">
          <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} />
        </div>
        <ul className="header-links">
        <li><Link href="/">Home</Link></li>
            <li className="dropdown"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
                onFocus={handleDropdownEnter}
                onBlur={handleDropdownLeave}
            >
              <span className="dropdown-toggle" style={{marginBottom: '10px'}}>Services</span>
              <ul className="dropdown-menu" style={{display: dropdownOpen ? 'flex' : 'none', opacity: dropdownOpen ? 1 : 0, pointerEvents: dropdownOpen ? 'auto' : 'none', transform: dropdownOpen ? 'translateX(-50%) translateY(0) scale(1)' : 'translateX(-50%) translateY(10px) scale(0.95)'}}>
                <li><Link href="/real-projects"><span><FaCode className="dropdown-icon" /> Web Development</span></Link></li>
                <li><Link href="/real-services"><span><FaPalette className="dropdown-icon" /> UI/UX Design</span></Link></li>
                <li><Link href="/real-testimonials"><span><FaBullhorn className="dropdown-icon" /> Social Media and Marketing</span></Link></li>
                <li><Link href="/real-apps"><span><FaMobileAlt className="dropdown-icon" /> App Development</span></Link></li>
                <li><Link href="/real-ai"><span><FaBrain className="dropdown-icon" /> Artificial Intelligence</span></Link></li>
              </ul>
            </li>
            <li><Link href="/new"><span>Projects</span></Link></li>
            <li><Link href="/contact"><span>Contact</span></Link></li>
            <li><Link href="/about"><span>About Us</span></Link></li>
          </ul>
        <div className="header-socials">
        <a href="https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        </div>
        {/* Burger menu for mobile */}
        <button className="burger-menu" onClick={() => setBurgerOpen(true)} aria-label="Open menu">
          <FaBars />
        </button>
        {/* Side drawer for mobile nav */}
        {burgerOpen && (
          <div className="mobile-drawer">
            <button className="close-drawer" onClick={() => setBurgerOpen(false)} aria-label="Close menu"><FaTimes /></button>
            <ul className="mobile-links">
              <li><Link href="/" onClick={() => setBurgerOpen(false)}>Home</Link></li>
              <li>
                <button className="mobile-services-toggle" onClick={() => setServicesOpen((v) => !v)}>
                  Services {servicesOpen ? '▲' : '▼'}
                </button>
                {servicesOpen && (
                  <ul className="mobile-services-dropdown">
                    <li><Link href="/real-projects" onClick={() => setBurgerOpen(false)}>Web Development</Link></li>
                    <li><Link href="/real-services" onClick={() => setBurgerOpen(false)}>UI/UX Design</Link></li>
                    <li><Link href="/real-testimonials" onClick={() => setBurgerOpen(false)}>Social Media and Marketing</Link></li>
                    <li><Link href="/real-apps" onClick={() => setBurgerOpen(false)}>App Development</Link></li>
                    <li><Link href="/real-ai" onClick={() => setBurgerOpen(false)}>Artificial Intelligence</Link></li>
                  </ul>
                )}
              </li>
              <li><Link href="/new" onClick={() => setBurgerOpen(false)}>Projects</Link></li>
              <li><Link href="/contact" onClick={() => setBurgerOpen(false)}>Contact</Link></li>
              <li><Link href="/about" onClick={() => setBurgerOpen(false)}>About Us</Link></li>
            </ul>
          </div>
        )}
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
            <img src="/Our1.png" alt="Project 1" />
          </div>
          <div className="showcase-card">
            <img src="/Our2.png" alt="Project 2" />
          </div>
          <div className="showcase-card">
            <img src="/Our3.png" alt="Project 3" />
          </div>
          <div className="showcase-card">
            <img src="/Our4.png" alt="Project 4" />
          </div>
          <div className="showcase-card">
            <img src="/Our5.png" alt="Project 5" />
          </div>
          <div className="showcase-card">
            <img src="/Our6.png" alt="Project 6" />
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
      <Discuss />
      <Footer />
    </div>
  );
};

export default Projects;
