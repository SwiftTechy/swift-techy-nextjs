'use client';

import { useEffect } from 'react';

export default function HomePage() {
  
  // Filter functionality - runs after page loads
  useEffect(() => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');

    const handleFilter = (button) => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get the filter type from button text
      const filterText = button.textContent.trim().toLowerCase();
      
      // First, fade out all cards
      newsCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
      });
      
      // After fade out, filter and fade in
      setTimeout(() => {
        newsCards.forEach(card => {
          const badge = card.querySelector('.news-badge');
          const badgeText = badge ? badge.textContent.trim().toLowerCase() : '';
          
          let shouldShow = false;
          
          if (filterText.includes('all')) {
            shouldShow = true;
          } else if (filterText.includes('cpu') && badgeText === 'cpu') {
            shouldShow = true;
          } else if (filterText.includes('gpu') && badgeText === 'gpu') {
            shouldShow = true;
          } else if (filterText.includes('other') && badgeText === 'other') {
            shouldShow = true;
          }
          
          if (shouldShow) {
            card.style.display = 'block';
            card.offsetHeight;
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          } else {
            card.style.display = 'none';
          }
        });
      }, 150);
    };

    // Attach event listeners
    filterButtons.forEach(button => {
      button.addEventListener('click', () => handleFilter(button));
    });

    // Cleanup on component unmount
    return () => {
      filterButtons.forEach(button => {
        button.removeEventListener('click', () => handleFilter(button));
      });
    };
  }, []); // Run once when component mounts

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <span className="featured-badge-top">🚀 Featured Story</span>
            <h1>Stay Ahead in PC Hardware</h1>
            <p>Your trusted source for in-depth reviews, specifications, and the latest news on CPUs, GPUs, and cutting-edge computer hardware.</p>
            <div className="hero-buttons">
              <a href="#" className="btn-primary">Latest Reviews →</a>
              <a href="#" className="btn-secondary">Browse Categories</a>
            </div>
            <div className="stats">
              <div className="stat-item">
                <h3>500+</h3>
                <p>Hardware Reviews</p>
              </div>
              <div className="stat-item">
                <h3>50K+</h3>
                <p>Monthly Readers</p>
              </div>
              <div className="stat-item">
                <h3>100+</h3>
                <p>Spec Databases</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="featured-card">
              <div className="featured-card-image-wrapper">
                <img src="images/featured-image.jpg" alt="Featured" className="featured-card-image"/>
              </div>
              <div className="featured-card-content">
                <span className="featured-badge">⭐ Featured</span>
                <div className="featured-date">Mar 16, 2025</div>
                <h3>The Future of PC Hardware: What to Expect in 2025</h3>
                <p>From AI-accelerated computing to breakthrough cooling solutions, discover the innovations shaping the next generation of PC hardware.</p>
                <div className="author">
                  <div className="author-avatar"></div>
                  <span className="author-name">Editorial Team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CONTENT CATEGORIES SECTION */}
      <section className="content-section">
        <div className="content-container">
          <div className="section-header">
            <h2>Explore Our Content</h2>
            <p>Discover comprehensive hardware information, latest industry news, expert reviews, and build guides</p>
          </div>
          <div className="content-grid">
            <div className="content-card card-blue">
              <div className="content-icon">📚</div>
              <h3>Tech Wiki</h3>
              <p>Comprehensive database of old and legacy hardware specifications, benchmarks, and historical information.</p>
              <span className="content-meta">500+ Articles</span>
              <a href="#" className="content-link">Explore →</a>
            </div>

            <div className="content-card card-purple">
              <div className="content-icon">📰</div>
              <h3>Latest News</h3>
              <p>Breaking news, announcements, and updates from the world of PC hardware and technology.</p>
              <span className="content-meta">Updated Daily</span>
              <a href="#" className="content-link">Explore →</a>
            </div>

            <div className="content-card card-orange">
              <div className="content-icon">⭐</div>
              <h3>Our Latest Review</h3>
              <p>In-depth analysis and performance testing of the newest CPUs, GPUs, and hardware components.</p>
              <span className="content-meta">Expert Reviews</span>
              <a href="#" className="content-link">Explore →</a>
            </div>

            <div className="content-card card-green">
              <div className="content-icon">�️</div>
              <h3>Best PC Builds</h3>
              <p>Curated PC build guides for every budget and purpose, from gaming rigs to workstation powerhouses.</p>
              <span className="content-meta">50+ Builds</span>
              <a href="#" className="content-link">Explore →</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* NEWS/REVIEWS SECTION */}
      <section className="news-section">
        <div className="content-container">
          <div className="section-header">
            <h2>Latest Hardware News & Reviews</h2>
            <p>Comprehensive coverage of the latest CPUs, GPUs, and computer hardware with detailed specifications</p>
          </div>
          
          <div className="filter-buttons">
            <button className="filter-btn active">🔥 All Articles</button>
            <button className="filter-btn">💻 CPUs</button>
            <button className="filter-btn">🎮 GPUs</button>
            <button className="filter-btn">⚙️ Other Hardware</button>
          </div>

          <div className="news-grid">
            {/* Article 1 */}
            <div className="news-card">
              <div className="news-image-wrapper">
                <span className="news-badge badge-cpu">CPU</span>
                <img src="images/Ryzen_7950X3D.webp" alt="AMD Ryzen 9 7950X3D" className="news-image"/>
              </div>
              <div className="news-content">
                <h3>AMD Ryzen 9 7950X3D Review: Gaming Performance Redefined</h3>
                <p>AMD&apos;s latest flagship processor combines 3D V-Cache technology with impressive multi-core performance.</p>
                <div className="news-stats">
                  <div className="stat-group">
                    <span className="stat-label">Cores</span>
                    <span className="stat-value">16</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Threads</span>
                    <span className="stat-value">32</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Base Clock</span>
                    <span className="stat-value">4.2 GHz</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Boost Clock</span>
                    <span className="stat-value">5.7 GHz</span>
                  </div>
                </div>
                <div className="news-footer">
                  <div className="news-date">📅 Mar 15</div>
                  <div className="news-author">👤 Sarah Chen</div>
                </div>
              </div>
            </div>

            {/* Article 2 */}
            <div className="news-card">
              <div className="news-image-wrapper">
                <span className="news-badge badge-gpu">GPU</span>
                <img src="images/rtx-5090.jpg" alt="NVIDIA RTX 5090" className="news-image"/>
              </div>
              <div className="news-content">
                <h3>NVIDIA RTX 5090: The Ultimate Graphics Card for 8K Gaming</h3>
                <p>NVIDIA&apos;s flagship GPU delivers unprecedented performance with revolutionary AI-powered features.</p>
                <div className="news-stats">
                  <div className="stat-group">
                    <span className="stat-label">Memory</span>
                    <span className="stat-value">24GB GDDR7</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Core Clock</span>
                    <span className="stat-value">2.8 GHz</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Cuda</span>
                    <span className="stat-value">16384</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">TDP</span>
                    <span className="stat-value">450W</span>
                  </div>
                </div>
                <div className="news-footer">
                  <div className="news-date">📅 Mar 14</div>
                  <div className="news-author">👤 Mike Rodriguez</div>
                </div>
              </div>
            </div>

            {/* Article 3 */}
            <div className="news-card">
              <div className="news-image-wrapper">
                <span className="news-badge badge-cpu">CPU</span>
                <img src="images/14900ks.webp" alt="Intel Core i9-14900KS" className="news-image"/>
              </div>
              <div className="news-content">
                <h3>Intel Core i9-14900KS: Breaking the 6 GHz Barrier</h3>
                <p>Intel&apos;s special edition processor pushes clock speeds to new heights for enthusiast builders.</p>
                <div className="news-stats">
                  <div className="stat-group">
                    <span className="stat-label">Cores</span>
                    <span className="stat-value">24</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Threads</span>
                    <span className="stat-value">32</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Base Clock</span>
                    <span className="stat-value">3.2 GHz</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Boost Clock</span>
                    <span className="stat-value">6.2 GHz</span>
                  </div>
                </div>
                <div className="news-footer">
                  <div className="news-date">📅 Mar 13</div>
                  <div className="news-author">👤 James Park</div>
                </div>
              </div>
            </div>

            {/* Article 4 */}
            <div className="news-card">
              <div className="news-image-wrapper">
                <span className="news-badge badge-gpu">GPU</span>
                <img src="images/amd7900xtx.jpg" alt="AMD Radeon RX 7900 XTX" className="news-image"/>
              </div>
              <div className="news-content">
                <h3>AMD Radeon RX 7900 XTX: Best Value for 4K Gaming in 2025</h3>
                <p>AMD&apos;s flagship RDNA 3 GPU offers exceptional performance per dollar for high-resolution gaming.</p>
                <div className="news-stats">
                  <div className="stat-group">
                    <span className="stat-label">Memory</span>
                    <span className="stat-value">24GB GDDR6</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Core Clock</span>
                    <span className="stat-value">2.5 GHz</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Compute Units</span>
                    <span className="stat-value">96</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">TDP</span>
                    <span className="stat-value">355W</span>
                  </div>
                </div>
                <div className="news-footer">
                  <div className="news-date">📅 Mar 12</div>
                  <div className="news-author">👤 Sarah Chen</div>
                </div>
              </div>
            </div>

            {/* Article 5 */}
            <div className="news-card">
              <div className="news-image-wrapper">
                <span className="news-badge badge-memory">Other</span>
                <img src="images/ddr5-ram.jpg" alt="DDR5 RAM" className="news-image"/>
              </div>
              <div className="news-content">
                <h3>DDR5-8000 RAM: Is It Worth the Premium Price?</h3>
                <p>We test the latest high-speed DDR5 memory kits to see if extreme speeds translate to real-world gains.</p>
                <div className="news-stats">
                  <div className="stat-group">
                    <span className="stat-label">Speed</span>
                    <span className="stat-value">8000 MHz</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Capacity</span>
                    <span className="stat-value">32GB</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Latency</span>
                    <span className="stat-value">CL38</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Voltage</span>
                    <span className="stat-value">1.45V</span>
                  </div>
                </div>
                <div className="news-footer">
                  <div className="news-date">📅 Mar 11</div>
                  <div className="news-author">👤 Mike Rodriguez</div>
                </div>
              </div>
            </div>

            {/* Article 6 */}
            <div className="news-card">
              <div className="news-image-wrapper">
                <span className="news-badge badge-other">Other</span>
                <img src="images/pcie5.0.jpg" alt="PCIe 5.0 SSD" className="news-image"/>
              </div>
              <div className="news-content">
                <h3>PCIe 5.0 SSDs: The Future of Storage is Here</h3>
                <p>Next-generation SSDs deliver blistering speeds that redefine what&apos;s possible in PC storage.</p>
                <div className="news-stats">
                  <div className="stat-group">
                    <span className="stat-label">Speed</span>
                    <span className="stat-value">14000 MB/s</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Capacity</span>
                    <span className="stat-value">2TB</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Interface</span>
                    <span className="stat-value">PCIe 5.0</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label">Endurance</span>
                    <span className="stat-value">1400 TBW</span>
                  </div>
                </div>
                <div className="news-footer">
                  <div className="news-date">📅 Mar 10</div>
                  <div className="news-author">👤 James Park</div>
                </div>
              </div>
            </div>
          </div>

          <div className="load-more">
            <a href="#" className="load-more-btn">Load More Articles →</a>
          </div>
        </div>
      </section>
    </div>
  );
}