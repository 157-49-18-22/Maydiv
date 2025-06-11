'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './OurService.css';

const iconSize = 500; // px, adjust as needed

const services = [
  {
    id: 1,
    image: "/Web.png",
    alt: "Web Development",
    link: "/real-projects",
    className: 'service-card-img'
  },
  {
    id: 2,
    image: "/UI.png",
    alt: "UI/UX Design",
    link: "/real-services",
    className: 'service-card-img'
  },
  {
    id: 3,
    image: "/Social.png",
    alt: "Social Media",
    link: "/real-testimonials",
    className: 'service-card-img'
  },
  {
    id: 4,
    image: "/App.png",
    alt: "App Development",
    link: "/real-apps",
    className: 'service-card-img1'
  },
  {
    id: 5,
    image: "/Servicesai.png",
    alt: "ServicesAI",
    link: "/real-ai",
    className: 'service-card-img4'
  }
];

const OurService = () => {
  const [activeIndex, setActiveIndex] = useState(2); // center card by default
  const [phase, setPhase] = useState('center'); // 'center' or 'fan'

  React.useEffect(() => {
    const timer = setTimeout(() => setPhase('fan'), 1000); // 1 second
    return () => clearTimeout(timer);
  }, []);

  // Carousel navigation
  const goLeft = () => {
    setActiveIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };
  const goRight = () => {
    setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="our-services-section">
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
  style={{
 textAlign: 'center',
 letterSpacing: '2px',
 marginBottom: '2rem',
 fontWeight: 700,
 fontFamily: "'Inter', sans-serif",
 textTransform: 'uppercase',
 background: 'linear-gradient(90deg, #FF3BFF 30%, #6A37FF 70%, #4D22C8 25%, #D94FD5 100%)',
 WebkitBackgroundClip: 'text',
 WebkitTextFillColor: 'transparent',
        }}
      >
        OUR SERVICES
      </h2>

      <div className="carousel-row-container">
        <button className="carousel-arrow left" onClick={goLeft}>&lt;</button>
        <div className="carousel-row">
          {[-2, -1, 0, 1, 2].map((offset) => {
            let i = (activeIndex + offset + services.length) % services.length;
            const service = services[i];
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
            return (
              <Link href={service.link} key={service.id + '-' + offset}>
                <div
                  className={`service-card animated-card carousel-card`}
                  style={{
                    transform: `scale(${scale}) translateX(${offset * 60}px) translateY(${translateY}px) rotateY(${rotateY}deg)` ,
                    opacity,
                    zIndex,
                    filter: blur,
                    transition: 'transform 0.7s cubic-bezier(.4,2,.6,1), opacity 0.7s, filter 0.4s',
                    transitionDelay,
                  }}
                >
                  <Image
                    src={service.image}
                    alt={service.alt}
                    width={iconSize}
                    height={iconSize}
                    className={service.className}
                  />
                </div>
              </Link>
            );
          })}
        </div>
        <button className="carousel-arrow right" onClick={goRight}>&gt;</button>
      </div>
    </section>
  );
};

export default OurService;
