// app/categories/[category]/loading.jsx
export default function Loading() {
  return (
    <div className="content-container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <div className="loading-message">
        <p>Loading category...</p>
      </div>
    </div>
  );
}