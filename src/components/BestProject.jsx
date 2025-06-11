"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import './BestProject.css';
import Testimonial from './Testimonial';

const images = [
  '/1.png', '/2.png',
  '/3.png', '/4.png',
  '/5.png', '/6.png'
];

const filters = [
  { label: 'Design', active: true, icon: '/Design.png' },
  { label: 'Development', active: false, icon: '/Development.png' },
  { label: 'Digital Marketing', active: false, icon: '/Digital.png' },
  { label: 'SEO', active: false, icon: '/Seo.png' },
];

const BestProject = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="best-project-section" ref={sectionRef}>
      <h2 className="best-project-heading">BEST PROJECT.</h2>
      {/* Filter Bar */}
      <div className="best-project-filter-bar">
        {filters.map((filter) => (
          <button
            key={filter.label}
            className={`best-project-filter-btn${filter.active ? ' active' : ''}`}
          >
            <img src={filter.icon} alt={filter.label + ' icon'} />
            {filter.label}
          </button>
        ))}
      </div>
      <div className="best-project-grid">
        {images.map((img, idx) => {
          // Left column: even idx, right column: odd idx
          const isLeft = idx % 2 === 0;
          return (
            <div
              key={img}
              className={`best-project-image-wrapper ${inView ? (isLeft ? 'slide-in-left' : 'slide-in-right') : ''}`}
            >
              <Image
                src={img}
                alt={`Project ${idx + 1}`}
                width={480}
                height={340}
                className="best-project-image"
              />
            </div>
          );
        })}
      </div>
      <Testimonial />
    </section>
  );
};

export default BestProject; 