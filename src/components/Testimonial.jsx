'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import './Testimonial.css';

const testimonials = [
  '/testi1.png',
  '/testi2.png',
  '/testi3.png',
];

const VISIBLE = 3;

const Testimonial = () => {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  // Get the indices of the visible testimonials
  const getVisible = () => {
    const arr = [];
    for (let i = 0; i < VISIBLE; i++) {
      arr.push((active + i) % total);
    }
    return arr;
  };
  const visibleIdxs = getVisible();

  return (
    <section className="testimonial-section">
      <h2 className="testimonial-heading">What Our Clients Say About Us</h2>
      <div className="testimonial-slider-controls">
        <div className="testimonial-dots">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`testimonial-dot${active === idx ? ' active' : ''}`}
              onClick={() => setActive(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="testimonial-cards">
        {visibleIdxs.map((idx, i) => (
          <Image
            key={testimonials[idx]}
            src={testimonials[idx]}
            alt={`Testimonial ${idx + 1}`}
            width={472}
            height={520}
            className={`testimonial-card-img${i === 1 ? ' center' : i === 0 ? ' left' : ' right'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonial; 