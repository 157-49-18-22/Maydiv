import React from 'react';
import Image from 'next/image';
import './About.css';

export default function TrustedLogos() {
  return (
    <section className="trusted-logos-section">
      <div className="trusted-logos-badge">Trusted By 250+ Companies</div>
      <div className="trusted-logos-slider">
        <div className="trusted-logos-slider-track">
          <div className="trusted-logo-pair">
            <Image src="/1.1.png" alt="Zapier Gray" width={120} height={60} quality={100} className="about-logo logo-gray" />
            <Image src="/Zapier.png" alt="Zapier Color" width={120} height={60} quality={100} className="about-logo logo-color" />
          </div>
          <div className="trusted-logo-pair">
            <Image src="/2.2.png" alt="Spotify Gray" width={120} height={60} quality={100} className="about-logo logo-gray" />
            <Image src="/Spotify.png" alt="Spotify Color" width={120} height={60} quality={100} className="about-logo logo-color" />
          </div>
          <div className="trusted-logo-pair">
            <Image src="/3.3.png" alt="Zoom Gray" width={120} height={60} quality={100} className="about-logo logo-gray" />
            <Image src="/Zoom.png" alt="Zoom Color" width={120} height={60} quality={100} className="about-logo logo-color" />
          </div>
          <div className="trusted-logo-pair">
            <Image src="/4.4.png" alt="Slack Gray" width={120} height={60} quality={100} className="about-logo logo-gray" />
            <Image src="/Slack.png" alt="Slack Color" width={120} height={60} quality={100} className="about-logo logo-color" />
          </div>
          <div className="trusted-logo-pair">
            <Image src="/5.5.png" alt="Amazon Gray" width={120} height={60} quality={100} className="about-logo logo-gray" />
            <Image src="/Amazon.png" alt="Amazon Color" width={120} height={60} quality={100} className="about-logo logo-color" />
          </div>
          <div className="trusted-logo-pair">
            <Image src="/6.6.png" alt="Adobe Gray" width={120} height={60} quality={100} className="about-logo logo-gray" />
            <Image src="/Adobe.png" alt="Adobe Color" width={120} height={60} quality={100} className="about-logo logo-color" />
          </div>
          {/* Duplicate for seamless loop */}
          <div className="trusted-logo-pair">
            <Image src="/1.1.png" alt="Zapier Gray" width={120} height={60} quality={100} className="about-logo logo-gray" />
            <Image src="/Zapier.png" alt="Zapier Color" width={120} height={60} quality={100} className="about-logo logo-color" />
          </div>
          <div className="trusted-logo-pair">
            <Image src="/2.2.png" alt="Spotify Gray" width={120} height={60} quality={100} className="about-logo logo-gray" />
            <Image src="/Spotify.png" alt="Spotify Color" width={120} height={60} quality={100} className="about-logo logo-color" />
          </div>
          <div className="trusted-logo-pair">
            <Image src="/3.3.png" alt="Zoom Gray" width={120} height={60} quality={100} className="about-logo logo-gray" />
            <Image src="/Zoom.png" alt="Zoom Color" width={120} height={60} quality={100} className="about-logo logo-color" />
          </div>
          <div className="trusted-logo-pair">
            <Image src="/4.4.png" alt="Slack Gray" width={120} height={60} quality={100} className="about-logo logo-gray" />
            <Image src="/Slack.png" alt="Slack Color" width={120} height={60} quality={100} className="about-logo logo-color" />
          </div>
          <div className="trusted-logo-pair">
            <Image src="/5.5.png" alt="Amazon Gray" width={120} height={60} quality={100} className="about-logo logo-gray" />
            <Image src="/Amazon.jfif" alt="Amazon Color" width={120} height={60} quality={100} className="about-logo logo-color" />
          </div>
          <div className="trusted-logo-pair">
            <Image src="/6.6.png" alt="Adobe Gray" width={120} height={60} quality={100} className="about-logo logo-gray" />
            <Image src="/Adobe.png" alt="Adobe Color" width={120} height={60} quality={100} className="about-logo logo-color" />
          </div>
        </div>
      </div>
    </section>
  );
} 