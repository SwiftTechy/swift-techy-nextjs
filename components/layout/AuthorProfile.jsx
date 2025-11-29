"use client";

import './AuthorProfile.css';

export default function AuthorProfile({ author }) {
  const authors = {
    'Swift Techy Team': {
      name: 'Swift Techy Team',
      role: 'Hardware Experts',
      bio: 'Our team of hardware enthusiasts and technical writers bring you the latest PC hardware reviews, news, and analysis.',
      avatar: '/images/authors/team-avatar.jpg',
      social: {
        twitter: 'https://twitter.com/swifttechy',
      github: 'https://github.com/swifttechy', 
      linkedin: 'https://linkedin.com/company/swifttechy'
      }
    },
    'Alex Chen': {
      name: 'Alex Chen',
      role: 'Senior CPU Reviewer',
      bio: 'Specializing in processor architecture and performance analysis. Over 8 years of experience in hardware testing.',
      avatar: '/images/authors/alex-chen.jpg',
      social: {
        twitter: '#',
        github: '#'
      }
    },
    'Maya Rodriguez': {
      name: 'Maya Rodriguez',
      role: 'GPU Specialist',
      bio: 'Focused on graphics card performance and gaming benchmarks. Passionate about real-world gaming performance.',
      avatar: '/images/authors/maya-rodriguez.jpg',
      social: {
        twitter: '#',
        linkedin: '#'
      }
    }
  };

  const authorData = authors[author] || authors['Swift Techy Team'];

  return (
    <div className="author-profile">
      <div className="author-avatar">
        {authorData.avatar ? (
          <img src={authorData.avatar} alt={authorData.name} />
        ) : (
          <div className="author-avatar-fallback">
            {authorData.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>
      <div className="author-details">
        <h3>{authorData.name}</h3>
        <p className="author-role">{authorData.role}</p>
        <p className="author-bio">{authorData.bio}</p>
        <div className="author-social">
          {authorData.social.twitter && (
            <a href={authorData.social.twitter} aria-label="Twitter">𝕏</a>
          )}
          {authorData.social.github && (
            <a href={authorData.social.github} aria-label="GitHub">⚡</a>
          )}
          {authorData.social.linkedin && (
            <a href={authorData.social.linkedin} aria-label="LinkedIn">in</a>
          )}
        </div>
      </div>
    </div>
  );
}