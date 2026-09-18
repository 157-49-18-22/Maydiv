'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaGithub, FaBars, FaTimes, FaChevronDown, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain, FaBriefcase, FaMapMarkerAlt, FaClock, FaGraduationCap } from 'react-icons/fa';
import SEOHead from './SEOHead';
import MobileDrawer from './MobileDrawer';
import Footer from './Footer';

import Testimonial from './Testimonial';
import './Header.css';
import './Career.css';

const Career = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDropdownOpen, setDrawerDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    // Navbar scroll effect
    const onScroll = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 350);
  };

  const careerData = [
    {
      id: 1,
      title: "Business Development Executive (Sales)",
      description: "Drive business growth, identify new prospective clients, and build strong client relationships.",
      image: "/Rectangle 2.png",
      category: "Sales",
      location: "Remote / On-site",
      type: "Full-time",
      experience: "1-3 years"
    },
    {
      id: 2,
      title: "Performance & Growth Marketing Specialist",
      description: "Plan and execute targeted ad campaigns, optimize conversion funnels, and drive inbound leads.",
      image: "/im89.png",
      category: "Marketing",
      location: "Remote / On-site",
      type: "Full-time",
      experience: "1-3 years"
    }
  ];

  const filteredCareers = activeFilter === 'All' 
    ? careerData 
    : careerData.filter(career => career.category === activeFilter);

  const mainCareers = filteredCareers;
  const topCareers = [];

  console.log('Career data:', careerData);
  console.log('Filtered careers:', filteredCareers);
  console.log('Main careers:', mainCareers);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      setResumeFile(file);
    } else {
      setSelectedFileName('');
      setResumeFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);
      if (resumeFile) {
        data.append('resume', resumeFile);
      }

      let response;
      try {
        response = await fetch('/career.php', {
          method: 'POST',
          body: data
        });
      } catch (err) {
        console.warn('Direct /career.php fetch failed, trying /api/career:', err);
        response = await fetch('/api/career', {
          method: 'POST',
          body: data
        });
      }

      let result;
      const text = await response.text();
      try {
        result = JSON.parse(text);
      } catch (jsonErr) {
        console.error('Server returned non-JSON response:', text);
        throw new Error(text.slice(0, 150) || 'Server returned invalid response');
      }

      if (response.ok && result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Thank you! Your application has been submitted successfully.'
        });
        setFormData({ name: '', email: '', message: '' });
        setResumeFile(null);
        setSelectedFileName('');
        const fileInput = document.getElementById('resume-upload');
        if (fileInput) fileInput.value = '';
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to submit application. Please try again.'
        });
      }
    } catch (error) {
      console.error('Submission error details:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "name": "Career Opportunities at Maydiv Digital Solutions",
    "description": "Join our team of talented professionals and work on exciting digital projects. We offer competitive salaries, flexible work arrangements, and opportunities for growth.",
    "url": "https://maydiv.com/career",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Maydiv Digital Solutions",
      "url": "https://maydiv.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://maydiv.com/logo.png"
      }
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Remote",
        "addressCountry": "India"
      }
    },
    "employmentType": ["FULL_TIME", "PART_TIME", "CONTRACTOR"],
    "workHours": "Flexible",
    "datePosted": "2024-01-01T00:00:00.000Z",
    "validThrough": "2024-12-31T23:59:59.000Z"
  };

  return (
    <div style={{ marginTop: 0, paddingTop: 0 }}>
      <SEOHead 
        pagePath="/career"
        defaultTitle="Careers | Maydiv Digital Solutions - Join Our Team"
        defaultDescription="Explore exciting career opportunities at Maydiv Digital Solutions. Join our team of talented professionals working on cutting-edge digital projects. Competitive salaries and flexible work arrangements."
        defaultKeywords="careers, jobs, employment, web development jobs, UI/UX designer jobs, digital marketing jobs, remote work, tech careers, software development careers"
      />
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <nav className={`header-nav${navScrolled ? ' scrolled' : ''}`}>
        <div className="header-logo">
          <Link href="/">
            <Image src="/logo.png" alt="MayDiv Logo" width={150} height={50} quality={100} unoptimized />
          </Link>
        </div>
        {/* Desktop nav links */}
        {mounted && !isMobile && (
          <ul className="header-links">
            <li><Link href="/">Home</Link></li>
            <li className="dropdown"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              onFocus={handleDropdownEnter}
              onBlur={handleDropdownLeave}
            >
              <span className="dropdown-toggle">Services</span>
              <ul className="dropdown-menu" style={{display: dropdownOpen ? 'flex' : 'none', opacity: dropdownOpen ? 1 : 0, pointerEvents: dropdownOpen ? 'auto' : 'none', transform: dropdownOpen ? 'translateX(-43%) translateY(0) scale(1)' : 'translateX(-50%) translateY(10px) scale(0.95)'}}>
                <li><Link href="/web-development"><span><FaCode className="dropdown-icon" /> Web Development</span></Link></li>
                <li><Link href="/apps/ui-ux"><span><FaPalette className="dropdown-icon" /> UI/UX Design</span></Link></li>
                <li><Link href="/marketing"><span><FaBullhorn className="dropdown-icon" /> Social Media and Marketing</span></Link></li>
                <li><Link href="/app-development"><span><FaMobileAlt className="dropdown-icon" /> App Development</span></Link></li>
                <li><Link href="/ai"><span><FaBrain className="dropdown-icon" /> Artificial Intelligence</span></Link></li>
              </ul>
            </li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/career">Career</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/about">About Us</Link></li>
          </ul>
        )}
        {/* MobileDrawer usage here */}
        <MobileDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          drawerDropdownOpen={drawerDropdownOpen}
          setDrawerDropdownOpen={setDrawerDropdownOpen}
          isMobile={isMobile}
        />
        <div className="header-socials">
          <a href="https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.facebook.com/profile.php?id=615720000000000" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        </div>
      </nav>
      
      <div className="career-image-container">
        <Image 
          src="/bg9.png" 
          alt="Career Background" 
          width={800} 
          height={400} 
          className="career-main-image"
        />
        <div className="career-overlay-text">
          <h1 className="career-overlay-title">Join a Team That Innovates</h1>
          <p className="career-overlay-subtitle">At Maydiv, we celebrate creativity, collaboration, and curiosity. From brainstorming sessions to team celebrations, every day is about creating impact together.</p>
        </div>
      </div>
      
      <div className="career-intro-section">
        <div className="career-intro-left">
          <hr className="career-intro-line" />
          <p className="career-intro-available">Agency Position Available</p>
          <h2 className="career-intro-title">Begin Your Career Here</h2>
        </div>
        <div className="career-intro-right">
          <hr className="career-intro-line" />
          <p className="career-intro-description">Kickstart your journey with Maydiv and grow in a dynamic, innovative, and collaborative environment. Your ideas, skills, and passion can make a real impact from day one.</p>
        </div>
      </div>
      
      <div className="career-main-content">
        <div className="career-jobs-section">
          <div className="career-jobs-intro">
            <p className="career-jobs-available">Agency Position Available</p>
            <hr className="career-jobs-line" />
            <h2 className="career-jobs-title">Begin Your Career Here</h2>
            <p className="career-jobs-description">Kickstart your journey with Maydiv and grow in a dynamic, innovative, and collaborative environment. Your ideas, skills, and passion can make a real impact from day one.</p>
          </div>
          
          <div className="career-jobs-list">
            {mainCareers.length > 0 ? (
              mainCareers.map((career, index) => (
                <div key={career.id} className="career-job-card">
                  <div className="career-job-content">
                    <h3 className="career-job-title">{career.title}</h3>
                    <p className="career-job-location">Location: {career.location}</p>
                    <p className="career-job-description">{career.description}</p>
                  </div>
                  <div className="career-job-arrow">
                    <FaChevronDown />
                  </div>
                </div>
              ))
            ) : (
              <div className="no-careers-message">
                <h3>No positions found for this category</h3>
                <p>Try selecting a different filter to see more opportunities.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="right-contact-section">
          <div className="contact-image-wrapper">
            <Image 
              src="/14140043_5384284 1.png" 
              alt="Career Growth Illustration" 
              width={400} 
              height={300} 
              className="career-growth-image"
            />
          </div>
          
          <h2 className="contact-section-title">Get In Touch</h2>
          
          <form 
            className="contact-form-wrapper"
            onSubmit={handleSubmit}
          >
            {submitStatus.message && (
              <div style={{
                padding: '0.8rem 1rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                marginBottom: '0.5rem',
                backgroundColor: submitStatus.type === 'success' ? 'rgba(46, 213, 115, 0.15)' : 'rgba(255, 71, 87, 0.15)',
                color: submitStatus.type === 'success' ? '#2ed573' : '#ff4757',
                border: submitStatus.type === 'success' ? '1px solid #2ed573' : '1px solid #ff4757',
                textAlign: 'center'
              }}>
                {submitStatus.type === 'success' ? '✅ ' : '⚠️ '}
                {submitStatus.message}
              </div>
            )}

            <div className="form-field">
              <FaBriefcase className="field-icon" />
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name" 
                className="contact-input" 
                required 
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-field">
              <FaBriefcase className="field-icon" />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email" 
                className="contact-input" 
                required 
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-field">
              <FaBriefcase className="field-icon" />
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message" 
                className="contact-textarea"
                required
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            <div className="form-field file-field">
              <FaBriefcase className="field-icon" />
              <input 
                type="file" 
                name="resume"
                accept=".pdf,.doc,.docx,.txt" 
                className="contact-file-input" 
                id="resume-upload"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
              <label htmlFor="resume-upload" className="file-label">
                {selectedFileName ? `📄 ${selectedFileName}` : 'Upload Resume/CV'}
              </label>
            </div>
            
            <button 
              type="submit" 
              className="contact-send-btn"
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
            >
              {isSubmitting ? 'Submitting...' : 'Send'}
            </button>
          </form>
          
          <div className="company-contact-info">
            <div className="contact-detail">
              <FaMapMarkerAlt className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Location</span>
                <span className="detail-text">SCO-105 Second Floor World street, Faridabad, HR 121004</span>
              </div>
            </div>
            
            <div className="contact-detail">
              <FaBriefcase className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Email</span>
                <span className="detail-text">career@maydiv.com</span>
              </div>
            </div>

            <div className="contact-detail">
              <FaBriefcase className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Number</span>
                <span className="detail-text">+91 9220438999</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonial />
      
      <Footer />
    </div>
  );
};

export default Career;