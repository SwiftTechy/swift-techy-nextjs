import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { format } from 'date-fns';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

// Get all article slugs
export function getArticleSlugs() {
  try {
    const files = fs.readdirSync(articlesDirectory);
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error reading articles directory:', error);
    return [];
  }
}

// Get article data by slug
export function getArticleBySlug(slug) {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Calculate reading time
    const stats = readingTime(content);
    
    return {
      slug,
      content,
      frontmatter: {
        ...data,
        readingTime: stats.text,
        date: data.date ? format(new Date(data.date), 'MMM dd, yyyy') : null,
      }
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

// Get all articles with metadata
export function getAllArticles() {
  const slugs = getArticleSlugs();
  
  const articles = slugs
    .map(slug => {
      const article = getArticleBySlug(slug);
      return article ? {
        slug,
        ...article.frontmatter
      } : null;
    })
    .filter(Boolean) // Remove null entries
    .sort((a, b) => {
      // Sort by date, newest first
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });
  
  return articles;
}

// Get articles by category
export function getArticlesByCategory(category) {
  const allArticles = getAllArticles();
  
  if (category === 'all') {
    return allArticles;
  }
  
  return allArticles.filter(article => 
    article.category?.toLowerCase() === category.toLowerCase()
  );
}

// Get featured articles
export function getFeaturedArticles(limit = 6) {
  const allArticles = getAllArticles();
  return allArticles.filter(article => article.featured).slice(0, limit);
}

// Get latest articles
export function getLatestArticles(limit = 6) {
  const allArticles = getAllArticles();
  return allArticles.slice(0, limit);
}