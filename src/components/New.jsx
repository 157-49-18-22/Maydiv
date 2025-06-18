'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
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
    title: 'Mobile App1',
    image: '/1.7.webp',
    technologies: ['React', 'Next.js', 'CSS'],
    link: 'https://play.google.com/store/apps/details?id=com.blackhatcode.in.ssa_app.new&hl=en_US',
    startDate: 'Jan 2023',
    endDate: 'Mar 2023',
    description: 'A personal portfolio to showcase Our work and skills. Features responsive design and smooth animations.',
    status: 'Completed',
  },
  {
    title: 'Mobile App2',
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
    title: 'Mobile App3',
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
    title: 'Mobile App4',
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

  useEffect(() => {
    const timer1 = setTimeout(() => setCenterCardVisible(true), 200);
    const timer2 = setTimeout(() => setSideCardsVisible(true), 600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="services-container">
      {/* Hero Section */}
      <nav className="header-nav">
        <div className="header-logo">
          <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} />
        </div>
        <ul className="header-links">
          <li><Link href="/">Home</Link></li>
          <li className="dropdown">
            <span className="dropdown-toggle">Services</span>
            <ul className="dropdown-menu">
              <li><Link href="/real-projects">Web Development</Link></li>
              <li><Link href="/real-services">UI/UX Design</Link></li>
              <li><Link href="/real-testimonials">Social Media and Marketing</Link></li>
              <li><Link href="/real-apps">App Development</Link></li>
              <li><Link href="/real-ai">AI</Link></li>
            </ul>
          </li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className="header-socials">
          <a href="#" aria-label="GitHub"><FaGithub /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
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
          <Lottie animationData={newAnimation} style={{ width: 320, height: 320 }} loop autoplay />
        </div>
      </div>

      <div className="projects-page">
        <h1 className="projects-title">our Projects</h1>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={typeof window !== 'undefined' && window.innerWidth < 900 ? 1 : 3}
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
                  href={
                    project.title === 'Mobile App1'
                     
                        ? 'https://play.google.com/store/apps/details?id=com.blackhatcode.in.ssa_app.new&hl=en_US'
                        : project.title === 'Mobile App2'
                          ? 'https://play.google.com/store/apps/details?id=com.rathifarms&hl=en_US'
                          : project.title === 'Mobile App3'
                            ? 'https://play.google.com/store/apps/details?id=com.myjobee&hl=en_US'
                            : project.title === 'Mobile App4'
                              ? 'https://play.google.com/store/apps/details?id=com.colyr&hl=en_US'
                              : project.title === 'College Website'
                                ? 'https://www.collegedisha.com/'
                                : project.title === 'Company Website'
                                  ? 'https://www.melanieindia.com/'
                                  : project.title === 'E-commerce Website'
                                    ? 'https://fika-india.com/'
                                    : project.link
                  }
                  className="project-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Visit Website
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