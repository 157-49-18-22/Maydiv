'use client';

import React, { useRef, useEffect, useState } from 'react';
import { FaInstagram, FaFacebook, FaRocket, FaPhone, FaSync, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain, FaGithub, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import TrustedLogos from './TrustedLogos';
import './Header.css';
import MobileDrawer from './MobileDrawer';

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

const Header = () => {
  const howWeWorkRef = useRef(null);
  const statsRef = useRef(null);
  const [showCounters, setShowCounters] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeout = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDropdownOpen, setDrawerDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const isMobileDevice = () => typeof window !== 'undefined' && window.innerWidth <= 480;
    if (isMobileDevice() && !sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    }
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 350);
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
          {!isMobile && (
            <ul className="header-links">
              <li><Link href="/">Home</Link></li>
              <li className="dropdown"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
                onFocus={handleDropdownEnter}
                onBlur={handleDropdownLeave}
              >
                <span className="dropdown-toggle" style={{ marginBottom: '10px' }}>Services</span>
                <ul className="dropdown-menu" style={{
                  display: dropdownOpen ? 'flex' : 'none',
                  opacity: dropdownOpen ? 1 : 0,
                  pointerEvents: dropdownOpen ? 'auto' : 'none',
                  transform: dropdownOpen ? 'translateX(-43%) translateY(0) scale(1)' : 'translateX(-50%) translateY(10px) scale(0.95)'
                }}>
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

        <div className="header-hero">
          <h1>
            <span className="gradient-text">Interactive Digital Solutions</span><br />
            <span className="gradient-text1">Scalable AI.</span>
          </h1>
          <div className="header-buttons">
            <Link href="/ai"><button className="underline-btn">Get started</button></Link>
            <Link href="/projects"><button className="underline-btn1">Our Portfolio</button></Link>
          </div>
          <div className="header-hero-robot-group" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '0 auto' }}>
            <Image src="/Animation.png" alt="Animation" width={1205} height={419} className="header-animation-img" />
          </div>

          <div className="header-stats-section" ref={statsRef}>
            <div className="header-stat">
              <span className="stat-number gradient-text">{showCounters ? <Counter start={40} end={150} duration={2000} /> : 40}+</span>
              <span className="stat-label">Success Project</span>
            </div>
            <div className="header-stat">
              <span className="stat-number gradient-text">{showCounters ? <Counter start={1} end={2} duration={2000} /> : 2}+</span>
              <span className="stat-label">Product Launched</span>
            </div>
            <div className="header-stat">
              <span className="stat-number gradient-text">{showCounters ? <Counter start={2} end={10} duration={2000} /> : 10}+</span>
              <span className="stat-label">Startup Raised</span>
            </div>
          </div>

          

          <div className="how-we-work-section">
            <div className="how-we-work-heading gradient-text2">HOW WE WORK</div>
            <div className="how-we-work-content">
              <div className="how-we-work-left">
                <h2>Get navi dedicated UX design service at fraction of the cost.</h2>
              </div>
              <div className="how-we-work-right">
                <p>Grow your brand with high-quality UI/UX design for a minimal fee. Work with senior designers. Contact and make as many requests as you need – no limits.</p>
                <Link href="/contact"><button className="how-we-work-btn"><span>Contact Us</span></button></Link>
              </div>
            </div>
          </div>

          <div className="how-we-work-steps" ref={howWeWorkRef}>
            <div className="step">
              <div className="step-icon"><Image src="/Shuttle.png" alt="Vector" width={50} height={50} /></div>
              <div className="step-title">AI & get started</div>
              <div className="step-desc">Submit as many design tasks as you need without worrying about individual project fees.</div>
            </div>
            <img src="/Arrow.png" alt="Arrow" className="step-img-arrow-1" />
            <div className="step1">
              <div className="step-icon"><Image src="/Vector.png" alt="Vector" width={50} height={50} /></div>
              <div className="step-title">Polished designs</div>
              <div className="step-desc">Our designers get to work to deliver your request. Receive your design within a few days.</div>
            </div>
            <img src="/Arrow.png" alt="Arrow" className="step-img-arrow-2" />
            <div className="step2">
              <div className="step-icon"><FaSync /></div>
              <div className="step-title">Revisions made simple</div>
              <div className="step-desc">Custom designs, prompt replies and as many revisions as you need.</div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
