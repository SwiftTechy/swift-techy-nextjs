"use client";

import { useState } from 'react';
import Link from 'next/link';

function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <header>
      {/* Main Navigation Bar */}
      <div className="nav-bar">
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
            <Link href="/">Swift Techy</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/categories/cpu">CPUs</Link></li>
              <li><Link href="/categories/gpu">GPUs</Link></li>
              <li><Link href="/categories/review">Reviews</Link></li>
              <li><Link href="/categories/news">News</Link></li>
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
      </div>

      {/* Development Banner - Now part of header */}
      <div className="development-banner">
        <div className="banner-content">
          <div className="banner-icon">🚧</div>
          <div className="banner-text">
            <strong>Website in Active Development</strong>
            <span>Real hardware reviews & daily tech news launching soon!</span>
          </div>
        </div>
      </div>

      {/* Click outside overlay */}
      <div 
        className={`mobile-nav-overlay ${isMobileNavOpen ? 'active' : ''}`}
        onClick={closeMobileNav}
      />

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMobileNavOpen ? 'active' : ''}`}>
        <div className="mobile-nav-container">
          <ul>
            <li>
              <Link href="/" onClick={closeMobileNav}>
                <span>Home</span>
                <span className="nav-icon">🏠</span>
              </Link>
            </li>
            <li>
              <Link href="/categories/cpu" onClick={closeMobileNav}>
                <span>CPUs</span>
                <span className="nav-icon">⚡</span>
              </Link>
            </li>
            <li>
              <Link href="/categories/gpu" onClick={closeMobileNav}>
                <span>GPUs</span>
                <span className="nav-icon">🎮</span>
              </Link>
            </li>
            <li>
              <Link href="/categories/review" onClick={closeMobileNav}>
                <span>Reviews</span>
                <span className="nav-icon">⭐</span>
              </Link>
            </li>
            <li>
              <Link href="/categories/news" onClick={closeMobileNav}>
                <span>News</span>
                <span className="nav-icon">📰</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">ST</div>
            <Link href="/" className="footer-logo-text">Swift Techy</Link>
          </div>
          <p className="footer-description">
            Your trusted source for PC hardware news, reviews, and specifications.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Twitter">𝕏</a>
            <a href="#" className="social-icon" aria-label="GitHub">⚡</a>
            <a href="#" className="social-icon" aria-label="LinkedIn">in</a>
          </div>
        </div>
        
        <div className="footer-column">
          <h4>Categories</h4>
          <ul>
            <li><Link href="/categories/cpu">CPU Reviews</Link></li>
            <li><Link href="/categories/gpu">GPU Reviews</Link></li>
            <li><Link href="/categories/memory">Memory & Storage</Link></li>
            <li><Link href="/categories/cooling">Cooling Solutions</Link></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li><Link href="/categories">Spec Database</Link></li>
            <li><Link href="/categories">Buying Guides</Link></li>
            <li><Link href="/categories">Benchmarks</Link></li>
            <li><Link href="/categories/news">Latest News</Link></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/team">Our Team</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <span>© 2025 Swift Techy. All rights reserved.</span>
        </div>
        <div className="made-with">
          <span>Made with</span>
          <span className="heart-icon">❤️</span>
          <span>for hardware enthusiasts</span>
        </div>
      </div>
    </footer>
  );
}

export default function ClientLayout({ children }) {
  return (
    <div className="layout-wrapper">
      {/* Combined Header with Navigation and Banner */}
      <Header />
      
      {/* Main Content Area */}
      <main className="main-content">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}