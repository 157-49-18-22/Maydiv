'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import './Discuss.css';
import { FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';

const Discuss = () => {
  const [showModal, setShowModal] = useState(false);

  const handleFollowClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains('discuss-modal-overlay')) {
      setShowModal(false);
    }
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
    setShowModal(false);
  };

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
              onClick={() => window.open('https://wa.me/919220438999', '_blank')}
            >
              Connect Now
            </button>
            <button
              className="discuss-btn discuss-btn-follow"
              onClick={() => setShowModal((prev) => !prev)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem', minWidth: '120px' }}
            >
              {showModal ? (
                <>
                  <span onClick={e => { e.stopPropagation(); handleSocialClick('https://instagram.com/'); }} className="discuss-icon-btn" title="Instagram"><FaInstagram size={22} /></span>
                  <span onClick={e => { e.stopPropagation(); handleSocialClick('https://facebook.com/'); }} className="discuss-icon-btn" title="Facebook"><FaFacebook size={22} /></span>
                  <span onClick={e => { e.stopPropagation(); handleSocialClick('https://github.com/'); }} className="discuss-icon-btn" title="GitHub"><FaGithub size={22} /></span>
                </>
              ) : (
                'Follow us'
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discuss;
