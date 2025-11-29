"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './SearchModal.css';

export default function SearchModal({ isOpen, onClose, articles }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.categories.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered.slice(0, 8));
    } else {
      setResults([]);
    }
  }, [query, articles]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-header">
          <h3>Search Articles</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search for CPUs, GPUs, reviews..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <span className="search-icon">🔍</span>
        </div>
        
        {results.length > 0 && (
          <div className="search-results">
            {results.map(article => (
              // In your SearchModal.jsx, update the Link component like this:
<Link 
  key={article.slug} 
  href={`/articles/${article.slug}`} 
  onClick={onClose}
  style={{ textDecoration: 'none' }}
  className="search-result-link"
>
  <div className="search-result-item">
    <div className="result-category">{article.categories[0]}</div>
    <h4>{article.title}</h4>
    <p>{article.excerpt}</p>
  </div>
</Link>
            ))}
          </div>
        )}
        
        {query.length > 2 && results.length === 0 && (
          <div className="no-results">
            <p>No articles found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}