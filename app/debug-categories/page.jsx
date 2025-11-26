// app/debug-categories/page.jsx
import { getCategories, getArticlesByCategory } from '@/lib/articles';

export default function DebugPage() {
  const categories = getCategories();
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Category Debug Info</h1>
      <h2>Available Categories:</h2>
      <ul>
        {categories.map(cat => (
          <li key={cat}>
            <strong>{cat}</strong>: {getArticlesByCategory(cat).length} articles
            <ul>
              {getArticlesByCategory(cat).map(article => (
                <li key={article.slug}>{article.title} - Categories: {article.categories?.join(', ')}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      
      <h2>Test Links:</h2>
      {categories.map(cat => (
        <div key={cat} style={{ marginBottom: '1rem' }}>
          <a href={`/categories/${cat}`} style={{ color: 'blue' }}>
            Test: /categories/{cat}
          </a>
        </div>
      ))}
    </div>
  );
}