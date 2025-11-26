// app/page.jsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  getLatestArticles, 
  getFeaturedArticles, 
  getNewsArticles, 
  getReviewArticles, 
  getCPUArticles, 
  getGPUArticles, 
  getOtherArticles,
  getArticlesByCategory
} from '@/lib/articles';

export default function HomePage() {
  // State for filtered articles
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // Use useMemo to prevent recreation on every render
  const latestArticles = useMemo(() => getLatestArticles(6), []);
  const featuredArticles = useMemo(() => getFeaturedArticles(), []);
  const newsArticles = useMemo(() => getNewsArticles().slice(0, 3), []);
  const reviewArticles = useMemo(() => getReviewArticles().slice(0, 3), []);
  const cpuArticles = useMemo(() => getCPUArticles().slice(0, 3), []);
  const gpuArticles = useMemo(() => getGPUArticles().slice(0, 3), []);
  const otherArticles = useMemo(() => getOtherArticles().slice(0, 3), []);

  // Use the first featured article for the hero, or fallback to latest
  const featuredArticle = featuredArticles.length > 0 ? featuredArticles[0] : latestArticles[0];

  // Initialize with all articles - FIXED: use useMemo for initial value
  useEffect(() => {
    setFilteredArticles(latestArticles);
  }, [latestArticles]);

  // Filter function - FIXED: Use proper filtering logic
  const handleFilter = (filterType) => {
    setActiveFilter(filterType);
    
    let filtered = [];
    
    switch (filterType) {
      case 'cpu':
        filtered = latestArticles.filter(article => 
          article.categories.includes('cpu')
        );
        break;
      case 'gpu':
        filtered = latestArticles.filter(article => 
          article.categories.includes('gpu')
        );
        break;
      case 'other':
        filtered = latestArticles.filter(article => 
          article.categories.some(cat => 
            ['memory', 'storage', 'cooling', 'motherboard'].includes(cat)
          )
        );
        break;
      default:
        filtered = latestArticles;
    }
    
    setFilteredArticles(filtered);
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <span className="featured-badge-top">🚀 Featured Story</span>
            <h1>Stay Ahead in PC Hardware</h1>
            <p>Your trusted source for in-depth reviews, specifications, and the latest news on CPUs, GPUs, and cutting-edge computer hardware.</p>
            <div className="hero-buttons">
              <Link href="/categories/review" className="btn-primary">Latest Reviews →</Link>
              <Link href="/categories" className="btn-secondary">Browse Categories</Link>
            </div>
            <div className="stats">
              <div className="stat-item">
                <h3>{getLatestArticles().length}+</h3>
                <p>Hardware Reviews</p>
              </div>
              <div className="stat-item">
                <h3>100+</h3>
                <p>Monthly Readers</p>
              </div>
              <div className="stat-item">
                <h3>{getCPUArticles().length + getGPUArticles().length}+</h3>
                <p>Spec Databases</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="featured-card">
              <Link href={`/articles/${featuredArticle.slug}`} className="news-card-link">
                <div className="featured-card-image-wrapper">
                  <img src={featuredArticle.image} alt={featuredArticle.title} className="featured-card-image"/>
                </div>
                <div className="featured-card-content">
                  <span className="featured-badge">⭐ Featured</span>
                  <div className="featured-date">{new Date(featuredArticle.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                  <h3>{featuredArticle.title}</h3>
                  <p>{featuredArticle.excerpt}</p>
                  <div className="author">
                    <div className="author-avatar"></div>
                    <span className="author-name">{featuredArticle.author}</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CONTENT CATEGORIES SECTION */}
      <section className="content-section">
        <div className="content-container">
          <div className="section-header">
            <h2>Explore Our Content</h2>
            <p>Discover comprehensive hardware information, latest industry news, expert reviews, and build guides</p>
          </div>
          <div className="content-grid">
            <div className="content-card card-blue">
              <div className="content-icon">📚</div>
              <h3>CPU Database</h3>
              <p>Comprehensive database of processor specifications, benchmarks, and performance analysis.</p>
              <span className="content-meta">{getCPUArticles().length}+ Articles</span>
              <Link href="/categories/cpu" className="content-link">Explore →</Link>
            </div>

            <div className="content-card card-purple">
              <div className="content-icon">📰</div>
              <h3>Latest News</h3>
              <p>Breaking news, announcements, and updates from the world of PC hardware and technology.</p>
              <span className="content-meta">{getNewsArticles().length}+ Articles</span>
              <Link href="/categories/news" className="content-link">Explore →</Link>
            </div>

            <div className="content-card card-orange">
              <div className="content-icon">⭐</div>
              <h3>Expert Reviews</h3>
              <p>In-depth analysis and performance testing of the newest hardware components and systems.</p>
              <span className="content-meta">{getReviewArticles().length}+ Articles</span>
              <Link href="/categories/review" className="content-link">Explore →</Link>
            </div>

            <div className="content-card card-green">
              <div className="content-icon">🎮</div>
              <h3>GPU Database</h3>
              <p>Complete graphics card specifications, gaming performance, and rendering benchmarks.</p>
              <span className="content-meta">{getGPUArticles().length}+ Articles</span>
              <Link href="/categories/gpu" className="content-link">Explore →</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* NEWS/REVIEWS SECTION */}
      <section className="news-section">
        <div className="content-container">
          <div className="section-header">
            <h2>Latest Hardware News & Reviews</h2>
            <p>Comprehensive coverage of the latest CPUs, GPUs, and computer hardware with detailed specifications</p>
          </div>
          
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilter('all')}
            >
              🔥 All Articles
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'cpu' ? 'active' : ''}`}
              onClick={() => handleFilter('cpu')}
            >
              💻 CPUs
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'gpu' ? 'active' : ''}`}
              onClick={() => handleFilter('gpu')}
            >
              🎮 GPUs
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'other' ? 'active' : ''}`}
              onClick={() => handleFilter('other')}
            >
              ⚙️ Other Hardware
            </button>
          </div>

          <div className="news-grid">
            {filteredArticles.map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="news-card-link">
                <div className="news-card">
                  <div className="news-image-wrapper">
                    <span className={`news-badge badge-${article.categories[0]}`}>
                      {article.categories[0].toUpperCase()}
                    </span>
                    <img src={article.image} alt={article.title} className="news-image"/>
                  </div>
                  <div className="news-content">
                    <h3>{article.title}</h3>
                    <div className="news-stats">
                      {Object.entries(article.stats).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="stat-group">
                          <span className="stat-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="stat-value">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="news-footer">
                      <div className="news-date">📅 {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                      <div className="news-author">👤 {article.author}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="load-more">
            <Link href="/categories" className="load-more-btn">View All Articles →</Link>
          </div>
        </div>
      </section>

      {/* QUICK CATEGORY LINKS */}
      <section className="content-section" style={{ background: '#f8fafc' }}>
        <div className="content-container">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <p>Quick access to our most popular hardware categories</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/categories/cpu" className="filter-btn" style={{ textDecoration: 'none' }}>
              💻 CPUs ({getCPUArticles().length})
            </Link>
            <Link href="/categories/gpu" className="filter-btn" style={{ textDecoration: 'none' }}>
              🎮 GPUs ({getGPUArticles().length})
            </Link>
            <Link href="/categories/memory" className="filter-btn" style={{ textDecoration: 'none' }}>
              💾 Memory ({getArticlesByCategory('memory').length})
            </Link>
            <Link href="/categories/storage" className="filter-btn" style={{ textDecoration: 'none' }}>
              💿 Storage ({getArticlesByCategory('storage').length})
            </Link>
            <Link href="/categories/news" className="filter-btn" style={{ textDecoration: 'none' }}>
              📰 News ({getNewsArticles().length})
            </Link>
            <Link href="/categories/review" className="filter-btn" style={{ textDecoration: 'none' }}>
              ⭐ Reviews ({getReviewArticles().length})
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}