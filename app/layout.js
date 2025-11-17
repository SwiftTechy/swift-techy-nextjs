import './globals.css'

export const metadata = {
  title: 'Swift Techy - PC Hardware Blog',
  description: 'Your trusted source for PC hardware news and reviews',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

// ===== PASTE YOUR HEADER HTML HERE =====
function Header() {
  return (
    
    <header>
        <div className="header-content">
            <div className="logo">
                <div className="logo-icon">ST</div>
                Swift Techy
            </div>
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#cpus">CPUs</a></li>
                    <li><a href="#gpus">GPUs</a></li>
                    <li><a href="#reviews">Reviews</a></li>
                    <li><a href="#news">News</a></li>
                </ul>
            </nav>
            <div className="search-box">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Search articles..."/>
            </div>
        </div>
    </header>
  )
}

// ===== PASTE YOUR FOOTER HTML HERE =====
function Footer() {
  return (
    // Copy the HTML from: <!-- FOOTER -->
    <footer>
    <div className="footer-content">
        <div className="footer-brand">
            <div className="footer-logo">
                <div className="footer-logo-icon">ST</div>
                <span className="footer-logo-text">Swift Techy</span>
            </div>
            <p className="footer-description">Your trusted source for PC hardware news, reviews, and specifications.</p>
            <div className="social-links">
                <a href="#" className="social-icon" aria-label="Twitter">𝕏</a>
                <a href="#" className="social-icon" aria-label="GitHub">⚡</a>
                <a href="#" className="social-icon" aria-label="LinkedIn">in</a>
            </div>
        </div>
        
        <div className="footer-column">
            <h4>Categories</h4>
            <ul>
                <li><a href="#">CPU Reviews</a></li>
                <li><a href="#">GPU Reviews</a></li>
                <li><a href="#">Memory & Storage</a></li>
                <li><a href="#">Cooling Solutions</a></li>
            </ul>
        </div>
        
        <div className="footer-column">
            <h4>Resources</h4>
            <ul>
                <li><a href="#">Spec Database</a></li>
                <li><a href="#">Buying Guides</a></li>
                <li><a href="#">Benchmarks</a></li>
                <li><a href="#">Latest News</a></li>
            </ul>
        </div>
        
        <div className="footer-column">
            <h4>Company</h4>
            <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Our Team</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Privacy Policy</a></li>
            </ul>
        </div>
    </div>
    
    <div className="footer-bottom">
        <div className="footer-bottom-left">
            <span>© 2025 Swift Techy. All rights reserved.</span>
        </div>
        <div className="made-with">
            <span>Made with</span>
            <span className="heart-icon">❤️</span>
            <span>for hardware enthusiasts</span>
        </div>
    </div>
</footer>
  )
}