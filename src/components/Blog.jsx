'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaGithub, FaBars, FaTimes, FaChevronDown, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain } from 'react-icons/fa';
import SEOHead from './SEOHead';
import MobileDrawer from './MobileDrawer';
import Footer from './Footer';
import Testimonial from './Testimonial';
import './Header.css';
import './Blog.css';

const Blog = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDropdownOpen, setDrawerDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const dropdownTimeout = useRef(null);

  useEffect(() => {
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

  const blogData = [
    {
      id: 1,
      title: "Why UX Design is the secret weapon for business growth",
      description: "A stunning design isn't just about looks—it's about user experience. Discover how a strong UX strategy can improve customer satisfaction, boost conversions, and give your brand a competitive edge.",
      image: "/Rectangle 2.png",
      category: "Business Growth",
      isReversed: false
    },
    {
      id: 2,
      title: "AI & Automation: transforming businesses beyond expectations",
      description: "Artificial Intelligence is no longer a buzzword—it's a business essential. Learn how AI and automation are reshaping industries, optimizing workflows, and driving smarter decisions.",
      image: "/Rectangle 2 (1).png",
      category: "Tech & Innovation",
      isReversed: true
    },
    {
      id: 3,
      title: "The future of web development what businesses should expect in 2025",
      description: "Traditional CMS platforms limit flexibility. Discover how headless CMS empowers businesses to deliver faster, scalable, and seamless digital experiences.",
      image: "/im89.png",
      category: "Tech & Innovation"
    },
    {
      id: 4,
      title: "Data-Driven Marketing: Turning Analytics into Action",
      description: "They say \"data is the new oil\"—and in today's digital-first world, it's truer than ever. But raw data alone has little value unless it's analyzed, understood, and transformed into action.",
      image: "/img (1).png",
      category: "Industry Trends"
    },
    {
      id: 5,
      title: "Why Video Content is the King of Engagement in 2025",
      description: "Scrolling through social media today, one thing is clear—video content dominates. From TikTok Reels to YouTube Shorts, brands are competing for attention in seconds.",
      image: "/img (2).png",
      category: "Industry Trends"
    }
  ];

  const filteredBlogs = activeFilter === 'All' 
    ? blogData 
    : blogData.filter(blog => blog.category === activeFilter);

  const mainBlogs = filteredBlogs.slice(0, 2);
  const topBlogs = filteredBlogs.slice(2);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Maydiv Digital Solutions Blog",
    "description": "Latest insights on web development, AI, digital solutions, and technology trends",
    "url": "https://maydiv.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Maydiv Digital Solutions",
      "url": "https://maydiv.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://maydiv.com/logo.png"
      }
    },
    "blogPost": blogData.map(blog => ({
      "@type": "BlogPosting",
      "headline": blog.title,
      "description": blog.description,
      "datePublished": new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "name": "Maydiv Digital Solutions"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Maydiv Digital Solutions"
      }
    }))
  };

  return (
    <>
      <SEOHead 
        pagePath="/blog"
        defaultTitle="Blog | Maydiv Digital Solutions - Latest Tech Insights & Digital Solutions"
        defaultDescription="Read our latest insights on web development, AI, digital solutions, and technology trends. Expert articles on UI/UX, marketing, and business growth strategies."
        defaultKeywords="blog, web development, AI, digital solutions, technology insights, UI/UX design, digital marketing, business growth, tech trends, software development"
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
        {!isMobile && (
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
      
      <div className="blog-image-container">
        <Image 
          src="/bg9.png" 
          alt="Blog Background" 
          width={800} 
          height={400} 
          className="blog-main-image"
        />
        <div className="blog-overlay-text">
          <h1 className="blog-overlay-title">Insights & Ideas That Drive Digital Growth</h1>
          <p className="blog-overlay-subtitle">Stay updated with the latest trends, strategies, and innovations in digital solutions.</p>
        </div>
      </div>
      
      <div className="blog-filters">
        <button 
          className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
          onClick={() => handleFilterClick('All')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'Tech & Innovation' ? 'active' : ''}`}
          onClick={() => handleFilterClick('Tech & Innovation')}
        >
          Tech & Innovation
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'Business Growth' ? 'active' : ''}`}
          onClick={() => handleFilterClick('Business Growth')}
        >
          Business Growth
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'Industry Trends' ? 'active' : ''}`}
          onClick={() => handleFilterClick('Industry Trends')}
        >
          Industry Trends
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'Case Studies & Insights' ? 'active' : ''}`}
          onClick={() => handleFilterClick('Case Studies & Insights')}
        >
          Case Studies & Insights
        </button>
      </div>
      
      <div className="blog-cards-container">
        {mainBlogs.length > 0 ? (
          mainBlogs.map((blog, index) => (
            <div key={blog.id} className={`blog-card ${blog.isReversed ? 'ai-card' : ''}`}>
              {!blog.isReversed ? (
                <>
                  <div className="blog-card-content">
                    <h3 className="blog-card-title">{blog.title}</h3>
                    <p className="blog-card-description">{blog.description}</p>
                    <button className="fancy"><span className="top-key"></span><span className="text">Read More</span><span className="bottom-key-1"></span><span className="bottom-key-2"></span></button>
                  </div>
                  <div className="blog-card-image">
                    <Image src={blog.image} alt={blog.title} width={300} height={200} className="card-img" />
                  </div>
                </>
              ) : (
                <>
                  <div className="blog-card-image">
                    <Image src={blog.image} alt={blog.title} width={300} height={200} className="card-img" />
                  </div>
                  <div className="blog-card-content">
                    <h3 className="blog-card-title1">{blog.title}</h3>
                    <p className="blog-card-description1">{blog.description}</p>
                    <button className="fancy"><span className="top-key"></span><span className="text">Read More</span><span className="bottom-key-1"></span><span className="bottom-key-2"></span></button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="no-blogs-message">
            <h3>No blogs found for this category</h3>
            <p>Try selecting a different filter to see more content.</p>
          </div>
        )}
      </div>
      
      {topBlogs.length > 0 && (
        <div className="top-blogs-section">
          <h2 className="top-blogs-title">Top Blogs</h2>
          <div className="top-blogs-grid">
            {topBlogs.map((blog) => (
              <div key={blog.id} className="top-blog-card">
                <div className="top-blog-image">
                  <Image src={blog.image} alt={blog.title} width={300} height={200} className="top-card-img" />
                </div>
                <div className="top-blog-content">
                  <h3 className="top-blog-title">{blog.title}</h3>
                  <p className="top-blog-description">{blog.description}</p>
                  <button className="fancy"><span className="top-key"></span><span className="text">Read More</span><span className="bottom-key-1"></span><span className="bottom-key-2"></span></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Testimonial />
      
      <Footer />
    </>
  );
};

export default Blog;
