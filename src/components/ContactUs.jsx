'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaInstagram, FaFacebook, FaRocket, FaPhone, FaSync, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain } from 'react-icons/fa';

import './ContactUs.css';
import Discuss from './Discuss';
import Footer from './Footer';

export default function ContactUs() {
  const [showPhone, setShowPhone] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeout = useRef(null);
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
          </ul>
        <div className="header-socials">
          <a href="#" aria-label="GitHub"><FaGithub /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
        </div>
      </nav>
      <div className="contactus-main">
        <div className="contactus-form-card">
          <h1 className="contactus-heading"><span className="wave-text">Get in Touch</span></h1>
          <form className="contactus-form-modern">
            <div className="contactus-row">
              <div className="contactus-field">
                <label>Name</label>
                <input type="text" placeholder="" />
              </div>
              <div className="contactus-field">
                <label>Phone</label>
                <input type="text" placeholder="" />
              </div>
            </div>
            <div className="contactus-field">
              <label>Email</label>
              <input type="email" placeholder="" />
            </div>
            <div className="contactus-field">
              <label>Message...</label>
              <textarea rows={2} placeholder="" />
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
