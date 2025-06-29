import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaTimes, FaGithub, FaInstagram, FaFacebook, FaRocket, FaPhone, FaSync, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain, FaChevronDown } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import './Apps.css';
import Testimonial from './Testimonial';
import Discuss from './Discuss';
import Footer from './Footer';
const LottiePlayer = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
  { ssr: false }
);

const webProjectImages = [
  { src: '/Webapp1.png', alt: 'Web App 1' },
  { src: '/Webapp2.png', alt: 'Web App 2' },
  { src: '/Webapp3.png', alt: 'Web App 3' },
  { src: '/Webapp4.png', alt: 'Web App 4' },
];

function WebProjectsCards() {
  const [rotated, setRotated] = useState([false, false, false, false]);

  const handleMouseEnter = idx => {
    setRotated(r => r.map((v, i) => (i === idx ? true : v)));
  };

  const handleAnimationEnd = idx => {
    setRotated(r => r.map((v, i) => (i === idx ? false : v)));
  };

  return (
    <div className="webprojects-cards-row">
      {webProjectImages.map((img, idx) => (
        <div
          key={img.src}
          className={`webprojects-card${rotated[idx] ? ' is-rotated' : ''}`}
          onMouseEnter={() => handleMouseEnter(idx)}
          onAnimationEnd={() => handleAnimationEnd(idx)}
        >
          <img src={img.src} alt={img.alt} className="webprojects-img" />
        </div>
      ))}
    </div>
  );
}

