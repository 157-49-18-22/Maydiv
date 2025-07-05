'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';



import { FaBars, FaTimes, FaGithub, FaInstagram, FaFacebook, FaRocket, FaPhone, FaSync, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain, FaChevronDown } from 'react-icons/fa';
import './Testimonials.css';
import Testimonial from './Testimonial';
import Discuss from './Discuss';
import Footer from './Footer';
import CountUp from 'react-countup';
import MobileDrawer from './MobileDrawer';


const Testimonials = () => {
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

  // Cleanup overflow-x on unmount and force page reload
  useEffect(() => {
    return () => {
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
      const next = document.getElementById('__next');
      if (next) next.style.overflowX = 'hidden';
      window.location.reload(); // Force full page reload on unmount
    };
  }, []);

  return (
    <>
      <header className="header-container">

        <nav className="header-nav">
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
                <span className="dropdown-toggle" style={{ marginBottom: '10px' }}>Services</span>
                <ul className="dropdown-menu" style={{ display: dropdownOpen ? 'flex' : 'none', opacity: dropdownOpen ? 1 : 0, pointerEvents: dropdownOpen ? 'auto' : 'none', transform: dropdownOpen ? 'translateX(-43%) translateY(0) scale(1)' : 'translateX(-50%) translateY(10px) scale(0.95)' }}>
                  <Link href="/web-development" onClick={() => setDrawerOpen(false)}><span><FaCode className="dropdown-icon" /> Web Development</span></Link>
                  <Link href="/apps/ui-ux" onClick={() => setDrawerOpen(false)}><span><FaPalette className="dropdown-icon" /> UI/UX Design</span></Link>                  
                  <Link href="/marketing" onClick={() => setDrawerOpen(false)}><span><FaBullhorn className="dropdown-icon" /> Social Media and Marketing</span></Link>
                  <Link href="/app-development" onClick={() => setDrawerOpen(false)}><span><FaMobileAlt className="dropdown-icon" /> App Development</span></Link>
                  <Link href="/ai" onClick={() => setDrawerOpen(false)}><span><FaBrain className="dropdown-icon" /> Artificial Intelligence</span></Link>
                </ul>
              </li>
              <li><Link href="/projects"><span>Projects</span></Link></li>
              <li><Link href="/contact"><span>Contact</span></Link></li>
              <li><Link href="/about">About Us</Link></li>
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

      <section className="marketing-hero-section">
        <div className="marketing-hero-graphic-star">
          <img src="/Star.png" alt="Decorative Star" />
        </div>
        <div className="marketing-hero-graphic-star1">
          <img src="/Star1.png" alt="Decorative Star1" />
        </div>
        <div className="marketing-hero-graphic-t2">
          <img src="/T2.png" alt="Decorative T2" />
        </div>
        <div className="marketing-hero-left">
          <div className="marketing-hero-graphic-t1">
            <img src="/T1.png" alt="Decorative T1" />
          </div>
          <h1 className="marketing-hero-heading">
            We make<br />
            <span className="highlight-marketing">Marketing</span> things<br />
            everyday
          </h1>
          <div className="marketing-hero-projects">

            <div className="marketing-hero-projects-label">Projects completed</div>
          </div>
          <button className="marketing-hero-btn">Let's Work Together</button>
        </div>
        <div className="marketing-hero-right">
          <div className="marketing-hero-user">
            {/* User image placeholder */}

          </div>

        </div>
        <div className="marketing-hero-graphic-t5">
          <img src="/T5.png" alt="Decorative T5" />
        </div>
        <div className="marketing-hero-graphic-t4">
          <img src="/T4.png" alt="Decorative T4" />
        </div>
        <p className="marketing-hero-tagline">Driving Your Business Forward,</p>
        <p className="marketing-hero-tagline1">With Strong Products Marketing</p>
        <div className="marketing-hero-graphic-t3">
          <img src="/T3.png" alt="Decorative T3" />
          <img src="/950.png" alt="Overlay image" className="marketing-hero-graphic-950" />

        </div>
      </section>
      <section className="featured-in-section">
        <h2 className="featured-in-title">Featured in</h2>
        <div className="featured-in-logos">
          <div className="featured-in-logo-card"><img src="/Asus.png" alt="ASUS" /></div>
          <div className="featured-in-logo-card"><img src="/Alli.png" alt="Allianz" /></div>
          <div className="featured-in-logo-card"><img src="/Chase.png" alt="Chase" /></div>
          <div className="featured-in-logo-card"><img src="/New-york-times.png" alt="The New York Times" /></div>
          <div className="featured-in-logo-card"><img src="/Linkedin.png" alt="LinkedIn" /></div>
        </div>
      </section>
      <section className="expertise-section">
        <div className="expertise-grid">
          <div className="expertise-row expertise-row-top">
            <div className="expertise-card">
              <div className="expertise-icon"><img src="/Search.png" alt="Search Engine Optimization" /></div>
              <div className="expertise-title">Search Engine Optimization</div>
            </div>
            <div className="expertise-card">
              <div className="expertise-icon"><img src="/Website.png" alt="Website design & Development" /></div>
              <div className="expertise-title">Website design & Development</div>
            </div>
            <div className="expertise-info">
              <h2>Our Digital<br />Marketing Expertise</h2>
              <p>We don't just market, we connect. Our digital marketing expertise helps businesses build strong online identities, engage the right audiences, and turn attention into action — consistently and effectively.</p>
            </div>
          </div>
          <div className="expertise-row">
            <div className="expertise-card">
              <div className="expertise-icon"><img src="/Video.png" alt="Video editing & Production" /></div>
              <div className="expertise-title">Video editing & Production</div>
            </div>
            <div className="expertise-card">
              <div className="expertise-icon"><img src="/Content.png" alt="Content Writing" /></div>
              <div className="expertise-title">Content Writing</div>
            </div>
            <div className="expertise-card">
              <div className="expertise-icon"><img src="/Social1.png" alt="Social media Marketing" /></div>
              <div className="expertise-title">Social media Marketing</div>
            </div>
            <div className="expertise-card">
              <div className="expertise-icon"><img src="/Pay.png" alt="Pay per click (PPC)" /></div>
              <div className="expertise-title">Pay per click (PPC)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-maydiv-section">
        <div className="why-maydiv-grid">
          <div className="why-maydiv-left">
            <img className="why-maydiv-bg" src="/Background.png" alt="Background" />
            <img className="why-maydiv-person" src="/Man1.png" alt="Person" />
            <img className="why-maydiv-revenue-img" src="/Revenue.png" alt="Revenue" />
          </div>
          <div className="why-maydiv-right">
            <div className="why-maydiv-customers">
              <span className="customers-label">Our Customers</span>
              <div className="customers-avatars-row">
                <img className="customer-avatar" src="/Pic1.png" alt="Customer 1" />
                <img className="customer-avatar" src="/Pic2.png" alt="Customer 2" />
                <img className="customer-avatar" src="/Pic3.png" alt="Customer 3" />
                <img className="customer-avatar" src="/Pic4.png" alt="Customer 4" />
                <span className="customers-count">+25K</span>
              </div>
            </div>
            <h2 className="why-maydiv-heading">Why should you choose Maydiv</h2>
            <p className="why-maydiv-desc">At Maydiv, we blend creativity with strategy to deliver marketing that works. We don't just follow trends — we craft solutions that drive real results..</p>
            <Link href="/contact">
              <button className="why-maydiv-btn">Contact Us</button>
            </Link>
          </div>
        </div>
      </section>
      <section className="header-stats-section">
        <div className="header-stats-grid">
          <div className="header-stat">
            <div className="header-stat-number"><CountUp end={120} duration={2} />+</div>
            <div className="header-stat-label">Success Project</div>
          </div>
          <div className="header-stat-separator"></div>
          <div className="header-stat">
            <div className="header-stat-number"><CountUp end={2} duration={2} />+</div>
            <div className="header-stat-label">Years Experience</div>
          </div>
          <div className="header-stat-separator"></div>
          <div className="header-stat">
            <div className="header-stat-number"><CountUp end={2} duration={2} />+</div>
            <div className="header-stat-label">Products Launched</div>
          </div>
          <div className="header-stat-separator"></div>
          <div className="header-stat">
            <div className="header-stat-number"><CountUp end={10} duration={2} />+</div>
            <div className="header-stat-label">Startups Raised</div>
          </div>
        </div>
      </section>
      {/* Features Section (new) */}
      <Testimonial />
      <Discuss />
      <Footer />

    </>
  );
};

export default Testimonials;
