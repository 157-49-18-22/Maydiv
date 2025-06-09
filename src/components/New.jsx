'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './New.css';

const projects = [
  {
    title: 'Portfolio Website',
    image: '/portfolio.png',
    technologies: ['React', 'Next.js', 'CSS'],
    link: 'https://your-portfolio-link.com',
    startDate: 'Jan 2023',
    endDate: 'Mar 2023',
    description: 'A personal portfolio to showcase my work and skills. Features responsive design and smooth animations.',
    status: 'Completed',
  },
  {
    title: 'E-commerce Store',
    image: '/ecommerce.png',
    technologies: ['React', 'Redux', 'Node.js', 'MongoDB'],
    link: 'https://your-ecommerce-link.com',
    startDate: 'Apr 2023',
    endDate: 'Jul 2023',
    description: 'A full-featured e-commerce platform with cart, payment, and admin dashboard.',
    status: 'Completed',
  },
  {
    title: 'Blog Platform',
    image: '/blog.png',
    technologies: ['Next.js', 'Sanity.io', 'Styled Components'],
    link: 'https://your-blog-link.com',
    startDate: 'Aug 2023',
    endDate: 'Present',
    description: 'A modern blog platform with markdown support and live preview.',
    status: 'In Progress',
  },
];

export default function New() {
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

      <div className="projects-page">
        <h1 className="projects-title">My Projects</h1>
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
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="projects-list"
        >
          {projects.map((project, idx) => (
            <SwiperSlide key={idx}>
              <div className="project-card">
                <img src={project.image} alt={project.title} className="project-image" />
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
                <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
