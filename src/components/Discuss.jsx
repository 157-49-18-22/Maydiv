'use client';
import React from 'react';
import Image from 'next/image';
import './Discuss.css';

const Discuss = () => {
  return (
    <section className="discuss-section">
      <div className="discuss-star-wrapper">
        <Image
          src="/star3.png"
          alt="Star Decoration"
          width={700}
          height={160}
          className="discuss-star-img"
        />
      </div>
      <div className="discuss-main-img-wrapper">
        <Image
          src="/Discuss.png"
          alt="Discuss"
          width={900}
          height={300}
          className="discuss-main-img"
        />
        <div className="discuss-content-overlay">
          <h2 className="discuss-title">
            LET'S DISCUSS<br />YOUR IDEAS
          </h2>
          <div className="discuss-btn-group">
            <button
              className="discuss-btn discuss-btn-connect"
              onClick={() => window.open('/contact', '_blank')}
            >
              Connect Now
            </button>
            <button
              className="discuss-btn discuss-btn-follow"
              onClick={() => window.open('/contact', '_blank')}
            >
              Follow us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discuss;
