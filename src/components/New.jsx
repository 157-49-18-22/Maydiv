'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { FaGithub,FaInstagram, FaFacebook, FaRocket, FaPhone, FaSync, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './New.css';
import Discuss from './Discuss';
import Footer from './Footer';
import Lottie from 'lottie-react';
import newAnimation from '../../public/new.json';

const projects = [
  {
    title: 'Mobile App',
    image: '/1.7.webp',
    technologies: ['React', 'Next.js', 'CSS'],
    link: 'https://play.google.com/store/apps/details?id=com.blackhatcode.in.ssa_app.new&hl=en_US',
    startDate: 'Jan 2023',
    endDate: 'Mar 2023',
    description: 'A personal portfolio to showcase Our work and skills. Features responsive design and smooth animations.',
    status: 'Completed',
  },
  {
    title: 'Mobile App',
    image: '/2.7.webp',
    technologies: ['React', 'Redux', 'Node.js', 'MongoDB'],
    link: 'https://play.google.com/store/apps/details?id=com.rathifarms&hl=en_US',
    startDate: 'Apr 2023',
    endDate: 'Jul 2023',
    description: 'A full-featured e-commerce platform with cart, payment, and admin dashboard.',
    status: 'Completed',
  },
  {
    title: 'Company website',
    image: '/3.7.png',
    technologies: ['Next.js', 'Sanity.io', 'Styled Components'],
    link: 'https://www.melanieindia.com/',
    startDate: 'Aug 2023',
    endDate: 'Present',
    description: 'A modern blog platform with markdown support and live preview.',
    status: 'In Progress',
  },
  {
    title: 'Mobile App',
    image: '/4.7.webp',
    technologies: ['React', 'Styled Components'],
    link: 'https://play.google.com/store/apps/details?id=com.myjobee&hl=en_US',
    startDate: 'Feb 2024',
    endDate: 'Mar 2024',
    description: 'A modern landing page for a SaaS product.',
    status: 'Completed',
  },
  {
    title: 'College Website',
    image: '/5.7.png',
    technologies: ['Vue.js', 'Vuetify', 'Firebase'],
    link: 'https://www.collegedisha.com/',
    startDate: 'May 2024',
    endDate: 'Jun 2024',
    description: 'A real-time dashboard for analytics and reporting.',
    status: 'Completed',
  },
  {
    title: 'E-commerce website',
    image: '/6.7.png',
    technologies: ['React Native', 'Expo'],
    link: 'https://fika-india.com/',
    startDate: 'Jul 2024',
    endDate: 'Present',
    description: 'A cross-platform mobile app for productivity.',
    status: 'In Progress',
  },
  {
    title: 'Mobile App',
    image: '/7.7.webp',
    technologies: ['React Native', 'Expo'],
    link: 'https://play.google.com/store/apps/details?id=com.colyr&hl=en_US',
    startDate: 'Jul 2024',
    endDate: 'Present',
    description: 'A cross-platform mobile app for productivity.',
    status: 'In Progress',
  },
];

