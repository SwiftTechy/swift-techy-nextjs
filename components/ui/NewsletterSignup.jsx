// components/ui/NewsletterSignup.jsx
"use client";

import { useState } from 'react';
import './NewsletterSignup.css';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call - replace with your newsletter service
    setTimeout(() => {
      setMessage('🎉 Thanks for subscribing! Check your email to confirm.');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="newsletter-signup">
      <div className="newsletter-content">
        <h3>📧 Stay Updated</h3>
        <p>Get the latest hardware reviews, news, and exclusive content delivered to your inbox.</p>
        
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        
        {message && <div className="newsletter-message">{message}</div>}
        
        <p className="newsletter-note">
          No spam. Unsubscribe anytime. Join 2,500+ hardware enthusiasts.
        </p>
      </div>
    </div>
  );
}