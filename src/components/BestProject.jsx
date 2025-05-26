import React from 'react';
import Image from 'next/image';
import './BestProject.css';

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
  return (
    <section className="best-project-section">
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
        {images.map((img, idx) => (
          <div key={img} className="best-project-image-wrapper">
            <Image
              src={img}
              alt={`Project ${idx + 1}`}
              width={480}
              height={340}
              className="best-project-image"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestProject; 