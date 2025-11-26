// app/categories/not-found.jsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="content-container" style={{ padding: '4rem 2rem', textAlign: 'center', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ marginBottom: '1rem' }}>Category Not Found</h2>
      <p style={{ marginBottom: '2rem', color: '#64748b' }}>
        The category you're looking for doesn't exist.
      </p>
      <Link href="/categories" className="btn-primary">
        Browse All Categories
      </Link>
    </div>
  );
}