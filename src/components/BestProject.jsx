"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import './BestProject.css';
import Testimonial from './Testimonial';

const images = [
  '/Project 1.png', '/2.png',
  '/3.png', '/4.png',
  '/5.png', '/6.jpeg'
];

const filters = [

];

const BestProject = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [secondHovered, setSecondHovered] = useState(false);
  const [thirdHovered, setThirdHovered] = useState(false);
  const [fourthHovered, setFourthHovered] = useState(false);
  const [fifthHovered, setFifthHovered] = useState(false);
  const [sixthHovered, setSixthHovered] = useState(false);
  const [firstHovered, setFirstHovered] = useState(false);

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
          // Define links for each card
          const links = [
            'https://fika-india.com/',
            'https://www.melanieindia.com/',
            'https://www.collegedisha.com/',
            'https://schools18.com/',
            'https://play.google.com/store/apps/details?id=com.myjobee&hl=en_US',
            null // 6th card, no link
          ];
          const cardContent = (
            <>
              {/* Overlay Fik image on first card */}
              {idx === 0 && (
                <img
                  src="/Fik.png"
                  alt="Fik Overlay"
                  className={`melanie-overlay${firstHovered ? ' show' : ''}`}
                  style={{
                    position: 'absolute',
                    top: firstHovered ? 0 : '-120px',
                    left: '70%',
                    transform: 'translateX(-50%)',
                    width: '47%',
                    height: 'auto',
                    zIndex: 10,
                    pointerEvents: 'none',
                    transition: 'top 0.5s cubic-bezier(0.77,0,0.175,1), opacity 0.3s'
                  }}
                />
              )}
              {/* Overlay Melanie image on second card */}
              {idx === 1 && (
                <img
                  src="/Melanie.png"
                  alt="Melanie Overlay"
                  className={`melanie-overlay${secondHovered ? ' show' : ''}`}
                  style={{
                    position: 'absolute',
                    top: secondHovered ? 0 : '-120px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    height: 'auto',
                    zIndex: 10,
                    transition: 'top 0.5s cubic-bezier(0.77,0,0.175,1)'
                  }}
                />
              )}
              {/* Overlay College image on third card */}
              {idx === 2 && (
                <img
                  src="/College.png"
                  alt="College Overlay"
                  className={`melanie-overlay${thirdHovered ? ' show' : ''}`}
                  style={{
                    position: 'absolute',
                    top: thirdHovered ? 0 : '-120px',
                    left: '70%',
                    transform: 'translateX(-50%)',
                    width: '49%',
                    height: 'auto',
                    zIndex: 10,
                    pointerEvents: 'none',
                    transition: 'top 0.5s cubic-bezier(0.77,0,0.175,1), opacity 0.3s'
                  }}
                />
              )}
              {/* Overlay School image on fourth card */}
              {idx === 3 && (
                <img
                  src="/School.png"
                  alt="School Overlay"
                  className={`melanie-overlay${fourthHovered ? ' show' : ''}`}
                  style={{
                    position: 'absolute',
                    top: fourthHovered ? 0 : '-120px',
                   
                    left: '70%',
                    width: '49%',
                    height: 'auto',
                    zIndex: 10,
                    pointerEvents: 'none',
                    transition: 'top 0.5s cubic-bezier(0.77,0,0.175,1), opacity 0.3s'
                  }}
                />
              )}
              {/* Overlay Job image on fifth card */}
              {idx === 4 && (
                <img
                  src="/Job.png"
                  alt="Job Overlay"
                  className={`melanie-overlay${fifthHovered ? ' show' : ''}`}
                  style={{
                    position: 'absolute',
                    top: fifthHovered ? 0 : '-120px',
                    left: '70%',
                    width: '49%',
                    height: 'auto',
                    zIndex: 10,
                    pointerEvents: 'none',
                    transition: 'top 0.5s cubic-bezier(0.77,0,0.175,1), opacity 0.3s'
                  }}
                />
              )}
              {/* Overlay Tm image on sixth card */}
              {idx === 5 && (
                <img
                  src="/Tm.png"
                  alt="Tm Overlay"
                  className={`melanie-overlay${sixthHovered ? ' show' : ''}`}
                  style={{
                    position: 'absolute',
                    top: sixthHovered ? 0 : '-120px',
                    left: '70%',
                    width: '49%',
                    height: 'auto',
                    zIndex: 10,
                    pointerEvents: 'none',
                    transition: 'top 0.5s cubic-bezier(0.77,0,0.175,1), opacity 0.3s'
                  }}
                />
              )}
              <Image
                src={img}
                alt={`Project ${idx + 1}`}
                width={480}
                height={340}
                className="best-project-image"
              />
            </>
          );
          // If link exists, wrap card in <a>
          return links[idx] ? (
            <a
              key={img}
              href={links[idx]}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                className={`best-project-image-wrapper ${inView ? (isLeft ? 'slide-in-left' : 'slide-in-right') : ''}`}
                onMouseEnter={() => {
                  if (idx === 0) setFirstHovered(true);
                  if (idx === 1) setSecondHovered(true);
                  if (idx === 2) setThirdHovered(true);
                  if (idx === 3) setFourthHovered(true);
                  if (idx === 4) setFifthHovered(true);
                  if (idx === 5) setSixthHovered(true);
                }}
                onMouseLeave={() => {
                  if (idx === 0) setFirstHovered(false);
                  if (idx === 1) setSecondHovered(false);
                  if (idx === 2) setThirdHovered(false);
                  if (idx === 3) setFourthHovered(false);
                  if (idx === 4) setFifthHovered(false);
                  if (idx === 5) setSixthHovered(false);
                }}
                style={{ position: 'relative' }}
              >
                {cardContent}
              </div>
            </a>
          ) : (
            <div
              key={img}
              className={`best-project-image-wrapper ${inView ? (isLeft ? 'slide-in-left' : 'slide-in-right') : ''}`}
              onMouseEnter={() => {
                if (idx === 0) setFirstHovered(true);
                if (idx === 1) setSecondHovered(true);
                if (idx === 2) setThirdHovered(true);
                if (idx === 3) setFourthHovered(true);
                if (idx === 4) setFifthHovered(true);
                if (idx === 5) setSixthHovered(true);
              }}
              onMouseLeave={() => {
                if (idx === 0) setFirstHovered(false);
                if (idx === 1) setSecondHovered(false);
                if (idx === 2) setThirdHovered(false);
                if (idx === 3) setFourthHovered(false);
                if (idx === 4) setFifthHovered(false);
                if (idx === 5) setSixthHovered(false);
              }}
              style={{ position: 'relative' }}
            >
              {cardContent}
            </div>
          );
        })}
      </div>
      <Testimonial />
    </section>
  );
};

export default BestProject; 