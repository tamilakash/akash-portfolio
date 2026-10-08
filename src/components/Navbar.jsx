import React, { useState, useEffect } from 'react';

const Navbar = ({ 
  theme, 
  toggleTheme, 
  user, 
  onOpenAuth, 
  onOpenAdmin, 
  onLogout, 
  isLiveFromMongo 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#hero" className="nav-brand">
          <span className="brand-badge">A</span>
          <span className="brand-name">T. AKASH</span>
          {isLiveFromMongo && (
            <span className="db-indicator" title="Connected live to MongoDB REST API">
              <span className="db-dot"></span> MongoDB Live
            </span>
          )}
        </a>

        {/* Desktop Links */}
        <nav className="nav-desktop">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}

          {user ? (
            <div className="user-nav-group">
              <button 
                className="admin-nav-btn authenticated"
                onClick={onOpenAdmin}
                title="Open MongoDB Portfolio Manager"
              >
                <i className="fa-solid fa-user-check"></i>
                <span>Admin ({user.name.split(' ')[0]})</span>
              </button>
              <button 
                className="logout-nav-btn"
                onClick={onLogout}
                title="Sign Out"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
          ) : (
            <button 
              className="admin-nav-btn"
              onClick={onOpenAuth}
              title="Admin Signup or Login"
            >
              <i className="fa-solid fa-lock"></i> Admin Login
            </button>
          )}

          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <a href="#contact" className="btn btn-primary nav-cta">
            <span>Hire Me</span>
            <i className="fa-solid fa-arrow-right"></i>
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="mobile-actions">
          {user ? (
            <button 
              className="admin-nav-btn authenticated"
              onClick={onOpenAdmin}
              title="Open Admin Dashboard"
            >
              <i className="fa-solid fa-user-check"></i>
            </button>
          ) : (
            <button 
              className="admin-nav-btn"
              onClick={onOpenAuth}
              title="Admin Login"
            >
              <i className="fa-solid fa-lock"></i>
            </button>
          )}

          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <button 
            className="menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="nav-mobile-drawer">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          {user ? (
            <button 
              className="btn btn-secondary"
              onClick={() => { setMobileMenuOpen(false); onLogout(); }}
            >
              <i className="fa-solid fa-right-from-bracket"></i> Sign Out ({user.name})
            </button>
          ) : (
            <button 
              className="btn btn-secondary"
              onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
            >
              <i className="fa-solid fa-lock"></i> Admin Login / Sign Up
            </button>
          )}
        </div>
      )}

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 1.25rem 0;
          transition: all 0.3s ease;
        }
        .navbar.scrolled {
          padding: 0.85rem 0;
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          box-shadow: var(--shadow-md);
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }
        .brand-badge {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: var(--accent-gradient);
          color: #0b0f19;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 242, 254, 0.3);
        }
        .brand-name {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.5px;
        }
        .db-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
          margin-left: 0.5rem;
        }
        .db-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: var(--accent-cyan);
        }
        .user-nav-group {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .admin-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(0, 242, 254, 0.3);
          background: rgba(0, 242, 254, 0.08);
          color: var(--accent-cyan);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .admin-nav-btn.authenticated {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border-color: rgba(16, 185, 129, 0.3);
        }
        .admin-nav-btn:hover {
          transform: translateY(-2px);
        }
        .logout-nav-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(244, 63, 94, 0.1);
          border: 1px solid rgba(244, 63, 94, 0.3);
          color: #f43f5e;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }
        .logout-nav-btn:hover {
          background: #f43f5e;
          color: #ffffff;
        }
        .theme-toggle-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--accent-cyan);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          transition: all 0.2s ease;
        }
        .theme-toggle-btn:hover {
          background: rgba(0, 242, 254, 0.15);
          transform: rotate(15deg);
        }
        .nav-cta {
          padding: 0.6rem 1.25rem;
          font-size: 0.9rem;
        }
        .mobile-actions {
          display: none;
          align-items: center;
          gap: 0.75rem;
        }
        .menu-btn {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 1.25rem;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
        }
        .nav-mobile-drawer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
        }
        .mobile-nav-link {
          color: var(--text-primary);
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 600;
        }
        @media (max-width: 868px) {
          .nav-desktop { display: none; }
          .mobile-actions { display: flex; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
