'use client';
import React from 'react';
import Image from 'next/image';

const Discuss = () => {
  return (
    <section style={{ background: '#0a0a0a', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5rem 0', position: 'relative' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'absolute', marginBottom: '-2.5rem', zIndex: 2,top:'25%' }}>
        <Image
          src="/star3.png"
          alt="Star Decoration"
          width={700}
          height={160}
          style={{ maxWidth: '100vw', height: 'auto', display: 'block'}}
        />
      </div>
      <div style={{ position: 'relative', width: '900px', maxWidth: '95vw', margin: '0 auto' }}>
        <Image
          src="/Discuss.png"
          alt="Discuss"
          width={900}
          height={300}
          style={{ width: '124%', height: 'auto', display: 'block', borderRadius: '2.5rem', marginLeft: '-12%' }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2.5rem 1.5rem',
        }}>
          <h2 style={{
            color: '#fff',
            fontWeight: 700,
            fontSize: '3.2rem',
            textAlign: 'center',
            margin: '0 0 2.5rem 0',
            letterSpacing: '2px',
            fontFamily: 'Inter, sans-serif',
            zIndex: 3,
            lineHeight: 1.1
          }}>
            LET'S DISCUSS<br />YOUR IDEAS
          </h2>
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', zIndex: 3 }}>
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
                fontWeight: 300
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
                fontWeight: 300
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
      </div>
    </section>
  );
};

export default Discuss; 