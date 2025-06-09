'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import Footer from './Footer';
import './ContactUs.css';

export default function ContactUs() {
  const [showPhone, setShowPhone] = useState(false);
  const handleFieldFocus = () => {
    if (!showPhone) setShowPhone(true);
  };

  return (
    <>
     <header className="header-container">
      {/* Hero Section */}
      <nav className="header-nav">
        <div className="header-logo">
          <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} />
        </div>
        <ul className="header-links">
          <li><Link href="/">Home</Link></li>
          <li className="dropdown">
            <span className="dropdown-toggle">Services</span>
            <ul className="dropdown-menu">
              <li><Link href="/real-projects">Web Development</Link></li>
              <li><Link href="/real-services">UI/UX Design</Link></li>
              <li><Link href="/real-testimonials">Social Media and Marketing</Link></li>
              <li><Link href="/real-apps">App Development</Link></li>
              <li><Link href="/real-ai">AI</Link></li>
            </ul>
          </li>
          <li><Link href="/projects">Projects</Link></li>
      
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className="header-socials">
          <a href="#" aria-label="GitHub"><FaGithub /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
        </div>
      </nav>
    </header>
      <div className="contactus-bg">
        <div className="contactus-form-wrap">
          {/* Left: Image */}
          <div className="contactus-img-col">
            <Image
              src="/Phone.png"
              alt="Phone"
              width={440}
              height={410}
              className={`contactus-img${showPhone ? ' show' : ''}`}
            />
          </div>
          {/* Right: Form */}
          <div className="contactus-form-col">
            <h2 className="contactus-title">GET IN TOUCH WITH US</h2>
            <p className="contactus-desc">Leave us a message, we will contact you as soon as possible.</p>
            <form className="contactus-form">
              <label>FULL NAME</label>
              <div className="input-icon-wrap">
                <img src="/Name.png" alt="Name" className="input-icon1" />
                <input type="text" placeholder="Your Name" onFocus={handleFieldFocus} />
              </div>
              <label>EMAIL</label>
              <div className="input-icon-wrap">
                <img src="/Email.png" alt="Email" className="input-icon2" />
                <input type="email" placeholder="Your Email" onFocus={handleFieldFocus} />
              </div>
              <label>MESSAGE</label>
              <div className="input-icon-wrap">
                <img src="/Message.png" alt="Message" className="input-icon" />
                <textarea placeholder="Type your message..." rows={4} onFocus={handleFieldFocus} />
              </div>
              <button type="submit" className="send-btn-animated"><span>SEND</span></button>
            </form>
          </div>
        </div>
      </div>
      {/* Office Address, Contact Details, Social Media */}
      <div className="contactus-info-bg">
        <div className="contactus-info-row">
          <div className="contactus-info-card">
            <h3>Office Address</h3>
            <p>123 Business Street, Suite 100<br />New York, NY 10001<br />United States</p>
          </div>
          <div className="contactus-info-card">
            <h3>Contact Details</h3>
            <p>Email: info@example.com<br />Phone: +1 (555) 123-4567<br />Fax: +1 (555) 987-6543</p>
          </div>
          <div className="contactus-info-card">
            <h3>Follow Us</h3>
            <div className="contactus-socials">
              <a href="#" aria-label="GitHub"><FaGithub /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
