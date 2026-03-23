'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { FaGithub, FaInstagram, FaFacebook, FaRocket, FaPhone, FaSync, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain, FaBars, FaTimes, FaChevronDown, FaReact, FaNodeJs, FaSearch, FaSitemap, FaPencilRuler, FaCheckCircle } from 'react-icons/fa';
import { SiMysql, SiNextdotjs, SiTailwindcss, SiMongodb, SiFirebase, SiFigma } from 'react-icons/si';
import { HiArrowUpRight } from "react-icons/hi2";
import './New.css';
import Discuss from './Discuss';
import Footer from './Footer';
import Lottie from 'lottie-react';
import newAnimation from '../../public/new.json';
import MobileDrawer from './MobileDrawer';

const projects = [

  {
    title: 'TVARA India',
    image: '/Tvara.png',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
    link: 'https://tvaraindia.com/',
    startDate: 'Mar 2025',
    endDate: 'May 2025',
    description: 'Official website for TVARA India, showcasing their services and portfolio.',
    status: 'Completed',
  },
  {
    title: 'Mobile App',
    image: '/1.7.webp',
    technologies: ['React', 'Next.js', 'CSS'],
    link: 'https://play.google.com/store/apps/details?id=com.blackhatcode.in.ssa_app.new&hl=en_US',
    startDate: 'Jan 2025',
    endDate: 'Feb 2025',
    description: 'A personal portfolio to showcase Our work and skills. Features responsive design and smooth animations.',
    status: 'Completed',
  },
  {
    title: 'Mobile App',
    image: '/2.7.webp',
    technologies: ['React', 'Redux', 'Node.js', 'MongoDB'],
    link: 'https://play.google.com/store/apps/details?id=com.rathifarms&hl=en_US',
    startDate: 'Apr 2025',
    endDate: 'Jun 2025',
    description: 'A full-featured e-commerce platform with cart, payment, and admin dashboard.',
    status: 'Completed',
  },
  {
    title: 'Company website',
    image: '/3.7.png',
    technologies: ['Next.js', 'Sanity.io', 'Styled Components'],
    link: 'https://www.melanieindia.com/',
    startDate: 'Aug 2025',
    endDate: 'Oct 2025',
    description: 'A modern blog platform with markdown support and live preview.',
    status: 'Completed',
  },
  {
    title: 'Mobile App',
    image: '/4.7.webp',
    technologies: ['React', 'Styled Components'],
    link: 'https://play.google.com/store/apps/details?id=com.myjobee&hl=en_US',
    startDate: 'Feb 2025',
    endDate: 'Mar 2025',
    description: 'A modern landing page for a SaaS product.',
    status: 'Completed',
  },
  {
    title: 'College Website',
    image: '/5.7.png',
    technologies: ['Vue.js', 'Vuetify', 'Firebase'],
    link: 'https://www.collegedisha.com/',
    startDate: 'May 2025',
    endDate: 'Jul 2025',
    description: 'A real-time dashboard for analytics and reporting.',
    status: 'Completed',
  },
  {
    title: 'E-commerce website',
    image: '/6.7.png',
    technologies: ['React Native', 'Expo'],
    link: 'https://fika-india.com/',
    startDate: 'Jul 2025',
    endDate: 'Sep 2025',
    description: 'A cross-platform mobile app for productivity.',
    status: 'Completed',
  },
  {
    title: 'Mobile App',
    image: '/7.7.webp',
    technologies: ['React Native', 'Expo'],
    link: 'https://play.google.com/store/apps/details?id=com.colyr&hl=en_US',
    startDate: 'Jul 2025',
    endDate: 'Oct 2025',
    description: 'A cross-platform mobile app for productivity.',
    status: 'Completed',
  },
  {
    title: 'Grid Zero',
    image: '/Grid Zero-02.png',
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    link: 'https://gridzero.in/',
    startDate: 'Jan 2026',
    endDate: 'Mar 2026',
    description: 'A professional website for a solar energy company, focusing on clean energy solutions.',
    status: 'Completed',
  },
  {
    title: 'Hotel Royal Grand Barsana',
    image: '/logo10.png',
    technologies: ['React', 'Next.js', 'CSS'],
    link: 'https://hotelroyalgrandbarsana.com/',
    startDate: 'Feb 2026',
    endDate: 'Apr 2026',
    description: 'A luxury hotel website featuring room bookings and information about amenities.',
    status: 'Completed',
  },
  {
    title: 'A2P Realtech',
    image: '/290126125406LOGO.png',
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    link: 'https://a2prealtech.com/',
    startDate: 'Mar 2026',
    endDate: 'May 2026',
    description: 'A modern real estate platform for property listings and client management.',
    status: 'Completed',
  },
  {
    title: 'Pomp & Pepper',
    image: '/logo99.png',
    technologies: ['React', 'Next.js', 'Node.js'],
    link: 'https://pompnpepper.com/',
    startDate: 'Apr 2026',
    endDate: 'Jun 2026',
    description: 'A stylish and responsive website for a modern brand.',
    status: 'Completed',
  },
];

