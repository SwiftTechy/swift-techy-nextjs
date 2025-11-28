import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDirectory = path.join(process.cwd(), 'content');

// Helper to safely read directory
function safeReadDir(dirPath) {
  try {
    return fs.readdirSync(dirPath);
  } catch (error) {
    console.log('❌ Error reading directory:', dirPath, error.message);
    return [];
  }
}

// Helper to safely read file
function safeReadFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.log('❌ Error reading file:', filePath, error.message);
    return null;
  }
}

// SINGLE VERSION of getAllArticlesSync
export function getAllArticlesSync() {
  console.log('📁 Loading articles from:', contentDirectory);
  
  const articlesDir = path.join(contentDirectory, 'articles');
  
  // Check if directory exists
  if (!fs.existsSync(articlesDir)) {
    console.log('❌ Content directory not found:', articlesDir);
    return [];
  }
  
  const categories = safeReadDir(articlesDir);
  console.log('📂 Found categories:', categories);
  
  let allArticles = [];

  for (const category of categories) {
    const categoryPath = path.join(articlesDir, category);
    
    // Skip if not a directory
    if (!fs.statSync(categoryPath).isDirectory()) {
      console.log('⏩ Skipping non-directory:', category);
      continue;
    }

    console.log('📂 Processing category:', category);
    const articleFiles = safeReadDir(categoryPath);
    console.log('📄 Found files in category:', articleFiles);
    
    for (const file of articleFiles) {
      if (!file.endsWith('.mdx')) {
        console.log('⏩ Skipping non-MDX file:', file);
        continue;
      }

      const filePath = path.join(categoryPath, file);
      console.log('📖 Reading article:', filePath);
      
      const fileContent = safeReadFile(filePath);
      if (!fileContent) continue;

      const { data } = matter(fileContent);
      console.log('📋 Article data:', data.slug, data.categories);

      // Ensure all required fields with defaults
      const safeArticle = {
        title: data.title || 'Untitled Article',
        excerpt: data.excerpt || 'No excerpt available',
        slug: data.slug || file.replace('.mdx', ''),
        categories: data.categories || [category], // Always an array
        date: data.date || new Date().toISOString(),
        author: data.author || 'Swift Techy Team',
        image: data.image || '/images/placeholder.jpg',
        stats: data.stats || {},
        featured: data.featured || false,
        content: '' // Don't include content for sync version (performance)
      };

      console.log('✅ Processed article:', safeArticle.slug, 'with categories:', safeArticle.categories);
      allArticles.push(safeArticle);
    }
  }

  console.log('🎉 Total articles loaded:', allArticles.length);
  return allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ASYNC VERSION with content (for individual article pages)
export async function getAllArticles() {
  const articlesDir = path.join(contentDirectory, 'articles');
  
  if (!fs.existsSync(articlesDir)) {
    console.log('❌ Content directory not found:', articlesDir);
    return [];
  }
  
  const categories = safeReadDir(articlesDir);
  let allArticles = [];

  for (const category of categories) {
    const categoryPath = path.join(articlesDir, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const articleFiles = safeReadDir(categoryPath);
    
    for (const file of articleFiles) {
      if (!file.endsWith('.mdx')) continue;

      const filePath = path.join(categoryPath, file);
      const fileContent = safeReadFile(filePath);
      if (!fileContent) continue;

      const { data, content } = matter(fileContent);

      allArticles.push({
        ...data,
        content,
        slug: data.slug || file.replace('.mdx', ''),
        categories: data.categories || [category],
        image: data.image || '/images/placeholder.jpg',
        author: data.author || 'Swift Techy Team'
      });
    }
  }

  return allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Individual article by slug (ASYNC with content)
export async function getArticleBySlug(slug) {
  const articles = await getAllArticles();
  return articles.find(article => article.slug === slug);
}

// Category-based functions (SYNC for performance)
export function getLatestArticles(limit = 6) {
  const articles = getAllArticlesSync();
  return articles.slice(0, limit);
}

export function getFeaturedArticles() {
  const articles = getAllArticlesSync();
  return articles.filter(article => article.featured);
}

export function getCategories() {
  const articles = getAllArticlesSync();
  const allCategories = new Set();
  
  articles.forEach(article => {
    if (article.categories && Array.isArray(article.categories)) {
      article.categories.forEach(cat => allCategories.add(cat));
    }
  });

  return Array.from(allCategories);
}

export async function getArticlesByCategory(category) {
  const articles = getAllArticlesSync();
  return articles.filter(article => 
    article.categories && article.categories.includes(category)
  );
}

export function getNewsArticles() {
  const articles = getAllArticlesSync();
  return articles.filter(article => 
    article.categories && article.categories.includes('news')
  );
}

export function getReviewArticles() {
  const articles = getAllArticlesSync();
  return articles.filter(article => 
    article.categories && article.categories.includes('review')
  );
}

export function getCPUArticles() {
  const articles = getAllArticlesSync();
  return articles.filter(article => 
    article.categories && article.categories.includes('cpu')
  );
}

export function getGPUArticles() {
  const articles = getAllArticlesSync();
  return articles.filter(article => 
    article.categories && article.categories.includes('gpu')
  );
}

export function getOtherArticles() {
  const articles = getAllArticlesSync();
  const otherCategories = ['memory', 'storage', 'cooling', 'motherboard'];
  return articles.filter(article =>
    article.categories && article.categories.some(cat => otherCategories.includes(cat))
  );
}

export function getRelatedArticles(currentSlug, categories, limit = 3) {
  const articles = getAllArticlesSync();
  
  // Add safety checks for all parameters
  if (!currentSlug || !categories || !Array.isArray(categories)) {
    console.log('❌ Invalid parameters for getRelatedArticles:', { currentSlug, categories });
    return [];
  }
  
  return articles
    .filter(article => {
      // Skip if article doesn't have categories
      if (!article.categories || !Array.isArray(article.categories)) {
        return false;
      }
      
      // Skip the current article and check for category matches
      return article.slug !== currentSlug && 
             article.categories.some(cat => categories.includes(cat));
    })
    .slice(0, limit);
}