"use client";

import { useState } from 'react';

export default function ClientLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

// Header component with useState
function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header>
      <div className="header-content">
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileNav}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <div className="logo">
          <div className="logo-icon">ST</div>
          <span>Swift Techy</span>
        </div>

        <nav className="desktop-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/cpus">CPUs</a></li>
            <li><a href="/gpus">GPUs</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/news">News</a></li>
          </ul>
        </nav>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search articles..." 
          />
        </div>
      </div>

      <nav className={`mobile-nav ${isMobileNavOpen ? 'active' : 'hidden'}`}>
        <ul>
          <li><a href="/" onClick={toggleMobileNav}>Home</a></li>
          <li><a href="/cpus" onClick={toggleMobileNav}>CPUs</a></li>
          <li><a href="/gpus" onClick={toggleMobileNav}>GPUs</a></li>
          <li><a href="/reviews" onClick={toggleMobileNav}>Reviews</a></li>
          <li><a href="/news" onClick={toggleMobileNav}>News</a></li>
        </ul>
      </nav>
    </header>
  );
}

// Footer component (no useState needed)
function Footer() {
  return (
    <footer>
      <div className="footer-content">
        {/* Your footer content remains the same */}
      </div>
    </footer>
  );
}