const masteredTools = [
  { name: 'React', desc: 'Frontend Framework', icon: <FaReact /> },
  { name: 'Node.js', desc: 'Backend Runtime', icon: <FaNodeJs /> },
  { name: 'MySQL', desc: 'Database Management', icon: <SiMysql /> },
  { name: 'Next.js', desc: 'Full-stack Framework', icon: <SiNextdotjs /> },
  { name: 'Tailwind', desc: 'CSS Framework', icon: <SiTailwindcss /> },
  { name: 'MongoDB', desc: 'NoSQL Database', icon: <SiMongodb /> },
  { name: 'Firebase', desc: 'BaaS Platform', icon: <SiFirebase /> },
  { name: 'Figma', desc: 'Design Tool', icon: <SiFigma /> },
];

const workProcess = [
  {
    num: '01.',
    title: 'Discovery Session',
    desc: 'Understanding your goals and requirements specialized to your project.',
    icon: <FaSearch />
  },
  {
    num: '02.',
    title: 'Strategy Mapping',
    desc: 'Creating a roadmap and defining the architecture of your solution.',
    icon: <FaSitemap />
  },
  {
    num: '03.',
    title: 'Prototype Creation',
    desc: 'Designing interactive mockups to visualize the user experience.',
    icon: <FaPencilRuler />
  },
  {
    num: '04.',
    title: 'Final Delivery',
    desc: 'Polishing and deploying the final product for your users.',
    icon: <FaRocket />
  }
];