const Apps = () => {
  // Dropdown state and timeout
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDropdownOpen, setDrawerDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownTimeout = useRef(null);

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
    <>
      <header className="header-container">
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
                  <li><Link href="/real-projects"><span><FaCode className="dropdown-icon" /> Web Development</span></Link></li>
                  <li><Link href="/real-services"><span><FaPalette className="dropdown-icon" /> UI/UX Design</span></Link></li>
                  <li><Link href="/real-testimonials"><span><FaBullhorn className="dropdown-icon" /> Social Media and Marketing</span></Link></li>
                  <li><Link href="/real-apps"><span><FaMobileAlt className="dropdown-icon" /> App Development</span></Link></li>
                  <li><Link href="/real-ai"><span><FaBrain className="dropdown-icon" /> Artificial Intelligence</span></Link></li>
                </ul>
              </li>
              <li><Link href="/new">Projects</Link></li>
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
                    Services <FaChevronDown style={{ marginLeft: 8, transform: drawerDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>
                  <div className={`drawer-dropdown-list${drawerDropdownOpen ? ' open' : ''}`} style={{ display: drawerDropdownOpen ? 'flex' : 'none' }}>
                    <Link href="/real-projects" onClick={() => setDrawerOpen(false)}><span><FaCode className="dropdown-icon" /> Web Development</span></Link>
                    <Link href="/real-services" onClick={() => setDrawerOpen(false)}><span><FaPalette className="dropdown-icon" /> UI/UX Design</span></Link>
                    <Link href="/real-testimonials" onClick={() => setDrawerOpen(false)}><span><FaBullhorn className="dropdown-icon" /> Social Media and Marketing</span></Link>
                    <Link href="/real-apps" onClick={() => setDrawerOpen(false)}><span><FaMobileAlt className="dropdown-icon" /> App Development</span></Link>
                    <Link href="/real-ai" onClick={() => setDrawerOpen(false)}><span><FaBrain className="dropdown-icon" /> Artificial Intelligence</span></Link>
                  </div>
                </li>
                <li><Link href="/new" onClick={() => setDrawerOpen(false)}>Projects</Link></li>
                <li><Link href="/contact" onClick={() => setDrawerOpen(false)}>Contact</Link></li>
                <li><Link href="/about" onClick={() => setDrawerOpen(false)}>About Us</Link></li>
              </ul>
            </div>
          )}
          <div className="header-socials">
            <a href="https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
        </nav>
      </header>

      <div className="apps-container">
        <div className="apps-hero" style={{position:'relative',width:'100vw'}}>
          <div className="apps-hero-content" >
            <h1>Develop your<br /><span className="purple-text">Apps with Maydiv</span></h1>
            <p className="hero-subtitle">App Development Bringing Your Ideas to Life</p>
            <p className="hero-description">Innovate, Develop, Launch Your Vision with Our App Expertise</p>
            <div className="expertise-image">
              <div className="ios-box">
                <div className="ios-content">
                  <h2 className="gradient-title">ios app development</h2>
                  <div className="ios-description">
                    <p>Building apps specifically for iPhones,</p>
                    <p>iPads, and Apple Watch using Swift or</p>
                    <p>Objective-C. These apps offer the best</p>
                    <p>performance, user experience, and</p>
                    <p>access to device-specific features.</p>
                  </div>
                  <div className="logo-section">
                  <LottiePlayer
                      autoplay
                      loop
                      src="/Apple.json"
                      style={{ width: 240, height: 100, background: 'none',marginLeft:'-30%' }}
                    />
                    <span className="arrow">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{position:'absolute',top:'3%',right:'0%'}}>
            <Image src="/Half.png" alt="Android Devices" width={533} height={440} className="Android" />
            
          </div>

          <div className="ios-section">
            <div className="service-content">
              <div className="expertise-image">
                <span style={{position:'absolute',top:'20%',left:'20%'}}>
                <div className="ios-content1" style={{width:'499px'}}>
                  <h2 className="gradient-title">Android development</h2>
                  <div className="ios-description" style={{width:'499px',fontSize:'14px'}}>
                    <p>Developing apps for a vast range of</p>
                    <p>Android smartphones and tablets </p>
                    <p>using Kotlin or Java.This targets the</p>
                    <p>
                      largest mobile platform in the world.
                    </p>
                  </div>
                  <div style={{marginTop: '18px', marginLeft: '0px', width: '90px', height: '90px', display: 'flex', alignItems: 'center'}}>
                    <LottiePlayer
                      autoplay
                      loop
                      src="/Android.json"
                      style={{ width: '180px', height: '103px', background: 'none',marginLeft:'-30%' }}
                    />
                    <span className="arrow">→</span>
                  </div>
                </div>
                </span>
                <Image
                  src="/Apps2.png"
                  alt="App Development Expertise"
                  width={800}
                  height={400}
                  className="apps2-image"
                />
              </div>
              <div className="mobile-image-container">
                <Image
                  src="/Mobiles.png"
                  alt="Mobile Devices"
                  width={300}
                  height={300}
                  className="mobiles-image"
                />
              </div>
            </div>
            <div className="service-image">
              <Image
                src="/Multi.png"
                alt="iOS Devices"
                width={700}
                height={700}
                className="ios-devices"
              />
            </div>
          </div>

          {/* Trusted Partners Section - now separate */}
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

          {/* App Development Section (Figma style) */}
          <section className="appdev-section">
            <div className="appdev-row">
              <div className="appdev-illustration">
                <LottiePlayer
                  autoplay
                  loop
                  src="/Appdev.json"
                  style={{ maxWidth: '440px', width: '100vw', minHeight: '460px', height: '240px', marginRight: '300px' }}
                />
              </div>
              <div className="appdev-content">
                <h2 className="appdev-title gradient-title">App development</h2>
                <p className="appdev-desc">
                  Mobile app development services encompass a wide range of specialized solutions that help businesses and individuals create, deploy, and maintain mobile applications for various platforms.
                </p>
              </div>
            </div>
            <h3 className="tech-title gradient-title">Technology we use</h3>
            <div className="tech-cards-row">
              <div className="tech-card">
                <img src="/flutter.png" alt="Flutter" className="tech-logo" />

                <div className="tech-card-desc">Excellent performance (near-native), fast development cycles with "hot reload", beautiful and customizable UI with Material Design and Cupertino widgets.</div>
              </div>
              <div className="tech-card">
                <img src="/react.png" alt="React" className="tech-logo" />

                <div className="tech-card-desc">Large community, "learn once, write anywhere" philosophy, good performance, component-based architecture.</div>
              </div>
              <div className="tech-card">
                <img src="/swift.png" alt="Swift" className="tech-logo" />

                <div className="tech-card-desc">Apple's modern, powerful, and intuitive programming language for building apps across all Apple platforms: iOS, iPadOS, macOS, watchOS, tvOS.</div>
              </div>
            </div>
            <div className="tech-cards-row">
              <div className="tech-card">
                <img src="/java.png" alt="Java" className="tech-logo" />

                <div className="tech-card-desc">Popular for real-time applications, scalability, and using a single language across frontend and backend. Frameworks like Express.js.</div>
              </div>
              <div className="tech-card">
                <img src="/node.png" alt="Node" className="tech-logo" />

                <div className="tech-card-desc">Robust, scalable, widely used for server-side applications. Frameworks like Spring Boot.</div>
              </div>
              <div className="tech-card">
                <img src="/html.png" alt="HTML CSS JS" className="tech-logo1" />

                <div className="tech-card-desc">HTML: The structure and content of the web. CSS: The presentation and styling of HTML elements. JavaScript: The interactivity and dynamic behavior of a webpage.</div>
              </div>
            </div>
          </section>

          {/* Our Web Projects Section */}
          <section className="webprojects-section">
            <div className="nucleus-bg-extra1"></div>
            <div className="nucleus-bg-extra2"></div>
            <div className="nucleus-bg-extra3"></div>
            <div className="nucleus-bg-extra4"></div>
            <h2 className="webprojects-title gradient-title">Our Web Projects</h2>
            <WebProjectsCards />
          </section>

          <div className="android-section">
            <div className="service-content">



              <div className="mobile-image-container">

              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonial />
      <Discuss />
      <Footer />
    </>

  );
};

export default Apps;
 