'use client';
import React from 'react';
import Image from 'next/image';

const Discuss = () => {
  return (
    <section style={{ background: '#0a0a0a', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5rem 0' }}>
      <div style={{ background: 'linear-gradient(180deg, #d414c6 0%, #7e3ff2 100%)', borderRadius: '2.5rem', padding: '5rem 3rem', maxWidth: 1200, width: '96%', minHeight: 180, textAlign: 'center', boxShadow: '0 12px 48px 0 rgba(31, 38, 135, 0.22)' }}>
        <Image
          src="/Lets.png"
          alt="Let's Discuss"
          width={900}
          height={120}
          style={{ maxWidth: '90%', margin: '0 auto 48px', display: 'block', height: 'auto' }}
        />
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginTop: 40 }}>
          <button
            style={{
              padding: '16px 44px',
              fontSize: '1.25rem',
              borderRadius: 40,
              background: '#000',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontWeight: 700
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.boxShadow = '0 0 10px #fff, 0 0 20px #fff';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#000';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.boxShadow = 'none';
            }}
            
            onClick={() => window.open('/contact', '_blank')}
          >
            Connect Now
          </button>
          
          <button
            style={{
              padding: '16px 44px',
              fontSize: '1.25rem',
              borderRadius: 40,
              background: 'transparent',
              color: '#fff',
              border: '2.5px solid #fff',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontWeight: 700
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#a100ff';
              e.currentTarget.style.borderColor = '#a100ff';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = '#fff';
            }}
            onClick={() => window.open('https://your-follow-link.com', '_blank')}
          >
            Follow us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Discuss; 