export default function New() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDropdownOpen, setDrawerDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const dropdownTimeout = useRef(null);
  const toolsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => observer.observe(card));

    const processCards = document.querySelectorAll('.process-card');
    processCards.forEach(card => observer.observe(card));

    const projectCards = document.querySelectorAll('.project-card-link');
    projectCards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('newReloaded')) {
      sessionStorage.setItem('newReloaded', 'true');
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    // Auto-refresh once per session, instantly
    if (typeof window !== 'undefined' && !sessionStorage.getItem('newPageRefreshed')) {
      sessionStorage.setItem('newPageRefreshed', 'true');
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    // Responsive check
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    // Navbar scroll effect
    const onScroll = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 350);
  };

  return (
    <div className="services-container">
      {/* Hero Section */}
      <nav className={`header-nav${navScrolled ? ' scrolled' : ''}`}>
        <div className="header-logo">
          <Link href="/">
            <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} quality={100} unoptimized />
          </Link>
        </div>
        {/* Desktop nav links */}
        {!isMobile && (
          <ul className="header-links">
            <li><Link href="/">Home</Link></li>
            <li className="dropdown"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              onFocus={handleDropdownEnter}
              onBlur={handleDropdownLeave}
            >
              <span className="dropdown-toggle" style={{ marginBottom: '10px' }}>Services</span>
              <ul className="dropdown-menu" style={{ display: dropdownOpen ? 'flex' : 'none', opacity: dropdownOpen ? 1 : 0, pointerEvents: dropdownOpen ? 'auto' : 'none', transform: dropdownOpen ? 'translateX(-43%) translateY(0) scale(1)' : 'translateX(-50%) translateY(10px) scale(0.95)' }}>
                <Link href="/web-development" onClick={() => setDrawerOpen(false)}><span><FaCode className="dropdown-icon" /> Web Development</span></Link>
                <Link href="/apps/ui-ux" onClick={() => setDrawerOpen(false)}><span><FaPalette className="dropdown-icon" /> UI/UX Design</span></Link>                  <Link href="/marketing" onClick={() => setDrawerOpen(false)}><span><FaBullhorn className="dropdown-icon" /> Social Media and Marketing</span></Link>
                <Link href="/app-development" onClick={() => setDrawerOpen(false)}><span><FaMobileAlt className="dropdown-icon" /> App Development</span></Link>
                <Link href="/ai" onClick={() => setDrawerOpen(false)}><span><FaBrain className="dropdown-icon" /> Artificial Intelligence</span></Link>
              </ul>
            </li>
            <li><Link href="/projects"><span>Projects</span></Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact"><span>Contact</span></Link></li>
            <li><Link href="/about"><span>About Us</span></Link></li>

          </ul>
        )}
        {/* MobileDrawer usage here */}
        <MobileDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          drawerDropdownOpen={drawerDropdownOpen}
          setDrawerDropdownOpen={setDrawerDropdownOpen}
          isMobile={isMobile}
        />
        <div className="header-socials">
          <a href="https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.facebook.com/profile.php?id=615720000000000" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        </div>
      </nav>

      {/* Projects Hero Section */}
      <div className="projects-hero-flex">
        <div className="projects-hero-content">
          <h2 className="projects-hero-title">Explore Our Work</h2>
          <p className="projects-hero-desc">
            Here are some of the projects I've built using modern web technologies.<br />
            From portfolios to e-commerce, each project is crafted with passion and precision.
          </p>
          <a href="#contact" className="projects-hero-btn">Let's Collaborate</a>
        </div>
        <div className="projects-hero-lottie">
          <Lottie animationData={newAnimation} className="hero-lottie-canvas" loop autoplay />
        </div>
      </div>

      <div className="projects-page">
        <h1 className="projects-title">Our Projects</h1>
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
            >
              <div className="new-project-card">
                <div className="project-image-container">
                  {project.image && (
                    <img src={project.image} alt={project.title} className="project-image" />
                  )}
                </div>
                <div className="project-info">
                  <div className="project-text">
                    <h2 className="project-name">{project.title}</h2>
                    <p className="project-categories">
                      {project.technologies.join(', ')}
                    </p>
                  </div>
                  <div className="project-arrow">
                    <HiArrowUpRight />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="tools-section">
        <h2 className="tools-title">Mastered <span>Tools</span></h2>
        <p className="tools-subtitle">Proficient in industry-standard technologies <br /> and design tools.</p>

        <div className="tools-grid">
          {masteredTools.map((tool, idx) => (
            <div key={idx} className="tool-card">
              <div className="tool-icon-box">
                {tool.icon}
              </div>
              <div className="tool-info">
                <h3 className="tool-name">{tool.name}</h3>
                <p className="tool-desc">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="process-section">
        <h2 className="process-title">Work <span>Process</span></h2>
        <p className="process-subtitle">A glimpse into our collaborative and iterative development process.</p>

        <div className="process-grid">
          {workProcess.map((step, idx) => (
            <div key={idx} className="process-card">
              <div className="process-card-header">
                <div className="process-icon-box">
                  {step.icon}
                </div>
                <div className="process-number">{step.num}</div>
              </div>
              <div className="process-card-footer">
                <h3 className="process-card-title">{step.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Discuss />
      <Footer />
    </div>
  );
}