import React from 'react';
import Link from 'next/link';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-col footer-brand">
          <div className="footer-logo">MAYDIV</div>
          <div className="footer-desc">We Code. You Grow</div>
        
        </div>
        <div className="footer-col">
          <div className="footer-title">Explore</div>
          <a href="#" className="footer-link">Resources</a>
          <a href="#" className="footer-link">Blog</a>
          <a href="#" className="footer-link">Documents</a>
        </div>
        <div className="footer-col">
          <div className="footer-title">Menu</div>
          <Link href="/" className="footer-link">Home</Link>
          <Link href="/about" className="footer-link">About Us</Link>
          <a href="/contact" className="footer-link">Contact Us</a>
        </div>
        <div className="footer-col">
          <div className="footer-title">OFFICE LOCATION</div>
          <div className="footer-address">SCO-105 Second floor world street, Faridabad , HR 121004</div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-links">
          <a href="#" className="footer-link">Terms</a>
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Cookies</a>
        </div>
       
        <div className="footer-socials">
          <a href="#" className="footer-social"><i className="fa fa-facebook"></i></a>
          <a href="#" className="footer-social"><i className="fa fa-linkedin"></i></a>
          <a href="#" className="footer-social"><i className="fa fa-twitter"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 