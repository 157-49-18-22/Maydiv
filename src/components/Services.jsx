'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaFacebook, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "./Services.css";
import Testimonial from './Testimonial';
import Discuss from './Discuss';
import Footer from './Footer';

const Services = () => {
  const [showBulb, setShowBulb] = useState(false);
  const [cloud1X, setCloud1X] = useState(0);
  const [cloud2X, setCloud2X] = useState(0);
  const [cloud3X, setCloud3X] = useState(0);
  const [pinkBallBounce, setPinkBallBounce] = useState(true);
  const [bounceCount, setBounceCount] = useState(0);
  const logosRowRef = React.useRef(null);
  const [highlightedIndex, setHighlightedIndex] = React.useState(2); // Start with the middle logo
  const logos = [
    { src: '/Moven.png', alt: 'Movenpick' },
    { src: '/Raz.png', alt: 'Raz Amwal' },
    { src: '/Rosegal.png', alt: 'Rosegal' },
    { src: '/Eyab.png', alt: 'Eyab' },
    { src: '/Council.png', alt: 'Council of Health Insurance' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowBulb(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Animate clouds
  useEffect(() => {
    const interval = setInterval(() => {
      setCloud1X((prev) => (prev >= 60 ? 0 : prev + 0.25));
      setCloud2X((prev) => (prev >= 80 ? 0 : prev + 0.18));
      setCloud3X((prev) => (prev >= 100 ? 0 : prev + 0.12));
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!pinkBallBounce) return;
    if (bounceCount >= 3) {
      setPinkBallBounce(false);
      return;
    }
    const handle = setTimeout(() => {
      setBounceCount((prev) => prev + 1);
    }, 2200); // match animation duration
    return () => clearTimeout(handle);
  }, [bounceCount, pinkBallBounce]);

  const handleScrollLeft = () => {
    setHighlightedIndex((prev) => (prev - 1 + logos.length) % logos.length);
    logosRowRef.current && logosRowRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  };
  const handleScrollRight = () => {
    setHighlightedIndex((prev) => (prev + 1) % logos.length);
    logosRowRef.current && logosRowRef.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  return (
    <div className="services-container">
      {/* Hero Section */}
      <nav className="header-nav">
        <div className="header-logo">
          <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} />
        </div>
        <ul className="header-links">
          <li><Link href="#home">Home</Link></li>
          <li><Link href="#services">Services</Link></li>
          <li><Link href="#projects">Projects</Link></li>
          <li><Link href="/testimonials">Testimonials</Link></li>
          <li><Link href="/ai">AI</Link></li>
        </ul>
        <div className="header-socials">
          <a href="#" aria-label="GitHub"><FaGithub /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
        </div>
      </nav>
      {/* Hero Content Row */}
      <div className="hero-pattern-bg">
        <div className="services-hero-row">
          {/* Decorative Cloud Image 3 */}
          <div className="services-cloud-img3" style={{ transform: `translateX(${cloud3X}px)` }}>
            <Image src="/Image5.png" alt="Cloud3" width={170} height={70} />
          </div>
          {/* Decorative Cloud Image */}
          <div className="services-cloud-img" style={{ transform: `translateX(${cloud1X}px)` }}>
            <Image src="/Image3.png" alt="Cloud" width={170} height={170} />
          </div>
          {/* Decorative Bulb Image */}
          <div className={`services-bulb-img${showBulb ? ' glow' : ' hide'}`}>
            <Image src="/Image2.png" alt="Bulb" width={140} height={140} />
          </div>
          {/* Decorative Cloud Image 2 */}
          <div className="services-cloud-img2" style={{ transform: `translateX(${cloud2X}px)` }}>
            <Image src="/Image4.png" alt="Cloud2" width={170} height={90} />
          </div>
          {/* Decorative Pink Ball */}
          <div className={`services-pinkball-img${pinkBallBounce ? '' : ' no-bounce'}`}>
            <Image src="/Image6.png" alt="Pink Ball" width={70} height={70} />
          </div>
          <div className="services-intro-text">
            <h1>UI/UX Provide Smart Business Solutions</h1>
            <p>Grow your Business With Us Best Business Solutions</p>
          </div>
          <div className="services-hero-img">
            <Image src="/Image1.png" alt="Hero Visual" width={400} height={400} />
          </div>
        </div>
      </div>
      {/* Partners Section */}
      <div className="services-partners-section">
        <div className="partners-bg-wrap">
          <img src="/Brand.png" alt="Brand Background" className="partners-bg-img" />
          <div className="partners-row-flex">
            <div className="partners-main-text">
              <span className="partners-wave">~</span> We've More Then 254+ <br /> Global Partners
            </div>
            <div className="partners-desc">
              Sed ut perspiciatis unde omnis natus error voluptatem santium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis quasi architecto beatae vitae
            </div>
          </div>
        </div>
        <div className="partners-logos-row-wrapper">
          <div className="partners-logos-topline"></div>
          <button className="partners-arrow-btn left" onClick={handleScrollLeft}>
            <FaChevronLeft />
          </button>
          <div className="partners-logos-row" ref={logosRowRef}>
            {logos.map((logo, idx) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className={idx === highlightedIndex ? 'highlighted-logo' : ''}
              />
            ))}
          </div>
          <button className="partners-arrow-btn right" onClick={handleScrollRight}>
            <FaChevronRight />
          </button>
        </div>
      </div>
      {/* Explore Section (new) */}
      <div className="explore-section">
        <div className="explore-img-col">
          <img src="/Explore1.png" alt="Explore Professional" className="explore-main-img" />
          <img src="/Explore2.png" alt="Explore Icons" className="explore-floating-icons" />
        </div>
        <div className="explore-content-col">
          <div className="explore-features-bg-wrap">
            <img src="/pseudo.png" alt="Pseudo Line" className="explore-features-pseudo-img" />
            <img src="/features.png" alt="Features Background" className="explore-features-bg-img" />
            <h2 className="explore-heading">Explore Our Professional Business Solutions</h2>
          </div>
          <div className="explore-cards-grid">
            <div className="explore-card">
              <img src="/Business.png" alt="Business Growth" className="explore-card-icon" />
              <div>
                <div className="explore-card-title">Business Growth</div>
                <div className="explore-card-desc">Sed perspiciatis unde omnis natus error voluptatem</div>
              </div>
            </div>
            <div className="explore-card">
              <img src="/User.png" alt="User Research" className="explore-card-icon" />
              <div>
                <div className="explore-card-title">User Research</div>
                <div className="explore-card-desc">Sed perspiciatis unde omnis natus error voluptatem</div>
              </div>
            </div>
            <div className="explore-card">
              <img src="/Big.png" alt="Big Data Solution" className="explore-card-icon" />
              <div>
                <div className="explore-card-title">Big Data Solution</div>
                <div className="explore-card-desc">Sed perspiciatis unde omnis natus error voluptatem</div>
              </div>
            </div>
            <div className="explore-card">
              <img src="/Product.png" alt="Product Design" className="explore-card-icon" />
              <div>
                <div className="explore-card-title">Product Design</div>
                <div className="explore-card-desc">Sed perspiciatis unde omnis natus error voluptatem</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About/Awards Section (new) */}
      <div className="about-section">
        <div className="about-content-col">
          <div className="about-heading-bg-wrap">
            <img src="/pseudo1.png" alt="Pseudo1 Line" className="about-heading-pseudo-img" />
            <img src="/Who.png" alt="Who Background" className="about-heading-bg-img" />
            <h2 className="about-heading">We're Awards Winning Modern Business Solutions Agency</h2>
          </div>
          <div className="about-desc">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis architecto beatae</div>
          <div className="about-pills-row">
            <span className="about-pill">Tech Solutions</span>
            <span className="about-pill">IT Consulting</span>
            <span className="about-pill">Web Solutions</span>
            <span className="about-pill">Business Growth</span>
            <span className="about-pill">Product Design</span>
          </div>
        </div>
        <div className="about-img-col">
          <img src="/about-1.png" alt="About Agency" className="about-main-img" />
        </div>
      </div>
      {/* Features Section (new) */}
      <div className="features-section">
        <div className="features-heading-wrap">
          <span className="features-bg-text">SERVICES</span>
          <img src="/pseudo1.png" alt="Wave" className="features-heading-wave" />
          <h2 className="features-heading">Great Features To Do Your Business Growth & Development</h2>
        </div>
        <div className="features-content-row">
          <div className="features-chart-col">
            <img src="/Graph.png" alt="Graph Illustration" className="features-graph-img" />
          </div>
          <div className="features-cards-col">
            <div className="features-card">
              <img src="/Graphics.png" alt="Graphics Design" className="features-card-icon" />
              <div>
                <div className="features-card-title">Graphics Design</div>
                <div className="features-card-desc">Sed perspiciatis unde omnis natus error voluptatem</div>
              </div>
              <span className="features-card-arrow">→</span>
            </div>
            <div className="features-card">
              <img src="/Idea.png" alt="Ideation & Evaluation" className="features-card-icon" />
              <div>
                <div className="features-card-title">Ideation & Evaluation</div>
                <div className="features-card-desc">Sed perspiciatis unde omnis natus error voluptatem</div>
              </div>
              <span className="features-card-arrow">→</span>
            </div>
            <div className="features-card">
              <img src="/Brand1.png" alt="Brand Identity" className="features-card-icon" />
              <div>
                <div className="features-card-title">Brand Identity</div>
                <div className="features-card-desc">Sed perspiciatis unde omnis natus error voluptatem</div>
              </div>
              <span className="features-card-arrow">→</span>
            </div>
            <div className="features-card">
              <img src="/Costume.png" alt="Custome Service" className="features-card-icon" />
              <div>
                <div className="features-card-title">Custome Service</div>
                <div className="features-card-desc">Sed perspiciatis unde omnis natus error voluptatem</div>
              </div>
              <span className="features-card-arrow">→</span>
            </div>
            <div className="features-card">
              <img src="/Web1.png" alt="Web Strategy" className="features-card-icon" />
              <div>
                <div className="features-card-title">Web Strategy</div>
                <div className="features-card-desc">Sed perspiciatis unde omnis natus error voluptatem</div>
              </div>
              <span className="features-card-arrow">→</span>
            </div>
          </div>
        </div>
      </div>
      {/* UI/UX Projects Section (new) */}
      <div className="projects-section">
        <div className="projects-header-row">
          <h2 className="projects-heading">UI/UX Projects</h2>
          <a href="#" className="projects-seeall-link">See All &rarr;</a>
        </div>
        <div className="projects-cards-grid">
          <div className="project-card">
            <img src="/Vpn.png" alt="VPN Mobile App Design" className="project-card-img" />
            <div className="project-card-title">VPN Mobile App Design</div>
            <div className="project-card-subtitle">Mobile App Design</div>
          </div>
          <div className="project-card">
            <img src="/Streaming.png" alt="Streaming App Design" className="project-card-img" />
            <div className="project-card-title">Streaming App Design</div>
            <div className="project-card-subtitle">Mobile App Design</div>
          </div>
          <div className="project-card">
            <img src="/Creative.png" alt="Creative Digital Agency" className="project-card-img" />
            <div className="project-card-title">Creative Digital Agency</div>
            <div className="project-card-subtitle">Landing Page Design</div>
          </div>
          <div className="project-card">
            <img src="/Podcast.png" alt="Podcast Mobile App" className="project-card-img" />
            <div className="project-card-title">Podcast Mobile App</div>
            <div className="project-card-subtitle">Mobile App Design</div>
          </div>
          <div className="project-card">
            <img src="/Multimedia.png" alt="Multimedia Design Platform" className="project-card-img" />
            <div className="project-card-title">Multimedia Design Platform</div>
            <div className="project-card-subtitle">Web Design</div>
          </div>
          <div className="project-card">
            <img src="/Parking.png" alt="Parking Mobile App" className="project-card-img" />
            <div className="project-card-title">Parking Mobile App</div>
            <div className="project-card-subtitle">Mobile App Design</div>
          </div>
        </div>
      </div>
      {/* Features Section (new) */}
      <Testimonial />
      <Discuss />
      <Footer />
    </div>
  );
};

export default Services;
