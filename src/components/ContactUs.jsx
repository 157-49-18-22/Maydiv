'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaInstagram, FaFacebook, FaRocket, FaPhone, FaSync, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';

import './ContactUs.css';
import Discuss from './Discuss';
import Footer from './Footer';
import MobileDrawer from './MobileDrawer';

export default function ContactUs() {
  const [showPhone, setShowPhone] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDropdownOpen, setDrawerDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const dropdownTimeout = useRef(null);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [focus, setFocus] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('contactReloaded')) {
      sessionStorage.setItem('contactReloaded', 'true');
      window.location.reload();
    }
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    // Navbar scroll effect
    const onScroll = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', onScroll);
    };
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
      <div className="contactus-main">
        <div className="contactus-top-section">
          <div className="contactus-form-card">
            <h1 className="contactus-heading"><span className="wave-text">Get in Touch</span></h1>
            <form className="contactus-form-modern" action="https://formspree.io/f/xovwregw" method="POST">
              <div className="contactus-row">
                <div className="contactus-field">
                  {!(focus === 'name' || form.name) && <label>Name</label>}
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocus('name')}
                    onBlur={() => setFocus('')}
                    required
                  />
                </div>
                <div className="contactus-field">
                  {!(focus === 'phone' || form.phone) && <label>Phone</label>}
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    onFocus={() => setFocus('phone')}
                    onBlur={() => setFocus('')}
                  />
                </div>
              </div>
              <div className="contactus-field">
                {!(focus === 'email' || form.email) && <label>Email</label>}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocus('email')}
                  onBlur={() => setFocus('')}
                  required
                />
              </div>
              <div className="contactus-field">
                {!(focus === 'message' || form.message) && <label>Message...</label>}
                <textarea
                  rows={2}
                  name="message"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocus('message')}
                  onBlur={() => setFocus('')}
                  required
                />
              </div>
              <button type="submit" className="contactus-submit-btn">SUBMIT</button>
            </form>
          </div>

          <div className="contactus-info-card">
            <h2 className="contactus-info-heading">Contact info</h2>
            <div className="contactus-info-list">
              <div className="contactus-info-item"><FiPhone className="contactus-info-icon1" /> 91+ 9220438999</div>
              <div className="contactus-info-item1"><FaEnvelope className="contactus-info-icon2" />  Operations@maydiv.com</div>
              <div className="contactus-info-item"><FaMapMarkerAlt className="contactus-info-icon" /> SCO-105 Second floor world street, Faridabad , HR 121004</div>
            </div>
            <div className="contactus-info-socials">
            <a href="https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://www.facebook.com/profile.php?id=615720000000000" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            </div>
            <img src="/MAYDIV.png" alt="MAYDIV" className="maydiv-watermark" />
          </div>
        </div>
        
        {/* Office Location Map */}
        <div className="contactus-map-card">
          <div className="map-decoration-top">
            <div className="map-decoration-dot"></div>
            <div className="map-decoration-dot"></div>
            <div className="map-decoration-dot"></div>
          </div>
          
          <h3 className="contactus-map-heading">📍 Our Office Location</h3>
          
          <div className="contactus-map-container">
            <div className="map-overlay-info">
              <div className="map-info-badge">
                <FaMapMarkerAlt />
                <span>MAYDIV HQ</span>
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121413!2d77.3193!3d28.4089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd8c2c0b0b0b%3A0x0!2zMjjCsDI0JzMyLjAiTiA3N8KwMTknMDkuNSJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MAYDIV Office Location"
            ></iframe>
          </div>
          
          <div className="contactus-map-actions">
            <a 
              href="https://maps.google.com/?q=SCO-105+Second+floor+world+street+Faridabad+HR+121004"
              target="_blank"
              rel="noopener noreferrer"
              className="contactus-map-btn"
            >
              <FaMapMarkerAlt /> Open in Google Maps
            </a>
            <a 
              href="https://maps.apple.com/?q=SCO-105+Second+floor+world+street+Faridabad+HR+121004"
              target="_blank"
              rel="noopener noreferrer"
              className="contactus-map-btn"
            >
              <FaMapMarkerAlt /> Open in Apple Maps
            </a>
          </div>
          
          <div className="map-decoration-bottom">
            <div className="map-decoration-line"></div>
            <div className="map-decoration-star">⭐</div>
            <div className="map-decoration-line"></div>
          </div>
        </div>
      </div>

      <img src="/star3.png" alt="star" className="contactus-star-img" />
      <Discuss />
      <Footer />
    </>
  );
}
