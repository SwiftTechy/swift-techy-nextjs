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
} from '@/lib/mdx-server.mjs';

export default async function HomePage() {
  // Add debug logging
  console.log('=== DEBUGGING ARTICLE LOADING ===');
  
  // Load all data on the server
  const [
    latestArticles,
    featuredArticles,
    newsArticles,
    reviewArticles,
    cpuArticles,
    gpuArticles,
    otherArticles
  ] = await Promise.all([
    getLatestArticles(6),
    getFeaturedArticles(),
    getNewsArticles(),
    getReviewArticles(),
    getCPUArticles(),
    getGPUArticles(),
    getOtherArticles()
  ]);

  // Debug the loaded data
  console.log('Latest articles loaded:', latestArticles);
  console.log('First article:', latestArticles[0]);
  console.log('First article categories:', latestArticles[0]?.categories);
  console.log('All articles have categories:', latestArticles.every(article => article.categories));

  // Use the first featured article for the hero, or fallback to latest
  const featuredArticle = featuredArticles.length > 0 ? featuredArticles[0] : latestArticles[0];

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Stay Ahead in PC Hardware</h1>
            <p>Independent hardware reviews, specifications, and tech analysis from passionate enthusiasts.</p>
            <div className="hero-buttons">
              <Link href="/categories/review" className="btn-primary">Latest Reviews →</Link>
              <Link href="/categories" className="btn-secondary">Browse Categories</Link>
            </div>
            <div className="stats">
              <div className="stat-item">
                <h3>{latestArticles.length}+</h3>
                <p>Hardware Reviews</p>
              </div>
              <div className="stat-item">
                <h3>{cpuArticles.length + gpuArticles.length}+</h3>
                <p>Component Specs</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="featured-card">
              <Link href={`/articles/${featuredArticle.slug}`} className="news-card-link">
                <div className="featured-card-image-wrapper">
                  <span className="featured-badge-top">🚀 Featured Story</span>
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
              <span className="content-meta">{cpuArticles.length}+ Articles</span>
              <Link href="/categories/cpu" className="content-link">Explore →</Link>
            </div>

            <div className="content-card card-purple">
              <div className="content-icon">📰</div>
              <h3>Latest News</h3>
              <p>Breaking news, announcements, and updates from the world of PC hardware and technology.</p>
              <span className="content-meta">{newsArticles.length}+ Articles</span>
              <Link href="/categories/news" className="content-link">Explore →</Link>
            </div>

            <div className="content-card card-orange">
              <div className="content-icon">⭐</div>
              <h3>Expert Reviews</h3>
              <p>In-depth analysis and performance testing of the newest hardware components and systems.</p>
              <span className="content-meta">{reviewArticles.length}+ Articles</span>
              <Link href="/categories/review" className="content-link">Explore →</Link>
            </div>

            <div className="content-card card-green">
              <div className="content-icon">🎮</div>
              <h3>GPU Database</h3>
              <p>Complete graphics card specifications, gaming performance, and rendering benchmarks.</p>
              <span className="content-meta">{gpuArticles.length}+ Articles</span>
              <Link href="/categories/gpu" className="content-link">Explore →</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* NEWS/REVIEWS SECTION - Simplified without client-side filtering */}
      <section className="news-section">
        <div className="content-container">
          <div className="section-header">
            <h2>Latest Hardware News & Reviews</h2>
            <p>Comprehensive coverage of the latest CPUs, GPUs, and computer hardware with detailed specifications</p>
          </div>

          <div className="news-grid">
            {latestArticles.map((article) => {
              // Add safety check for categories
              const primaryCategory = (article.categories && article.categories[0]) || 'general';
              const articleStats = article.stats || {};
              
              return (
                <Link key={article.slug} href={`/articles/${article.slug}`} className="news-card-link">
                  <div className="news-card">
                    <div className="news-image-wrapper">
                      <span className={`news-badge badge-${primaryCategory}`}>
                        {primaryCategory.toUpperCase()}
                      </span>
                      <img src={article.image || '/images/placeholder.jpg'} alt={article.title} className="news-image"/>
                    </div>
                    <div className="news-content">
                      <h3>{article.title}</h3>
                      <div className="news-stats">
                        {Object.entries(articleStats).slice(0, 4).map(([key, value]) => (
                          <div key={key} className="stat-group">
                            <span className="stat-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="stat-value">{value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="news-footer">
                        <div className="news-date">📅 {new Date(article.date || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                        <div className="news-author">👤 {article.author || 'Swift Techy Team'}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
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
              💻 CPUs ({cpuArticles.length})
            </Link>
            <Link href="/categories/gpu" className="filter-btn" style={{ textDecoration: 'none' }}>
              🎮 GPUs ({gpuArticles.length})
            </Link>
            <Link href="/categories/memory" className="filter-btn" style={{ textDecoration: 'none' }}>
              💾 Memory ({getArticlesByCategory('memory').length})
            </Link>
            <Link href="/categories/storage" className="filter-btn" style={{ textDecoration: 'none' }}>
              💿 Storage ({getArticlesByCategory('storage').length})
            </Link>
            <Link href="/categories/news" className="filter-btn" style={{ textDecoration: 'none' }}>
              📰 News ({newsArticles.length})
            </Link>
            <Link href="/categories/review" className="filter-btn" style={{ textDecoration: 'none' }}>
              ⭐ Reviews ({reviewArticles.length})
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}