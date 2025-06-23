'use client';

import React, { useRef, useEffect, useState } from 'react';
import { FaInstagram, FaFacebook, FaRocket, FaPhone, FaSync, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

import Lottie from 'lottie-react';

import robotAnimation from '../../public/Robot.json';
import './Header.css';

function Counter({ start, end, duration = 2000 }) {
  const [value, setValue] = useState(start);
  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      setValue(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return value;
}

const Header = () => {
  const maxRobotX = 350; // adjust as per your layout
  // Robot ke liye scroll-based position
  const [robotPos, setRobotPos] = useState({ top: 100, left: 100 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const escapingRef = useRef(false);
  const howWeWorkRef = useRef(null);
  const [robotActive, setRobotActive] = useState(false);
  const statsRef = useRef(null);
  const [showCounters, setShowCounters] = useState(false);

  useEffect(() => {
    // Set initial mouse position to center of screen on client
    mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrame;
    const size = 100;
    const padding = 20;
    const speed = 0.5; // Trailing factor (higher = less lag, 0.5 = very fast)
    const moveRobot = () => {
      let { top, left } = robotPos;
      const { x, y } = mouseRef.current;
      // Target robot center to follow mouse
      const targetLeft = Math.max(padding, Math.min(window.innerWidth - size - padding, x - size / 2));
      const targetTop = Math.max(padding, Math.min(window.innerHeight - size - padding, y - size / 2));
      left += (targetLeft - left) * speed;
      top += (targetTop - top) * speed;
      setRobotPos({ top, left });
      animationFrame = requestAnimationFrame(moveRobot);
    };
    animationFrame = requestAnimationFrame(moveRobot);
    return () => cancelAnimationFrame(animationFrame);
  }, [robotPos]);

  useEffect(() => {
    const handleScroll = () => {
      if (!statsRef.current) return;
      const rect = statsRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setShowCounters(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Run once on mount in case already in view
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Robot */}
      <div style={{
        position: 'fixed',
        top: robotPos.top,
        left: robotPos.left,
        width: 100,
        height: 100,
        zIndex: 9999,
        pointerEvents: 'none',
        transition: 'top 1.2s cubic-bezier(0.4,0.2,0.2,1), left 1.2s cubic-bezier(0.4,0.2,0.2,1)'
      }}>
        <Lottie animationData={robotAnimation} style={{ width: '100%', height: '100%' }} loop autoplay />
      </div>
      <header className="header-container">

        <nav className="header-nav">
          <div className="header-logo">
            <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} quality={100} unoptimized />
          </div>
          <ul className="header-links">
            <li><Link href="#home"><span>Home</span></Link></li>
            <li className="dropdown">
              <span className="dropdown-toggle" style={{marginBottom: '10px'}}>Services</span>
              <ul className="dropdown-menu">
                <li><Link href="/real-projects"><span><FaCode className="dropdown-icon" /> Web Development</span></Link></li>
                <li><Link href="/real-services"><span><FaPalette className="dropdown-icon" /> UI/UX Design</span></Link></li>
                <li><Link href="/real-testimonials"><span><FaBullhorn className="dropdown-icon" /> Social Media and Marketing</span></Link></li>
                <li><Link href="/real-apps"><span><FaMobileAlt className="dropdown-icon" /> App Development</span></Link></li>
                <li><Link href="/real-ai"><span><FaBrain className="dropdown-icon" /> AI</span></Link></li>
              </ul>
            </li>
            <li><Link href="/new"><span>Projects</span></Link></li>
            <li><Link href="/contact"><span>Contact</span></Link></li>
          </ul>
          <div className="header-socials">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
          </div>
        </nav>
        <div className="header-hero">
          <h1>
            <span className="gradient-text">Interactive Digital Solutions</span><br />
            <span className="gradient-text1">Scalable AI.</span>
          </h1>
         
          <div className="header-buttons" >
            <button className="primary-btn" >Get started</button>
            <button className="secondary-btn" >Our Portfolio</button>
          </div>
          <div className="header-hero-robot-group" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '0 auto'}}>
          
              <Image
                src="/Animation.png"
                alt="Animation"
                width={1205}
                height={419}
                className="header-animation-img"
              />
            </div>
     
          <div className="header-stats-section" ref={statsRef}>
            <div className="header-stat">
              <span className="stat-number gradient-text">
                {showCounters ? <Counter start={40} end={150} duration={2000} /> : 40}+
              </span>
              <span className="stat-label">Success Project</span>
            </div>
            <div className="header-stat">
              <span className="stat-number gradient-text">
                {showCounters ? <Counter start={1} end={2} duration={2000} /> : 2}+
              </span>
             
              <span className="stat-label">Product Launched</span>
            </div>
            <div className="header-stat">
              <span className="stat-number gradient-text">
                {showCounters ? <Counter start={2} end={10} duration={2000} /> : 10}+
              </span>
              <span className="stat-label">Startup Raised</span>
            </div>
          </div>
          <div className="header-trusted-section">
            <div className="trusted-heading gradient-text">Trusted by 67+ Startups and Agencies</div>
            <div className="trusted-logos">
              <div className="trusted-logos-row">
                <div className="trusted-logo-wrap"><Image src="/Panasonic.png" alt="Panasonic" width={110} height={30} quality={100} unoptimized /></div>
                <div className="trusted-logo-wrap"><Image src="/Nestle.png" alt="Nestle" width={100} height={30} quality={100} unoptimized /></div>
                <div className="trusted-logo-wrap"><Image src="/Apollo.png" alt="Apollo.io" width={100} height={30} quality={100} unoptimized /></div>
                <div className="trusted-logo-wrap"><Image src="/Toptal.png" alt="Toptal" width={100} height={30} quality={100} unoptimized /></div>
                <div className="trusted-logo-wrap"><Image src="/Logo1.png" alt="LOGOIPSUM" width={120} height={30} quality={100} unoptimized /></div>
                <div className="trusted-logo-wrap"><Image src="/Logo1.png" alt="logoipsum" width={120} height={30} quality={100} unoptimized /></div>
              </div>
              <div className="trusted-logos-row">
                <div className="trusted-logo-wrap"><Image src="/Toptal.png" alt="Toptal" width={100} height={30} quality={100} unoptimized /></div>
                <div className="trusted-logo-wrap"><Image src="/Logo1.png" alt="LOGOIPSUM" width={120} height={30} quality={100} unoptimized /></div>
                <div className="trusted-logo-wrap"><Image src="/Logo1.png" alt="logoipsum" width={120} height={30} quality={100} unoptimized /></div>
                <div className="trusted-logo-wrap"><Image src="/Apollo.png" alt="Apollo.io" width={100} height={30} quality={100} unoptimized /></div>
                <div className="trusted-logo-wrap"><Image src="/Nestle.png" alt="Nestle" width={100} height={30} quality={100} unoptimized /></div>
                <div className="trusted-logo-wrap"><Image src="/Panasonic.png" alt="Panasonic" width={100} height={30} quality={100} unoptimized /></div>
              </div>
            </div>
          </div>
          <div className="how-we-work-section">
            <div className="how-we-work-heading gradient-text">HOW WE WORK</div>
            <div className="how-we-work-content">
              <div className="how-we-work-left">
                <h2>Get a dedicated UX design service at fraction of the cost.</h2>
              </div>
              <div className="how-we-work-right">
                <p>Grow your brand with high-quality UI/UX design for a minimal fee. Work with senior designers. Contact and make as many requests as you need – no limits.</p>
                <Link href="/contact">
                  <button className="how-we-work-btn"><span>Contact Us</span></button>
                </Link>
              </div>
            </div>
          </div>
          <div className="how-we-work-steps" ref={howWeWorkRef}>
            <div className="step">
              <div className="step-icon">
                <Image src="/Shuttle.png" alt="Vector" className="step-img-icon1" width={50} height={50} />
              </div>
              <div className="step-title">AI & get started</div>
              <div className="step-desc">Submit as many design tasks as you need without worrying about individual project fees.</div>
            </div>
            <img src="/Arrow.png" alt="Arrow" className="step-img-arrow-1" />
            <div className="step1">
              <div className="step-icon">
                <Image src="/Vector.png" alt="Vector" className="step-img-icon1" width={50} height={50} />
              </div>
              <div className="step-title">Polished designs</div>
              <div className="step-desc">Our designers get to work to deliver your request. Receive your design within a few days.</div>
            </div>
            <img src="/Arrow.png" alt="Arrow" className="step-img-arrow-2" />
            
            <div className="step2">
              <div className="step-icon"><FaSync /></div>
              <div className="step-title">Revisions made simple</div>
              <div className="step-desc">Custom designs, prompt replies and as many revisions as you need.</div>
            </div>
          </div>
        </div>
        
      </header>
    </>
  );
};

export default Header; 