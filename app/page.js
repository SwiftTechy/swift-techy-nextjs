'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Fetch articles on component mount
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles');
        const data = await response.json();
        setArticles(data);
        setFilteredArticles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  // Filter functionality
  const handleFilter = (filterType) => {
    setActiveFilter(filterType);
    
    if (filterType === 'all') {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        article => article.category.toLowerCase() === filterType.toLowerCase()
      );
      setFilteredArticles(filtered);
    }
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
              <a href="#articles" className="btn-primary">Latest Reviews →</a>
              <a href="#content" className="btn-secondary">Browse Categories</a>
            </div>
            <div className="stats">
              <div className="stat-item">
                <h3>500+</h3>
                <p>Hardware Reviews</p>
              </div>
              <div className="stat-item">
                <h3>50K+</h3>
                <p>Monthly Readers</p>
              </div>
              <div className="stat-item">
                <h3>100+</h3>
                <p>Spec Databases</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="featured-card">
              <div className="featured-card-image-wrapper">
                <img src="images/featured-image.jpg" alt="Featured" className="featured-card-image"/>
              </div>
              <div className="featured-card-content">
                <span className="featured-badge">⭐ Featured</span>
                <div className="featured-date">Mar 16, 2025</div>
                <h3>The Future of PC Hardware: What to Expect in 2025</h3>
                <p>From AI-accelerated computing to breakthrough cooling solutions, discover the innovations shaping the next generation of PC hardware.</p>
                <div className="author">
                  <div className="author-avatar"></div>
                  <span className="author-name">Editorial Team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CONTENT CATEGORIES SECTION */}
      <section className="content-section" id="content">
        <div className="content-container">
          <div className="section-header">
            <h2>Explore Our Content</h2>
            <p>Discover comprehensive hardware information, latest industry news, expert reviews, and build guides</p>
          </div>
          <div className="content-grid">
            <div className="content-card card-blue">
              <div className="content-icon">📚</div>
              <h3>Tech Wiki</h3>
              <p>Comprehensive database of old and legacy hardware specifications, benchmarks, and historical information.</p>
              <span className="content-meta">500+ Articles</span>
              <a href="#articles" className="content-link">Explore →</a>
            </div>

            <div className="content-card card-purple">
              <div className="content-icon">📰</div>
              <h3>Latest News</h3>
              <p>Breaking news, announcements, and updates from the world of PC hardware and technology.</p>
              <span className="content-meta">Updated Daily</span>
              <a href="#articles" className="content-link">Explore →</a>
            </div>

            <div className="content-card card-orange">
              <div className="content-icon">⭐</div>
              <h3>Our Latest Review</h3>
              <p>In-depth analysis and performance testing of the newest CPUs, GPUs, and hardware components.</p>
              <span className="content-meta">Expert Reviews</span>
              <a href="#articles" className="content-link">Explore →</a>
            </div>

            <div className="content-card card-green">
              <div className="content-icon">🛠️</div>
              <h3>Best PC Builds</h3>
              <p>Curated PC build guides for every budget and purpose, from gaming rigs to workstation powerhouses.</p>
              <span className="content-meta">50+ Builds</span>
              <a href="#articles" className="content-link">Explore →</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* DYNAMIC NEWS/REVIEWS SECTION */}
      <section className="news-section" id="articles">
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

          {loading ? (
            <div className="loading-message">
              <p>Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="no-articles">
              <p>No articles found in this category yet. Check back soon!</p>
            </div>
          ) : (
            <div className="news-grid">
              {filteredArticles.map((article) => (
                <Link href={`/articles/${article.slug}`} key={article.slug} className="news-card-link">
                  <div className="news-card">
                    <div className="news-image-wrapper">
                      <span className={`news-badge badge-${article.category.toLowerCase()}`}>
                        {article.category}
                      </span>
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="news-image"
                      />
                    </div>
                    <div className="news-content">
                      <h3>{article.title}</h3>
                      <p>{article.description}</p>
                      
                      {article.specs && (
                        <div className="news-stats">
                          {Object.entries(article.specs).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="stat-group">
                              <span className="stat-label">{key}</span>
                              <span className="stat-value">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="news-footer">
                        <div className="news-date">📅 {article.date}</div>
                        <div className="news-author">👤 {article.author}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="load-more">
            <button className="load-more-btn" onClick={() => handleFilter('all')}>
              View All Articles →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}