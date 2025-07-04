import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes, FaChevronDown, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain, FaInstagram, FaFacebook, FaGithub, FaRegLightbulb } from 'react-icons/fa';
import './MobileDrawer.css';

const socialLinks = [
  { href: 'https://www.instagram.com/maydiv_infotech?igsh=YjE4YnB5NmJ0MzFy', icon: <FaInstagram />, label: 'Instagram' },
  { href: 'https://www.facebook.com/profile.php?id=615720000000000', icon: <FaFacebook />, label: 'Facebook' },
  { href: 'https://github.com/', icon: <FaGithub />, label: 'GitHub' },
];

const MobileDrawer = ({
  drawerOpen,
  setDrawerOpen,
  drawerDropdownOpen,
  setDrawerDropdownOpen,
  isMobile
}) => {
  const [theme, setTheme] = useState('dark');
  if (!isMobile) return null;

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.body.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <button className="burger-menu" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
        <FaBars />
      </button>
      <div className={`mobile-drawer${drawerOpen ? ' open' : ''} glass-bg`}>
        <div className="drawer-top-bar">
          <button className="theme-toggle top" onClick={handleThemeToggle} aria-label="Toggle theme">
            <FaRegLightbulb style={{ color: theme === 'light' ? '#FFD600' : '#fff', fontSize: '1.5rem' }} />
          </button>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu"><FaTimes /></button>
        </div>
        <div className="drawer-profile">
          <Image src="/Lo.png" alt="MayDiv Logo" width={60} height={60} className="drawer-logo" />
          <div className="drawer-tagline">Welcome to MayDiv</div>
        </div>
        <ul className="drawer-list">
          <li><Link href="/" onClick={() => setDrawerOpen(false)}>Home</Link></li>
          <li>
            <button className={`drawer-dropdown${drawerDropdownOpen ? ' open' : ''}`} onClick={() => setDrawerDropdownOpen(v => !v)} aria-expanded={drawerDropdownOpen} aria-controls="drawer-services-list">
              <span>Services <FaChevronDown style={{ marginLeft: 8, transform: drawerDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} /></span>
            </button>
            <div id="drawer-services-list" className={`drawer-dropdown-list${drawerDropdownOpen ? ' open' : ''}`} style={{ display: drawerDropdownOpen ? 'flex' : 'none' }}>
              <Link href="/web-development" onClick={() => setDrawerOpen(false)}><span><FaCode className="dropdown-icon" /> Web Development</span></Link>
              <Link href="/apps/ui-ux" onClick={() => setDrawerOpen(false)}><span><FaPalette className="dropdown-icon" /> UI/UX Design</span></Link>
              <Link href="/marketing" onClick={() => setDrawerOpen(false)}><span><FaBullhorn className="dropdown-icon" /> Social Media & Marketing</span></Link>
              <Link href="/app-development" onClick={() => setDrawerOpen(false)}><span><FaMobileAlt className="dropdown-icon" /> App Development</span></Link>
              <Link href="/ai" onClick={() => setDrawerOpen(false)}><span><FaBrain className="dropdown-icon" /> Artificial Intelligence</span></Link>
            </div>
          </li>
          <li><Link href="/projects" onClick={() => setDrawerOpen(false)}>Projects</Link></li>
          <li><Link href="/contact" onClick={() => setDrawerOpen(false)}>Contact</Link></li>
          <li><Link href="/about" onClick={() => setDrawerOpen(false)}>About Us</Link></li>
        </ul>
        <div className="drawer-bottom">
          <div className="drawer-socials">
            {socialLinks.map((s, i) => (
              <a key={i} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">{s.icon}</a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer; 