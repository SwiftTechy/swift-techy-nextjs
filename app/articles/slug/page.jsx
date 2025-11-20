import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';

// Generate static paths for all articles
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.frontmatter.title} | Swift Techy`,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      images: [article.frontmatter.image],
    },
  };
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return (
      <div className="article-not-found">
        <h1>Article Not Found</h1>
        <p>The article you're looking for doesn't exist.</p>
        <a href="/">← Back to Home</a>
      </div>
    );
  }

  const { frontmatter, content } = article;

  return (
    <article className="article-page">
      {/* Article Header */}
      <header className="article-header">
        <div className="article-header-content">
          <span className={`article-category-badge badge-${frontmatter.category?.toLowerCase()}`}>
            {frontmatter.category}
          </span>
          <h1 className="article-title">{frontmatter.title}</h1>
          <p className="article-description">{frontmatter.description}</p>
          
          <div className="article-meta">
            <div className="article-author">
              <span className="author-avatar">👤</span>
              <span className="author-name">{frontmatter.author}</span>
            </div>
            <div className="article-date">📅 {frontmatter.date}</div>
            <div className="article-reading-time">⏱️ {frontmatter.readingTime}</div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {frontmatter.image && (
        <div className="article-featured-image">
          <img 
            src={frontmatter.image} 
            alt={frontmatter.title}
            className="featured-img"
          />
        </div>
      )}

      {/* Specs Box (if available) */}
      {frontmatter.specs && (
        <div className="article-specs-box">
          <h3>Technical Specifications</h3>
          <div className="specs-grid">
            {Object.entries(frontmatter.specs).map(([key, value]) => (
              <div key={key} className="spec-item">
                <span className="spec-label">{key}:</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="article-content">
        <MDXRemote source={content} />
      </div>

      {/* Article Footer */}
      <footer className="article-footer">
        <div className="article-tags">
          {frontmatter.tags?.map((tag) => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
        <div className="article-actions">
          <a href="/" className="back-link">← Back to All Articles</a>
          <button className="share-button">Share Article</button>
        </div>
      </footer>
    </article>
  );
}