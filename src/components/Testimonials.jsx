'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import './Testimonials.css';
import Testimonial from './Testimonial';
import Discuss from './Discuss';
import Footer from './Footer';
import CountUp from 'react-countup';

const Testimonials = () => {
  return (
    <>
      <header className="header-container" style={{ overflowX: 'hidden' }}>
        <nav className="header-nav">
          <div className="header-logo">
            <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} />
          </div>
          <ul className="header-links">
            <li><Link href="#home">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/testimonials">Testimonials</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <div className="header-socials">
            <a href="#" aria-label="GitHub"><FaGithub /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
          </div>
        </nav>
      </header>

      <section className="marketing-hero-section">
        <div className="marketing-hero-graphic-star">
          <img src="/Star.png" alt="Decorative Star" />
        </div>
        <div className="marketing-hero-graphic-star1">
          <img src="/Star1.png" alt="Decorative Star1" />
        </div>
        <div className="marketing-hero-graphic-t2">
          <img src="/T2.png" alt="Decorative T2" />
        </div>
        <div className="marketing-hero-left">
          <div className="marketing-hero-graphic-t1">
            <img src="/T1.png" alt="Decorative T1" />
          </div>
          <h1 className="marketing-hero-heading">
            We make<br />
            <span className="highlight-marketing">Marketing</span> things<br />
            everyday
          </h1>
          <div className="marketing-hero-projects">
           
     
+          
+           <div className="marketing-hero-projects-label">Projects completed</div>
          </div>
          <button className="marketing-hero-btn">Let's Work Together</button>
        </div>
        <div className="marketing-hero-right">
          <div className="marketing-hero-user">
            {/* User image placeholder */}
          
          </div>
         
        </div>
        <div className="marketing-hero-graphic-t5">
          <img src="/T5.png" alt="Decorative T5" />
        </div>
        <div className="marketing-hero-graphic-t4">
          <img src="/T4.png" alt="Decorative T4" />
      </div>
      <p className="marketing-hero-tagline">driving your business forward,</p>
      <p className="marketing-hero-tagline1">with strong products marketing</p>
        <div className="marketing-hero-graphic-t3">
          <img src="/T3.png" alt="Decorative T3" />
          <img src="/950.png" alt="Overlay image" className="marketing-hero-graphic-950" />
          
      </div>
    </section>
    <section className="featured-in-section">
      <h2 className="featured-in-title">Featured in</h2>
      <div className="featured-in-logos">
        <div className="featured-in-logo-card"><img src="/Asus.png" alt="ASUS" /></div>
        <div className="featured-in-logo-card"><img src="/Alli.png" alt="Allianz" /></div>
        <div className="featured-in-logo-card"><img src="/Chase.png" alt="Chase" /></div>
        <div className="featured-in-logo-card"><img src="/New-york-times.png" alt="The New York Times" /></div>
        <div className="featured-in-logo-card"><img src="/Linkedin.png" alt="LinkedIn" /></div>
      </div>
    </section>
    <section className="expertise-section">
      <div className="expertise-grid">
        <div className="expertise-row expertise-row-top">
          <div className="expertise-card">
            <div className="expertise-icon"><img src="/Search.png" alt="Search Engine Optimization" /></div>
            <div className="expertise-title">Search Engine Optimization</div>
          </div>
          <div className="expertise-card">
            <div className="expertise-icon"><img src="/Website.png" alt="Website design & Development" /></div>
            <div className="expertise-title">Website design & Development</div>
          </div>
          <div className="expertise-info">
            <h2>Our Digital<br />Marketing Expertise</h2>
            <p>Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor Lorem ipsum dolor sit</p>
          </div>
        </div>
        <div className="expertise-row">
          <div className="expertise-card">
            <div className="expertise-icon"><img src="/Video.png" alt="Video editing & Production" /></div>
            <div className="expertise-title">Video editing & Production</div>
          </div>
          <div className="expertise-card">
            <div className="expertise-icon"><img src="/Content.png" alt="Content Writing" /></div>
            <div className="expertise-title">Content Writing</div>
          </div>
          <div className="expertise-card">
            <div className="expertise-icon"><img src="/Social1.png" alt="Social media Marketing" /></div>
            <div className="expertise-title">Social media Marketing</div>
          </div>
          <div className="expertise-card">
            <div className="expertise-icon"><img src="/Pay.png" alt="Pay per click (PPC)" /></div>
            <div className="expertise-title">Pay per click (PPC)</div>
          </div>
        </div>
      </div>
    </section>

    <section className="why-maydiv-section">
      <div className="why-maydiv-grid">
        <div className="why-maydiv-left">
          <img className="why-maydiv-bg" src="/Background.png" alt="Background" />
          <img className="why-maydiv-person" src="/Man1.png" alt="Person" />
          <img className="why-maydiv-revenue-img" src="/Revenue.png" alt="Revenue" />
        </div>
        <div className="why-maydiv-right">
          <div className="why-maydiv-customers">
            <span className="customers-label">Our Customers</span>
            <div className="customers-avatars-row">
              <img className="customer-avatar" src="/Pic1.png" alt="Customer 1" />
              <img className="customer-avatar" src="/Pic2.png" alt="Customer 2" />
              <img className="customer-avatar" src="/Pic3.png" alt="Customer 3" />
              <img className="customer-avatar" src="/Pic4.png" alt="Customer 4" />
              <span className="customers-count">+25K</span>
            </div>
          </div>
          <h2 className="why-maydiv-heading">Why should you choose Maydiv</h2>
          <p className="why-maydiv-desc">Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor Lorem ipsum dolor sit amet, consectetur sadipscing elitr.</p>
          <button className="why-maydiv-btn">AI us</button>
        </div>
      </div>
    </section>
    <section className="latest-work-section">
      <h2 className="latest-work-title">Our latest work</h2>
      <div className="latest-work-cards">
        <div className="latest-work-card-group">
          <div className="latest-work-card">
           
            <img src="/Artem.png" alt="Artem Icon" className="latest-work-icon" />
          </div>
          <div className="latest-work-card-content">
            <div className="latest-work-card-title">Artem - Digital Marketing campaign</div>
            <div className="latest-work-card-desc">Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod.</div>
          </div>
        </div>
        <div className="latest-work-card-group">
          <div className="latest-work-card">
         
            <img src="/Mayhem.png" alt="Mayhem Icon" className="latest-work-icon" />
          </div>
          <div className="latest-work-card-content">
            <div className="latest-work-card-title">Mayhem - Search engine Optimization</div>
            <div className="latest-work-card-desc">Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod.</div>
          </div>
        </div>
        <div className="latest-work-card-group">
          <div className="latest-work-card">
       
            <img src="/Basic.png" alt="Basic Icon" className="latest-work-icon" />
          </div>
          <div className="latest-work-card-content">
            <div className="latest-work-card-title">Basic - Pay per click (PPC)</div>
            <div className="latest-work-card-desc">Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod.</div>
          </div>
        </div>
      </div>
    </section>
    <section className="header-stats-section">
      <div className="header-stats-grid">
        <div className="header-stat">
          <div className="header-stat-number"><CountUp end={723} duration={2} />+</div>
          <div className="header-stat-label">Success Project</div>
        </div>
        <div className="header-stat-separator"></div>
        <div className="header-stat">
          <div className="header-stat-number"><CountUp end={10} duration={2} />+</div>
          <div className="header-stat-label">Years Experience</div>
        </div>
        <div className="header-stat-separator"></div>
        <div className="header-stat">
          <div className="header-stat-number"><CountUp end={500} duration={2} />+</div>
          <div className="header-stat-label">Products Launched</div>
        </div>
        <div className="header-stat-separator"></div>
        <div className="header-stat">
          <div className="header-stat-number"><CountUp end={100} duration={2} />+</div>
          <div className="header-stat-label">Startups Raised</div>
        </div>
      </div>
    </section>
       {/* Features Section (new) */}
      <Testimonial />
      <Discuss />
      <Footer />
   
    </>
  );
};

export default Testimonials;
