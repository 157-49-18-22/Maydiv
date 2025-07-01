import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section floating-footer">
      <div className="footer-logo-centered">MAYDIV</div>
      <div className="footer-content footer-columns">
        <div className="footer-col footer-divider">
          <div className="footer-title">Contact Details</div>
          <div className="footer-address">+91 9220438999</div>
          <div className="footer-address">operations@maydiv.com</div>
        </div>
        <div className="footer-col footer-divider">
          <div className="footer-title">Office Location</div>
          <div className="footer-address">SCO-105 Second Floor World street,<br/>Faridabad , HR 121004</div>
        </div>
        <div className="footer-col footer-divider">
          <div className="footer-title">Quick Links</div>
          <Link href="/" className="footer-link">Home</Link>
          <Link href="/about" className="footer-link">About Us</Link>
          <a href="/contact" className="footer-link">Contact Us</a>
        </div>
        <div className="footer-col">
          <div className="footer-title">Follow us</div>
          <div className="footer-socials-centered">
            <a href="https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy" className="footer-social" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.facebook.com/profile.php?id=615720000000000" className="footer-social" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://github.com/" className="footer-social" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom-centered">
        <div>© 2025 Maydiv. All rights reserved.</div>
        <div>Crafted by MayDiv Infotech</div>
      </div>
    
    </footer>
  );
};

export default Footer; 