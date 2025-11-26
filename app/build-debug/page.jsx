// app/debug-build/page.jsx
import { getCategories, getAllArticles } from '@/lib/articles';

export default function DebugBuildPage() {
  const categories = getCategories();
  const allArticles = getAllArticles();
  
  console.log('🔍 DEBUG - Categories:', categories);
  console.log('🔍 DEBUG - Articles count:', allArticles.length);
  
  // Test each category
  categories.forEach(cat => {
    console.log(`🔍 DEBUG - Category "${cat}":`, {
      isValid: cat && typeof cat === 'string',
      canUpperCase: cat ? cat.toUpperCase() : 'UNDEFINED',
      articleCount: allArticles.filter(a => a.categories?.includes(cat)).length
    });
  });

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Build Debug Info</h1>
      <h2>Categories:</h2>
      <ul>
        {categories.map((cat, index) => (
          <li key={index}>
            <strong>Index {index}:</strong> "{cat}" - Type: {typeof cat} - Valid: {cat && typeof cat === 'string' ? 'YES' : 'NO'}
          </li>
        ))}
      </ul>
      
      <h2>Test .toUpperCase() on each:</h2>
      <ul>
        {categories.map((cat, index) => (
          <li key={index}>
            <strong>"{cat}"</strong> → {cat ? cat.toUpperCase() : 'CANNOT UPPERCASE UNDEFINED'}
          </li>
        ))}
      </ul>
    </div>
  );
}