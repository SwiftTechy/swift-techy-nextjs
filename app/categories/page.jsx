// app/categories/page.jsx
import Link from 'next/link';
import { getCategories, getAllArticles } from '@/lib/articles';

export default function CategoriesPage() {
  const categories = getCategories();
  const allArticles = getAllArticles();

  // Safe category counts
  const categoryCounts = {};
  categories.forEach(category => {
    if (category && typeof category === 'string') {
      categoryCounts[category] = allArticles.filter(article => 
        article.categories && article.categories.includes(category)
      ).length;
    }
  });

  const categoryInfo = {
    cpu: { title: 'CPU Reviews & News', description: 'Latest processor reviews and CPU technology news', icon: '⚡' },
    gpu: { title: 'GPU Reviews & News', description: 'Graphics card reviews and GPU innovations', icon: '🎮' },
    memory: { title: 'Memory & RAM', description: 'RAM reviews and memory technology updates', icon: '💾' },
    storage: { title: 'Storage Solutions', description: 'SSD, HDD, and storage technology reviews', icon: '💿' },
    news: { title: 'Latest News', description: 'Breaking news and announcements in PC hardware', icon: '📰' },
    review: { title: 'Expert Reviews', description: 'In-depth hardware reviews and analysis', icon: '⭐' },
    cooling: { title: 'Cooling Solutions', description: 'Air and liquid cooling system reviews', icon: '❄️' },
    motherboard: { title: 'Motherboards', description: 'Motherboard reviews and chipset analysis', icon: '🔌' },
    guide: { title: 'Hardware Guides', description: 'Comprehensive hardware guides and tutorials', icon: '📖' },
    benchmark: { title: 'Performance Benchmarks', description: 'Performance benchmarks and analysis', icon: '📊' }
  };

  // Filter out any invalid categories
  const validCategories = categories.filter(cat => cat && typeof cat === 'string');

  return (
    <div className="content-container" style={{ padding: '4rem 2rem', minHeight: '80vh' }}>
      <div className="section-header">
        <h1>All Categories</h1>
        <p>Browse all hardware categories and find exactly what you're looking for</p>
      </div>

      <div className="content-grid">
        {validCategories.map(category => {
          // SUPER SAFE category handling
          const safeCategory = category || 'unknown';
          const info = categoryInfo[safeCategory] || { 
            title: `${safeCategory.charAt(0).toUpperCase() + safeCategory.slice(1)} Articles`, 
            description: `All articles about ${safeCategory}`,
            icon: '📁'
          };
          
          const articleCount = categoryCounts[safeCategory] || 0;
          
          return (
            <div key={safeCategory} className="content-card card-blue">
              <div className="content-icon" style={{ fontSize: '2rem' }}>
                {info.icon}
              </div>
              <h3>{info.title}</h3>
              <p>{info.description}</p>
              <span className="content-meta">{articleCount} Articles</span>
              <Link href={`/categories/${safeCategory}`} className="content-link">
                Browse Articles →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
