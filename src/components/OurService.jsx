import React from 'react';
import Image from 'next/image';
import './OurService.css';

const services = [
  { img: '/Web.png' },
  { img: '/UI.png' },
  { img: '/Social.png' },
];

const iconSize = 500; // px, adjust as needed

const OurService = () => {
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

<h2 style={{ 
  textAlign: 'center', 
  color: '#b983ff', 
  letterSpacing: '2px', 
  marginBottom: '2rem', 
  fontWeight: 700,
  fontFamily: "'Inter', sans-serif",
  textTransform: 'uppercase'
}}>OUR SERVICES</h2>
      <div className="our-services-cards">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="service-card"
          >
            <Image
              src={service.img}
              alt={`Service ${idx + 1}`}
              width={iconSize}
              height={iconSize}
              className="service-card-img"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurService;
