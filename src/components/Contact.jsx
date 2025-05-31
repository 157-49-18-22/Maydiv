import React from 'react';
import Image from 'next/image'; // Assuming you're using Next.js
import Link from 'next/link';   // Assuming you're using Next.js
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import './Contact.css';

const Contact = () => (
  <>
    <header className="header-container">
      <nav className="header-nav">
        <div className="header-logo">
          <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} />
        </div>
        <ul className="header-links">
          <li><Link href="#home">Home</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/testimonials">Testimonials</Link></li>
          <li><Link href="#contact">Contact</Link></li>
        </ul>
        <div className="header-socials">
          <a href="#" aria-label="GitHub"><FaGithub /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
        </div>
      </nav>
    </header>

    <section className="contact-hero-section">
      <div className="contact-hero-left">
        <h1 className="contact-hero-title">Elevate With<br />Ai Agent.</h1>
        <p className="contact-hero-desc">
          Elevate your site's visibility effortlessly with AI, where smart technology meets user-friendly SEO tools. Elevate your site's visibility effortlessly with AI, where smart technology meets user-friendly SEO tools.
        </p>
        <button className="contact-hero-btn">Contact Us</button>
      </div>
      <div className="contact-hero-right">
        <div className="rock-group">
          <Image src="/Rock1.png" alt="Rock1" width={400} height={400} className="rock-img rock1" />
          <Image src="/Rock2.png" alt="Rock2" width={400} height={400} className="rock-img rock2" />
          <Image src="/Rock3.png" alt="Rock3" width={400} height={400} className="rock-img rock3" />
          <Image src="/Rock4.png" alt="Rock4" width={400} height={400} className="rock-img rock4" />
          <Image src="/Rock5.png" alt="Rock5" width={400} height={400} className="rock-img rock5" />
          <Image src="/Rock6.png" alt="Rock6" width={400} height={400} className="rock-img rock6" />
        </div>
      </div>
    </section>
   
  </>
);

export default Contact;
