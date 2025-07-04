'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './OurService.css';

const iconSize = 500; // px, adjust as needed

const services = [
  {
    id: 1,
    image: "/ourservice.png",
    alt: "Service Card",
    link: "/web-development",
    className: 'service-card-img'
  },
  {
    id: 2,
    image: "/ourservice.png",
    alt: "Service Card",
    link: "/apps/ui-ux",
    className: 'service-card-img'
  },
  {
    id: 5,
    image: "/ourservice.png",
    alt: "Service Card",
    link: "/ai",
    className: 'service-card-img4'
  },
  {
    id: 4,
    image: "/ourservice.png",
    alt: "Service Card",
    link: "/app-development",
    className: 'service-card-img1'
  },
  {
    id: 3,
    image: "/ourservice.png",
    alt: "Service Card",
    link: "/marketing",
    className: 'service-card-img'
  }
];


const cardTexts = [
  {
    
    title: 'Web Development',
    desc: 'From idea to launch — we build websites that work and wow.',
    className: 'card-item',
  },
  {
    
    title: 'UI/UX Design',
    desc: 'Crafting seamless digital journeys with clean, modern UI/UX.',
    className: 'card-item',
  },
  {
  
    title: 'AI',
    desc: 'Smart AI solutions that automate, predict, and optimize.',
    className: 'card-item',
  },
  {
   
    title: 'App Development',
    desc: 'Custom mobile apps designed to engage and scale',
    className: 'card-item',
  },
  {
  
    title: 'Social Media & Marketing',
    desc: 'Marketing that connects, engages, and drives results.',
    className: 'card-item',
  },
];



const OurService = () => {
  const [activeIndex, setActiveIndex] = useState(2); // center card by default
  const [phase, setPhase] = useState('center'); // 'center' or 'fan'
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef(null);

  // Reset state on mount
  useEffect(() => {
    setActiveIndex(2);
    setPhase('center');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setPhase('fan'), 1000); // 1 second
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer to reset animation/state when section comes into view
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveIndex(2);
          setPhase('center');
          setHoveredIndex(null);
          setIsAutoPlaying(true);
          setTimeout(() => setPhase('fan'), 1000);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
      }, 3000); // Move every 3 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying]);

  // Pause auto-play on hover
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setIsAutoPlaying(false);
  };

  // Resume auto-play when mouse leaves
  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsAutoPlaying(true);
  };

  // Carousel navigation
  const goLeft = () => {
    setActiveIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };
  const goRight = () => {
    setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="our-services-section" ref={sectionRef}>
      {/* Nucleus backgrounds */}
      <Image
        src="/Nucleus.png"
        alt="Nucleus 1"
        width={440}
        height={140}
        style={{
          position: 'absolute',
          left: '14%',
          top: '32%',
          transform: 'translateY(-50%)',
          opacity: 0.18,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <Image
        src="/Nucleus2.png"
        alt="Nucleus 2"
        width={440}
        height={140}
        style={{
          position: 'absolute',
          left: '73%',
          top: '30%',
          transform: 'translateY(-50%)',
          opacity: 0.18,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <Image
        src="/Nucleus3.png"
        alt="Nucleus 3"
        width={440}
        height={140}
        style={{
          position: 'absolute',
          left: '6%',
          top: '80%',
          transform: 'translateY(-50%)',
          opacity: 0.18,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <Image
        src="/Nucleus4.png"
        alt="Nucleus 4"
        width={530}
        height={140}
        style={{
          position: 'absolute',
          left: '63%',
          top: '80%',
          transform: 'translateY(-50%)',
          opacity: 0.18,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <h2
        className="our-services-gradient-title"
        style={{
          textAlign: 'center',
          letterSpacing: '2px',
          marginBottom: '2rem',
          fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
          textTransform: 'uppercase',
        }}
      >
        OUR SERVICES
      </h2>

      <div className="carousel-row-container">
        <div className="carousel-row">
          {[-2, -1, 0, 1, 2].map((offset) => {
            let i = (activeIndex + offset + services.length) % services.length;
            const service = services[i];
            const cardText = cardTexts[i];
            // Tilt effect
            let rotateY = 0;
            if (offset === -2) rotateY = -18;
            else if (offset === -1) rotateY = -9;
            else if (offset === 1) rotateY = 9;
            else if (offset === 2) rotateY = 18;
            // Animation logic
            let opacity = 1;
            let scale = offset === 0 ? 1 : 0.8;
            let zIndex = 10 - Math.abs(offset);
            let translateY = 0;
            let transitionDelay = '0s';
            if (phase === 'center') {
              if (offset !== 0) {
                opacity = 0;
                scale = 0.7;
                zIndex = 1;
                translateY = -80;
              } else {
                zIndex = 20;
              }
            } else if (phase === 'fan' && offset !== 0) {
              translateY = 0;
              transitionDelay = `${0.06 * (Math.abs(offset))}s`;
            }
            const blur = Math.abs(offset) === 2 ? 'blur(2px)' : 'none';
            
            // Add hover effect
            if (hoveredIndex === i) {
              scale = 1.1;
              zIndex = 50;
            }

            return (
              <Link href={service.link} key={service.id + '-' + offset}>
                <div
                  className={`service-card animated-card carousel-card`}
                  style={{
                    transform: `scale(${scale}) translateX(${offset * 60}px) translateY(${translateY}px) rotateY(${rotateY}deg)`,
                    opacity,
                    zIndex,
                    filter: blur,
                    transition: 'transform 0.7s cubic-bezier(.4,2,.6,1), opacity 0.7s, filter 0.4s',
                    transitionDelay,
                  
                  }}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    src={service.image}
                    alt={service.alt}
                    width={iconSize}
                    height={iconSize}
                    className={service.className}
                  />
                  {/* Text overlay */}
                  <div className="service-card-overlay">
                    <div className="service-card-number">{cardText.number}</div>
                    <div className="service-card-title-gradient">{cardText.title}</div>
                    <div className="service-card-desc">{cardText.desc}</div>
                    <div className="service-card-arrow">&rarr;</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Navigation Dots at the bottom center */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '12px' }}>
        {services.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              border: 'none',
              background: idx === activeIndex ? '#b983ff' : '#333',
              boxShadow: idx === activeIndex ? '0 0 8px #b983ff88' : 'none',
              cursor: 'pointer',
              transition: 'background 0.2s, box-shadow 0.2s',
              outline: 'none',
              padding: 0,
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default OurService;