export default function New() {
  const [centerCardVisible, setCenterCardVisible] = useState(false);
  const [sideCardsVisible, setSideCardsVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDropdownOpen, setDrawerDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [spaceBetween, setSpaceBetween] = useState(0);
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    // Auto-refresh once per session, instantly
    if (typeof window !== 'undefined' && !sessionStorage.getItem('newPageRefreshed')) {
      sessionStorage.setItem('newPageRefreshed', 'true');
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => setCenterCardVisible(true), 200);
    const timer2 = setTimeout(() => setSideCardsVisible(true), 600);
    // Responsive slidesPerView
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setIsMobile(true);
        setSlidesPerView(1.2);
        setSpaceBetween(12);
      } else {
        setIsMobile(false);
        setSlidesPerView(3);
        setSpaceBetween(0);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', handleResize);
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
      <nav className="header-nav">
        <div className="header-logo">
          <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} />
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
              <span className="dropdown-toggle" style={{marginBottom: '10px'}}>Services</span>
              <ul className="dropdown-menu" style={{display: dropdownOpen ? 'flex' : 'none', opacity: dropdownOpen ? 1 : 0, pointerEvents: dropdownOpen ? 'auto' : 'none', transform: dropdownOpen ? 'translateX(-50%) translateY(0) scale(1)' : 'translateX(-50%) translateY(10px) scale(0.95)'}}>
                <li><Link href="/real-projects"><span><FaCode className="dropdown-icon" /> Web Development</span></Link></li>
                <li><Link href="/real-services"><span><FaPalette className="dropdown-icon" /> UI/UX Design</span></Link></li>
                <li><Link href="/real-testimonials"><span><FaBullhorn className="dropdown-icon" /> Social Media and Marketing</span></Link></li>
                <li><Link href="/real-apps"><span><FaMobileAlt className="dropdown-icon" /> App Development</span></Link></li>
                <li><Link href="/real-ai"><span><FaBrain className="dropdown-icon" /> Artificial Intelligence</span></Link></li>
              </ul>
            </li>
            <li><Link href="/new"><span>Projects</span></Link></li>
            <li><Link href="/contact"><span>Contact</span></Link></li>
            <li><Link href="/about"><span>About Us</span></Link></li>

          </ul>
        )}
        {/* Burger menu for mobile (only render on mobile) */}
        {isMobile && (
          <button className="burger-menu" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
            <FaBars />
          </button>
        )}
        <div className="header-socials">
        <a href="https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.facebook.com/profile.php?id=615720000000000" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
      </nav>
      {/* Mobile Drawer (only render on mobile) */}
      {isMobile && (
        <div className={`mobile-drawer${drawerOpen ? ' open' : ''}`}>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <FaTimes />
        </button>
          <ul>
            <li><Link href="/" onClick={() => setDrawerOpen(false)}>Home</Link></li>
            <li>
              <button className={`drawer-dropdown${drawerDropdownOpen ? ' open' : ''}`} onClick={() => setDrawerDropdownOpen(v => !v)}>
                Services <FaChevronDown style={{marginLeft: 8, transform: drawerDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s'}} />
                </button>
              <div className={`drawer-dropdown-list${drawerDropdownOpen ? ' open' : ''}`} style={{display: drawerDropdownOpen ? 'flex' : 'none'}}>
                <Link href="/real-projects" onClick={() => setDrawerOpen(false)}><span><FaCode className="dropdown-icon" /> Web Development</span></Link>
                <Link href="/real-services" onClick={() => setDrawerOpen(false)}><span><FaPalette className="dropdown-icon" /> UI/UX Design</span></Link>
                <Link href="/real-testimonials" onClick={() => setDrawerOpen(false)}><span><FaBullhorn className="dropdown-icon" /> Social Media and Marketing</span></Link>
                <Link href="/real-apps" onClick={() => setDrawerOpen(false)}><span><FaMobileAlt className="dropdown-icon" /> App Development</span></Link>
                <Link href="/real-ai" onClick={() => setDrawerOpen(false)}><span><FaBrain className="dropdown-icon" /> Artificial Intelligence</span></Link>
              </div>
              </li>
            <li><Link href="/new" onClick={() => setDrawerOpen(false)}>Projects</Link></li>
            <li><Link href="/contact" onClick={() => setDrawerOpen(false)}>Contact</Link></li>
            <li><Link href="/about" onClick={() => setDrawerOpen(false)}>About Us</Link></li>
            </ul>
          </div>
        )}

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
          <Lottie animationData={newAnimation} style={{ width: 320, height: 320 }} loop autoplay />
        </div>
      </div>

      <div className="projects-page">
        <h1 className="projects-title">our Projects</h1>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 180,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="projects-list"
        >
          {projects.map((project, idx) => (
            <SwiperSlide key={idx}>
              <div 
                className={`project-card ${centerCardVisible && idx === 0 ? 'show-center' : ''} ${sideCardsVisible && idx !== 0 ? 'show-side' : ''}`}
                onMouseEnter={() => {
                  // Optional: Add hover effect here if needed
                }}
              >
                {project.image && (
                  <img src={project.image} alt={project.title} className="project-image" />
                )}
                <div className="card-separator"></div>
                <h2 className="project-name">{project.title}</h2>
                <div className="project-dates">
                  <span className="project-date">🗓️ {project.startDate} - {project.endDate}</span>
                  <span className={`project-status ${project.status === 'Completed' ? 'completed' : 'inprogress'}`}>{project.status}</span>
                </div>
                <div className="project-desc">{project.description}</div>
                <div className="project-tech">
                  {project.technologies.map((tech, i) => (
                    <span className="tech-badge" key={i}>{tech}</span>
                  ))}
                </div>
                <a 
                  href={project.link}
                  className="project-link fancy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="top-key"></span>
                  <span className="text">Visit Website</span>
                  <span className="bottom-key-1"></span>
                  <span className="bottom-key-2"></span>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Discuss />
      <Footer />
    </div>
  );
}