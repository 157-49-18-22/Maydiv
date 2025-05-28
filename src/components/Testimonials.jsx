'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  return (
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

      <section className="marketing-hero-section">
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
            <span className="marketing-hero-projects-number">950+</span>
     
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
        <div className="marketing-hero-graphic-t3">
          <img src="/T3.png" alt="Decorative T3" />
        </div>
      </section>
    </>
  );
};

export default Testimonials;
