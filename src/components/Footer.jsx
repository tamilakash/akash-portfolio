import React from 'react';

const Footer = ({ personalInfo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-left">
          <a href="#hero" className="footer-brand">
            <span className="brand-badge">A</span>
            <span>T. AKASH</span>
          </a>
          <p className="footer-tagline">
            Information Technology Undergraduate & Full Stack Intern.
          </p>
        </div>

        <div className="footer-right">
          <div className="footer-socials">
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href={`mailto:${personalInfo.email}`} title="Email">
              <i className="fa-solid fa-envelope"></i>
            </a>
            <a href={`tel:${personalInfo.phone}`} title="Phone">
              <i className="fa-solid fa-phone"></i>
            </a>
          </div>

          <button className="top-btn" onClick={scrollToTop} title="Back to Top">
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} T. AKASH. All Rights Reserved. Built with HTML, CSS & React.</p>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding-top: 3.5rem;
        }
        .footer-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 2.5rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .footer-tagline {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }
        .footer-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .footer-socials {
          display: flex;
          gap: 0.85rem;
        }
        .footer-socials a {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .footer-socials a:hover {
          background: var(--accent-cyan);
          color: #0b0f19;
          transform: translateY(-3px);
        }
        .top-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--accent-gradient);
          color: #0b0f19;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 242, 254, 0.3);
          transition: all 0.2s ease;
        }
        .top-btn:hover {
          transform: translateY(-4px);
        }

        .footer-bottom {
          padding: 1.25rem 0;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid var(--border-color);
          text-align: center;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
