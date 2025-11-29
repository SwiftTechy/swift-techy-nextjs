"use client";

import './SocialShare.css';

export default function SocialShare({ title, slug }) {
  const shareUrl = `https://swifttechy.in/articles/${slug}`;
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="social-share">
      <h4>Share this article</h4>
      <div className="share-buttons">
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="share-btn twitter">
          𝕏
        </a>
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="share-btn linkedin">
          in
        </a>
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="share-btn facebook">
          f
        </a>
        <a href={shareLinks.reddit} target="_blank" rel="noopener noreferrer" className="share-btn reddit">
          📢
        </a>
        <button onClick={copyToClipboard} className="share-btn copy">
          📋
        </button>
      </div>
    </div>
  );
}