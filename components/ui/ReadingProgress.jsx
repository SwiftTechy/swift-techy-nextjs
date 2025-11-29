"use client";

import { useState, useEffect } from 'react';
import './ReadingProgress.css';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        const scrollProgress = (currentScroll / scrollHeight) * 100;
        setProgress(scrollProgress);
        setIsVisible(currentScroll > 100);
      }
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  // Marker moves from top (0%) to bottom (100%)
  const markerPosition = `${progress}%`;

  return (
    <div className={`reading-progress-vertical ${isVisible ? 'visible' : ''}`}>
      <div className="progress-container">
        {/* Vertical Track */}
        <div className="progress-track">
          {/* Progress Fill - grows from TOP to marker */}
          <div 
            className="progress-fill"
            style={{ height: `${progress}%` }}
          />
        </div>
        
        {/* Percentage Marker - moves DOWN the track */}
        <div 
          className="progress-marker"
          style={{ top: markerPosition }}
        >
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}