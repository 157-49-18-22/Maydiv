import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import './Apps.css';

const Apps = () => {
  return (
    <div>
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
            <li><Link href="#Ai">Ai</Link></li>
          </ul>
          <div className="header-socials">
            <a href="#" aria-label="GitHub"><FaGithub /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
          </div>
        </nav>
      </header>

      <div className="apps-container">
        <div className="apps-hero">
          <div className="apps-hero-content">
            <h1>Develop your<br /><span className="purple-text">Apps with Maydiv</span></h1>
            <p className="hero-subtitle">App Development Bringing Your Ideas to Life</p>
            <p className="hero-description">Innovate, Develop, Launch Your Vision with Our App Expertise</p>
            <div className="expertise-image">
              <Image 
                src="/Apps1.png" 
                alt="App Development Expertise"
                width={800}
                height={400}
                className="apps1-image"
              />
            </div>
          </div>

          <div className="ios-section">
            <div className="service-content">
              <div className="expertise-image">
                <Image 
                  src="/Apps2.png" 
                  alt="App Development Expertise"
                  width={800}
                  height={400}
                  className="apps2-image"
                />
              </div>
              <div className="mobile-image-container">
                <Image 
                  src="/Mobiles.png" 
                  alt="Mobile Devices"
                  width={300}
                  height={300}
                  className="mobiles-image"
                />
              </div>
            </div>
            <div className="service-image">
              <Image 
                src="/Multi.png" 
                alt="iOS Devices"
                width={600}
                height={400}
                className="ios-devices"
              />
            </div>
          </div>

          <div className="android-section">
            <div className="service-content">
             
              
              
            </div>
            <div className="service-image">
              <Image 
                src="/Half.png" 
                alt="Android Devices"
                width={600}
                height={400}
                className="android-devices"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apps;
