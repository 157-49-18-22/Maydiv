'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import './Projects.css';
import Testimonial from './Testimonial';
import Discuss from './Discuss';
import Footer from './Footer';

const Projects = () => {
  const [showScreen, setShowScreen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const nextgenRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowScreen(true);
          setTimeout(() => setAnimate(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (nextgenRef.current) {
      observer.observe(nextgenRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="projects-page-container">
      {/* Navbar (same as homepage) */}
      <nav className="header-nav">
        <div className="header-logo">
          <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} />
        </div>
        <ul className="header-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/testimonials">Testimonials</Link></li>
          <li><Link href="/ai">AI</Link></li>
          <li><Link href="#contact">Contact</Link></li>
        </ul>
        <div className="header-socials">
          <a href="#" aria-label="GitHub"><FaGithub /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="projects-hero-section">
        <div className="projects-hero-text-wrap">
          <div className="projects-hero-glow"></div>
          <div className="projects-hero-badge">Latest integration just arrived</div>
          <h1 className="projects-hero-heading">Develop your <br />Websites with Maydiv</h1>
          <div className="projects-hero-subheading">
            Elevate your site's visibility effortlessly with Maydiv, <br />where smart technology meets user-friendly SEO tools.
          </div>
          <button className="projects-hero-btn">AI Us</button>
        </div>
      </section>

      {/* Project Image Section */}
      <div className="projects-hero-image-wrap">
        <Image src="/Project.png" alt="Project Dashboard" width={900} height={420} className="projects-hero-image" />
        <div className="projects-hero-image-fade"></div>
      </div>
      <div className="projects-partners-section">
        <div className="projects-partners-heading">
          Trusted by the world's most innovative teams
        </div>
        <div className="projects-partners-grid">
          <div className="projects-partner-card"><img src="/Acme.png" alt="Acme Corp" className="partner-logo" /></div>
          <div className="projects-partner-card"><img src="/Echo.png" alt="Echo Valley" className="partner-logo" /></div>
          <div className="projects-partner-card"><img src="/Quantum.png" alt="Quantum" className="partner-logo" /></div>
          <div className="projects-partner-card"><img src="/Pulse.png" alt="Pulse" className="partner-logo" /></div>
          <div className="projects-partner-card"><img src="/Outside.png" alt="Outside" className="partner-logo" /></div>
          <div className="projects-partner-card"><img src="/Apex.png" alt="Apex" className="partner-logo" /></div>
          <div className="projects-partner-card"><img src="/Celestial.png" alt="Celestial" className="partner-logo" /></div>
          <div className="projects-partner-card"><img src="/Twice.png" alt="2TWICE" className="partner-logo" /></div>
        </div>
      </div>

      {/* New About/Showcase Section */}
      <section className="projects-nextgen-section">
        <div className="nextgen-content">
          <div className="nextgen-text">
            <h2>Next Generation<br />Web Development</h2>
            <p>
              Experience the thrill of fully immersive virtual environments that transport you to captivating worlds.
            </p>
            <button className="nextgen-btn">Get it Now</button>
          </div>
          <div className="nextgen-images" ref={nextgenRef}>
            {showScreen && (
              <img
                src="/Screen.png"
                alt="Screen"
                className={`nextgen-screen${animate ? ' animate' : ''}`}
              />
            )}
            <img
              src="/Girl.png"
              alt="Girl"
              className={`nextgen-girl${animate ? ' animate' : ''}`}
            />
          </div>
        </div>
      </section>

      {/* New Online Presence Section */}
      <section className="projects-online-section">
        <div className="online-content">
          <div className="online-image-wrap">
            <img src="/Man.png" alt="Man working" className="online-image" />
          </div>
          <div className="online-text">
            <h2>Build an online presence<br />for your business</h2>
            <p>On a mission to empower <b>D2C brands</b>, to make them a unicorn with phenomenal performance marketing strategies.</p>
            <div className="online-avatars-row">
              <div className="online-avatars">
                <img src="/Girl1.png" alt="Girl 1" />
                <img src="/Girl2.png" alt="Girl 2" />
                <img src="/Girl3.png" alt="Girl 3" />
                <img src="/Girl4.png" alt="Girl 4" />
              </div>
              <div className="online-separator"></div>
              <button className="online-btn">AI</button>
            </div>
          </div>
        </div>
      </section>

      {/* Maydiv web Development Services Section */}
      <section className="services-section">
        <div className="services-content">
          <div className="services-left">
            <h2>Maydiv web<br />Development Services</h2>
            <p>
              Eget malesuada tortor ut sed. Tincidunt viverra malesuada nisl vehicula vestibulum. 
              Ut blandit fermentum, cursus nulla. Imperdiet neque mi convallis quis interdum sagittis.
            </p>
          </div>
          <div className="services-right">
            <div className="service-card">
              <img src="/Responsive.png" alt="Responsive Website" className="service-icon" />
              <div>
                <div className="service-title">Responsive Website</div>
                <div className="service-projects">80+ Project</div>
              </div>
              <span className="service-arrow">→</span>
            </div>
            <div className="service-card">
              <img src="/Modern.png" alt="Modern Design" className="service-icon" />
              <div>
                <div className="service-title">Modern Design</div>
                <div className="service-projects">76+ Project</div>
              </div>
              <span className="service-arrow">→</span>
            </div>
            <div className="service-card">
              <img src="/User1.png" alt="User Dashboard" className="service-icon" />
              <div>
                <div className="service-title">User Dashboard</div>
                <div className="service-projects">32+ Project</div>
              </div>
              <span className="service-arrow">→</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Web Projects Section */}
      <section className="projects-showcase-section">
        <h2 className="showcase-heading">Our Web Projects</h2>
        <div className="showcase-filters">
          <button className="active">All</button>
          <button>Agency Website</button>
          <button>Mobile App</button>
          <button>Health Website</button>
          <button>Educational Website</button>
        </div>
        <div className="showcase-grid">
          <div className="showcase-card">
            <img src="/Our1.png" alt="Project 1" />
          </div>
          <div className="showcase-card">
            <img src="/Our2.png" alt="Project 2" />
          </div>
          <div className="showcase-card">
            <img src="/Our3.png" alt="Project 3" />
          </div>
          <div className="showcase-card">
            <img src="/Our4.png" alt="Project 4" />
          </div>
          <div className="showcase-card">
            <img src="/Our5.png" alt="Project 5" />
          </div>
          <div className="showcase-card">
            <img src="/Our6.png" alt="Project 6" />
          </div>
        </div>
        <div className="showcase-viewmore-wrap">
          <button className="showcase-viewmore-btn">View more</button>
        </div>
      </section>

      {/* Dummy cards below (optional, can remove if not needed) */}
      {/* <h1 className="projects-page-heading">Projects</h1>
      <div className="projects-page-list">
        <div className="projects-page-card">
          <div className="projects-page-card-title">Project Alpha</div>
          <div className="projects-page-card-desc">A dummy project description for Alpha.</div>
        </div>
        <div className="projects-page-card">
          <div className="projects-page-card-title">Project Beta</div>
          <div className="projects-page-card-desc">A dummy project description for Beta.</div>
        </div>
        <div className="projects-page-card">
          <div className="projects-page-card-title">Project Gamma</div>
          <div className="projects-page-card-desc">A dummy project description for Gamma.</div>
        </div>
      </div> */}
      <Testimonial />
      <Discuss />
      <Footer />
    </div>
  );
};

export default Projects;
