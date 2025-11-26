// app/categories/[category]/page.jsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticlesByCategory, getCategories } from '@/lib/articles';

export async function generateStaticParams() {
  const categories = getCategories();
  console.log('📁 DEBUG - Generating static params for categories:', categories);
  return categories.map((category) => ({
    category: category,
  }));
}

// MAKE THIS ASYNC TOO
export default async function CategoryPage({ params }) {
  // AWAIT THE PARAMS
  const { category } = await params;
  
  console.log('🔍 DEBUG - Requested category:', category);
  
  const categories = getCategories();
  
  // If category doesn't exist, show error
  if (!categories.includes(category)) {
    console.log('❌ DEBUG - Category not found, showing 404');
    notFound();
  }
  
  const articles = getArticlesByCategory(category);
  console.log('📄 DEBUG - Found articles for category:', articles.length);
  
  const categoryTitles = {
    cpu: 'CPU Reviews & News',
    gpu: 'GPU Reviews & News', 
    memory: 'Memory & RAM',
    storage: 'Storage Solutions',
    news: 'Latest Hardware News',
    review: 'Expert Hardware Reviews',
    cooling: 'Cooling Solutions',
    motherboard: 'Motherboards',
    guide: 'Hardware Guides',
    benchmark: 'Performance Benchmarks'
  };

  const categoryDescriptions = {
    cpu: 'Latest processor reviews, benchmarks, and CPU technology news',
    gpu: 'Graphics card reviews, performance analysis, and GPU innovations',
    memory: 'RAM reviews, memory technology, and performance analysis',
    storage: 'SSD, HDD, and storage technology reviews and comparisons',
    news: 'Breaking news, announcements, and updates in PC hardware',
    review: 'In-depth hardware reviews, testing, and expert analysis',
    cooling: 'Air and liquid cooling system reviews and thermal performance',
    motherboard: 'Motherboard reviews, chipset analysis, and feature comparisons',
    guide: 'Comprehensive hardware guides and tutorials',
    benchmark: 'Performance benchmarks and comparative analysis'
  };

  const title = categoryTitles[category] || `${category.toUpperCase()} Articles`;
  const description = categoryDescriptions[category] || `All articles about ${category}`;

  return (
    <div className="content-container" style={{ padding: '4rem 2rem', minHeight: '80vh' }}>
      <div className="section-header">
        <h1>{title}</h1>
        <p>{description}</p>
        <div style={{ marginTop: '1rem', fontSize: '1rem', color: '#64748b' }}>
          {articles.length} article{articles.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {articles.length > 0 ? (
        <div className="news-grid">
          {articles.map((article) => {
            const primaryCategory = article.categories?.[0] || 'general';
            
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
                    <p>{article.excerpt}</p>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      {(article.categories || ['general']).slice(0, 3).map(cat => (
                        <span 
                          key={cat} 
                          style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            color: '#3b82f6',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    
                    <div className="news-stats">
                      {Object.entries(article.stats || {}).slice(0, 4).map(([key, value]) => (
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
            );
          })}
        </div>
      ) : (
        <div className="no-articles">
          <p>No articles found in this category.</p>
          <Link href="/categories" className="load-more-btn" style={{ marginTop: '1rem' }}>
            ← Back to All Categories
          </Link>
        </div>
      )}

      <div className="load-more">
        <Link href="/categories" className="load-more-btn">← Back to All Categories</Link>
      </div>
    </div>
  );
}