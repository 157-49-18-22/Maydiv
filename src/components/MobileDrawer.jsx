import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaChevronDown, FaCode, FaPalette, FaBullhorn, FaMobileAlt, FaBrain } from 'react-icons/fa';
import './MobileDrawer.css';

const MobileDrawer = ({
  drawerOpen,
  setDrawerOpen,
  drawerDropdownOpen,
  setDrawerDropdownOpen,
  isMobile
}) => {
  if (!isMobile) return null;
  return (
    <>
      <button className="burger-menu" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
        <FaBars />
      </button>
      <div className={`mobile-drawer${drawerOpen ? ' open' : ''}`}>
        <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu"><FaTimes /></button>
        <ul>
          <li><Link href="/" onClick={() => setDrawerOpen(false)}>Home</Link></li>
          <li>
            <button className={`drawer-dropdown${drawerDropdownOpen ? ' open' : ''}`} onClick={() => setDrawerDropdownOpen(v => !v)}>
              Services <FaChevronDown style={{ marginLeft: 8, transform: drawerDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            <div className={`drawer-dropdown-list${drawerDropdownOpen ? ' open' : ''}`} style={{ display: drawerDropdownOpen ? 'flex' : 'none' }}>
              <Link href="/web-development" onClick={() => setDrawerOpen(false)}><span><FaCode className="dropdown-icon" /> Web Development</span></Link>
              <Link href="/apps/ui-ux" onClick={() => setDrawerOpen(false)}><span><FaPalette className="dropdown-icon" /> UI/UX Design</span></Link>
              <Link href="/marketing" onClick={() => setDrawerOpen(false)}><span><FaBullhorn className="dropdown-icon" /> Social Media and Marketing</span></Link>
              <Link href="/app-development" onClick={() => setDrawerOpen(false)}><span><FaMobileAlt className="dropdown-icon" /> App Development</span></Link>
              <Link href="/ai" onClick={() => setDrawerOpen(false)}><span><FaBrain className="dropdown-icon" /> Artificial Intelligence</span></Link>
            </div>
          </li>
          <li><Link href="/projects" onClick={() => setDrawerOpen(false)}>Projects</Link></li>
          <li><Link href="/contact" onClick={() => setDrawerOpen(false)}>Contact</Link></li>
          <li><Link href="/about" onClick={() => setDrawerOpen(false)}>About Us</Link></li>
        </ul>
      </div>
    </>
  );
};

export default MobileDrawer; 