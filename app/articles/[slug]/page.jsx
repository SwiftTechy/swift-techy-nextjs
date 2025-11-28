// app/articles/[slug]/page.jsx
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles, getRelatedArticles } from '@/lib/mdx-server.mjs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

export async function generateStaticParams() {
  const articles = await getAllArticles(); // Use async version
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Helper function to generate TOC from content
function generateTableOfContents(content) {
  if (!content) return [];
  
  // Extract h2 headings from MDX content (## Heading)
  const headingRegex = /^##\s+(.+)$/gm;
  const headings = [];
  let match;
  let index = 0;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1].trim();
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    headings.push({
      id: id,
      title: title
    });
    index++;
  }
  
  return headings;
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const tableOfContents = generateTableOfContents(article.content);
  
  // Add safety check for article.categories
  const articleCategories = article.categories || [];
  const relatedArticles = getRelatedArticles(article.slug, articleCategories);

  return (
    <div className="ap-container">
      {/* Hero Section */}
      <section className="ap-hero">
        <div className="ap-hero-content">
          <div className="ap-hero-text">
            <nav className="ap-breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/categories">Categories</Link>
              <span>/</span>
              <span>{article.categories[0]}</span>
            </nav>
            
            <h1 className="article-title">{article.title}</h1>
            <p className="ap-excerpt">{article.excerpt}</p>
            
            <div className="ap-meta">
              <div className="ap-author-info">
                <div className="ap-author-avatar">
                  {article.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ap-author-text">
                  <div className="ap-author-name">{article.author}</div>
                  <div className="ap-author-role">Hardware Reviewer</div>
                </div>
              </div>
              <div className="ap-details">
                <div className="ap-publish-date">
                  {new Date(article.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="ap-read-time">12 min read</div>
              </div>
            </div>
          </div>
          
          <div className="ap-hero-image">
            <img 
              src={article.image || '/images/placeholder.jpg'} 
              alt={article.title}
            />
          </div>
        </div>
      </section>

      {/* Main Content Card */}
      <div className="ap-content-wrapper">
        {/* Mobile Table of Contents - Shows only on mobile above article */}
        <div className="ap-mobile-toc-container">
          <div className="ap-sidebar-card">
            <h3>Table of Contents</h3>
            <nav className="ap-toc-nav">
              {tableOfContents.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="ap-toc-link">
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Article Content */}
        <div className="ap-main-card">
          <main className="ap-content-main">
            {/* Dynamic content from articles.js */}
           <div className="ap-content">
  <MDXRemote source={article.content} />
</div>
            
            {/* Subscribe Card */}
            <div className="ap-subscribe-card">
              <div className="ap-subscribe-content">
                <h3>Stay Updated</h3>
                <p>Get the latest hardware news and reviews delivered to your inbox weekly.</p>
                <div className="ap-subscribe-form">
                  <input type="email" placeholder="Enter your email" />
                  <button className="ap-subscribe-button">Subscribe</button>
                </div>
              </div>
            </div>

            {/* Dynamic Pros & Cons */}
            {(article.pros || article.cons) && (
              <div className="ap-pros-cons-card">
                {article.pros && article.pros.length > 0 && (
                  <div className="ap-pros-column">
                    <h4>Pros</h4>
                    <ul>
                      {article.pros.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {article.cons && article.cons.length > 0 && (
                  <div className="ap-cons-column">
                    <h4>Cons</h4>
                    <ul>
                      {article.cons.map((con, index) => (
                        <li key={index}>{con}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Dynamic Author Bio */}
            <div className="ap-author-bio-card">
              <div className="ap-author-avatar">
                {article.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="ap-author-details">
                <div className="ap-author-name">{article.author}</div>
                <div className="ap-author-role">{article.authorBio?.role || 'Senior Hardware Reviewer'}</div>
                <p className="ap-author-description">
                  {article.authorBio?.description || 'Hardware enthusiast with extensive experience testing PC components.'}
                </p>
                <div className="ap-author-actions">
                  <button className="ap-follow-button">Follow</button>
                  <button className="ap-contact-button">Contact</button>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Sidebar Cards - WITHOUT Table of Contents */}
        <aside className="ap-article-sidebar">
          {/* Desktop Table of Contents - Hidden on mobile */}
          <div className="ap-desktop-toc-container">
            <div className="ap-sidebar-card">
              <h3>Table of Contents</h3>
              <nav className="ap-toc-nav">
                {tableOfContents.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="ap-toc-link">
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Specifications Card */}
          {article.stats && Object.keys(article.stats).length > 0 && (
            <div className="ap-sidebar-card">
              <h3>Specifications</h3>
              <div className="ap-specs-grid">
                {Object.entries(article.stats).map(([key, value]) => (
                  <div key={key} className="ap-spec-item">
                    <span className="ap-spec-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="ap-spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rating Card */}
          {article.rating && (
            <div className="ap-sidebar-card">
              <h3>Our Rating</h3>
              <div className="ap-rating-overall">
                <div className="ap-rating-score">{article.rating.overall}/10</div>
                <div className="ap-rating-categories">
                  {Object.entries(article.rating.categories).map(([category, score]) => (
                    <div key={category} className="ap-rating-category">
                      <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                      <div className="ap-rating-bar">
                        <div className="ap-rating-fill" style={{width: `${score * 10}%`}}></div>
                      </div>
                      <span className="rating-value">{score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Related Articles Card */}
          {relatedArticles && relatedArticles.length > 0 && (
            <div className="ap-sidebar-card">
              <h3>Related Articles</h3>
              <div className="ap-related-articles-list">
                {relatedArticles.slice(0, 3).map((relatedArticle) => (
                  <Link key={relatedArticle.slug} href={`/articles/${relatedArticle.slug}`} className="ap-related-article">
                    <div className="ap-related-image"></div>
                    <div className="ap-related-content">
                      <div className="ap-related-category">{relatedArticle.categories[0]}</div>
                      <h4>{relatedArticle.title}</h4>
                      <p>{relatedArticle.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}