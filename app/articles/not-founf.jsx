// app/articles/not-found.jsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="content-container" style={{ padding: '4rem 2rem', textAlign: 'center', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ marginBottom: '1rem' }}>Article Not Found</h2>
      <p style={{ marginBottom: '2rem', color: '#64748b' }}>
        The article you're looking for doesn't exist.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}