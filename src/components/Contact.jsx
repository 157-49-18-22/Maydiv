'use client';
import React from 'react';
import Image from 'next/image'; // Assuming you're using Next.js
import Link from 'next/link';   // Assuming you're using Next.js
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import Lottie from 'lottie-react';
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
      {/* Trusted by bar inside hero section */}
      <div className="trusted-bar">
        <span className="trusted-text">Trusted by top innovative teams:</span>
        <div className="trusted-logos">
          <span className="trusted-logo"><Image src="/celestial 1.png" alt="Celestial" width={90} height={32} /></span>
          <span className="trusted-logo"><Image src="/apexw 1.png" alt="APEX" width={90} height={32} /></span>
          <span className="trusted-logo"><Image src="/quantrumw 1.png" alt="Quantum" width={90} height={32} /></span>
          <span className="trusted-logo"><Image src="/acme 1.png" alt="Acme Corp" width={90} height={32} /></span>
          <span className="trusted-logo"><Image src="/pulsew 1.png" alt="PULSE" width={90} height={32} /></span>
        </div>
      </div>
    </section>

    {/* AI elevate your brands growth section */}
    <section className="ai-growth-section">
      <div className="ai-growth-content">
        <div className="ai-growth-left-col">
          <h2 className="ai-growth-title">AI elevate your brands growth</h2>
          <Lottie animationData={require('../../public/Ai.json')} style={{ width: 660, height: 380, borderRadius: '1.2rem', background: 'none', margin: '1rem 0' }} loop autoplay />
          <p className="ai-growth-desc">One stop for all your E-commerce marketing solutions. Scale your brand with our digital & result driven marketing services. Ready to take your brand to the next level?</p>
          <button className="ai-growth-btn">Contact Us</button>
        </div>
        <div className="ai-growth-right-col">
          <div className="ai-growth-cards">
            <div className="ai-growth-card">
              <Image src="/chart.png" alt="Performance" width={36} height={36} className="ai-growth-card-icon" />
              <div className="ai-growth-card-title">Performance</div>
              <div className="ai-growth-card-desc">Get exponential growth with our marketing strategies.</div>
              <a href="#" className="ai-growth-card-link">Learn More</a>
            </div>
            <div className="ai-growth-card">
              <Image src="/people.png" alt="Retention" width={36} height={36} className="ai-growth-card-icon" />
              <div className="ai-growth-card-title">Retention</div>
              <div className="ai-growth-card-desc">Let us help you retarget your customer base.</div>
              <a href="#" className="ai-growth-card-link">Learn More</a>
            </div>
            <div className="ai-growth-card">
              <Image src="/shoppingcart.png" alt="Marketplaces" width={36} height={36} className="ai-growth-card-icon" />
              <div className="ai-growth-card-title">Marketplaces</div>
              <div className="ai-growth-card-desc">Get more visibility, more customers, and more sales.</div>
              <a href="#" className="ai-growth-card-link">Learn More</a>
            </div>
            <div className="ai-growth-card">
              <Image src="/arrowsquare.png" alt="Other Services" width={36} height={36} className="ai-growth-card-icon" />
              <div className="ai-growth-card-title">Other Services</div>
              <div className="ai-growth-card-desc">Besides marketing, we do a lot more.</div>
              <a href="#" className="ai-growth-card-link">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* AI Automation & Integration Section */}
    <section className="ai-integration-section">
      <div className="ai-integration-card">
        <div className="ai-integration-left">
          <h2 className="ai-integration-title">Ai Automation & Integration</h2>
          <p className="ai-integration-desc">Ever since implementing Wonderchat on our site, I've seen up to a 70% reduction of customer support queries in my inbox."</p>
          <div className="ai-integration-user">
            <img src="/Pic4.png" alt="Bryce Conway" className="ai-integration-avatar" />
            <div>
              <div className="ai-integration-user-name">BRYCE CONWAY</div>
              <div className="ai-integration-user-role">Founder and CEO of Maydiv</div>
            </div>
          </div>
        </div>
        <div className="ai-integration-right">
          <Lottie animationData={require('../../public/Robot1.json')} style={{ width: 340, height: 340, maxWidth: '100%', margin: '0 auto' }} loop autoplay />
        </div>
      </div>
    </section>

    {/* AI Multiverse Section */}
    <section className="ai-multiverse-row">
      <div className="ai-multiverse-row-content">
        <div className="ai-multiverse-row-lottie">
          <Lottie animationData={require('../../public/Multiverse.json')} style={{ width: 220, height: 220, marginBottom: '1.2rem' }} loop autoplay />
        </div>
        <div className="ai-multiverse-row-text">
          <h3 className="ai-multiverse-heading"><span className="gradient-text">AI Multiverse</span></h3>
          <div className="ai-multiverse-subheading">Optimized Reach</div>
          <p className="ai-multiverse-desc">It's all about getting your message in front of the right audience and creating those valuable <span className="ai-multiverse-link">relationships</span>.<br/>Learn More about how DOML can help you do just that - all with a simple, easy-to-use platform.</p>
          <button className="ai-multiverse-btn">Learn more →</button>
        </div>
      </div>
    </section>

    {/* AI Marketing Section (flipped) */}
    <section className="ai-multiverse-row">
      <div className="ai-multiverse-row-content ai-multiverse-row-flip">
        <div className="ai-multiverse-row-text">
          <h3 className="ai-multiverse-heading"><span className="gradient-text">AI Marketing</span></h3>
          <div className="ai-multiverse-subheading">Optimized Reach</div>
          <p className="ai-multiverse-desc">DOML is a digital media agency powered by AI technology providing real time, <span className="ai-multiverse-link">data-driven insights</span> on your business and audience. The mission of DOML is to create the best experiences for companies through intelligent insights, powerful analytics and <span className="ai-multiverse-link">strategic execution</span>.</p>
          <button className="ai-multiverse-btn">Learn more →</button>
        </div>
        <div className="ai-multiverse-row-lottie">
          <Lottie animationData={require('../../public/Marketing.json')} style={{ width: 220, height: 220, marginBottom: '1.2rem' }} loop autoplay />
        </div>
      </div>
    </section>
  </>
);

export default Contact;
