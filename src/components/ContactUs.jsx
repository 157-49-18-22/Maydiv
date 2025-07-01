'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaInstagram, FaFacebook, FaRocket, FaPhone, FaSync, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

import './ContactUs.css';
import Discuss from './Discuss';
import Footer from './Footer';

export default function ContactUs() {
  const [showPhone, setShowPhone] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 480 && !sessionStorage.getItem('contactPageMobileRefreshed')) {
      sessionStorage.setItem('contactPageMobileRefreshed', 'true');
      window.location.reload();
    }
  }, []);

  const handleFieldFocus = () => {
    if (!showPhone) setShowPhone(true);
  };
  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 350);
  };

  return (
    <>
      <nav className="header-nav">
        <div className="header-logo">
          <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} quality={100} unoptimized />
        </div>
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
        <div className="header-socials">
        <a href="https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.facebook.com/profile.php?id=615720000000000" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
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
                  Services <FaChevronDown style={{marginLeft: 8, fontSize: '1rem', transform: servicesOpen ? 'rotate(180deg)' : 'none'}} />
                </button>
                {servicesOpen && (
                  <ul className="mobile-services-dropdown">
                    <li><Link href="/web-development" onClick={() => setBurgerOpen(false)}><FaCode className="dropdown-icon" /> Web Development</Link></li>
                    <li><Link href="/services" onClick={() => setBurgerOpen(false)}><FaPalette className="dropdown-icon" /> UI/UX Design</Link></li>
                    <li><Link href="/marketing" onClick={() => setBurgerOpen(false)}><FaBullhorn className="dropdown-icon" /> Social Media and Marketing</Link></li>
                    <li><Link href="/app-development" onClick={() => setBurgerOpen(false)}><FaMobileAlt className="dropdown-icon" /> App Development</Link></li>
                    <li><Link href="/ai" onClick={() => setBurgerOpen(false)}><FaBrain className="dropdown-icon" /> Artificial Intelligence</Link></li>
                  </ul>
                )}
              </li>
              <li><Link href="/projects" onClick={() => setBurgerOpen(false)}>Projects</Link></li>
              <li><Link href="/contact" onClick={() => setBurgerOpen(false)}>Contact</Link></li>  
              <li><Link href="/about" onClick={() => setBurgerOpen(false)}>About Us</Link></li>
            </ul>
          </div>
        )}
      </nav>
      <div className="contactus-main">
        <div className="contactus-form-card">
          <h1 className="contactus-heading"><span className="wave-text">Get in Touch</span></h1>
          <form className="contactus-form-modern" action="https://formspree.io/f/xovwregw" method="POST">
            <div className="contactus-row">
              <div className="contactus-field">
                <label>Name</label>
                <input type="text" name="name" placeholder="" required />
              </div>
              <div className="contactus-field">
                <label>Phone</label>
                <input type="text" name="phone" placeholder="" />
              </div>
            </div>
            <div className="contactus-field">
              <label>Email</label>
              <input type="email" name="email" placeholder="" required />
            </div>
            <div className="contactus-field">
              <label>Message...</label>
              <textarea rows={2} name="message" placeholder="" required />
            </div>
            <button type="submit" className="contactus-submit-btn">SUBMIT</button>
          </form>
        </div>

        <div className="contactus-info-card">
          <h2 className="contactus-info-heading">Contact info</h2>
          <div className="contactus-info-list">
            <div className="contactus-info-item"><FaPhone /> 91+ 9220438999</div>
            <div className="contactus-info-item"><FaEnvelope /> operations@maydiv.com</div>
            <div className="contactus-info-item"><FaMapMarkerAlt /> SCO-105 Second floor world street, Faridabad , HR 121004</div>
          </div>
          <div className="contactus-info-socials">
          <a href="https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
          <img src="/MAYDIV.png" alt="MAYDIV" className="maydiv-watermark" />
        </div>
      </div>

      <img src="/star3.png" alt="star" className="contactus-star-img" />
      <Discuss />
      <Footer />
    </>
  );
}
