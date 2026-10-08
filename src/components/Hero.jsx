import React, { useState, useEffect } from 'react';

const Hero = ({ personalInfo }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
        setFadeState('fade-in');
      }, 300);
    }, 3200);
    return () => clearInterval(interval);
  }, [personalInfo.roles.length]);

  return (
    <section id="hero" className="section hero-section">
      <div className="bg-glow bg-glow-cyan"></div>
      <div className="bg-glow bg-glow-purple"></div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="status-badge">
            <span className="pulse-dot"></span>
            <span>Seeking Entry-Level Opportunities</span>
          </div>

          <h1 className="hero-name">
            Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
          </h1>

          <div className="hero-role-wrapper">
            <span className="role-prefix">Passionate </span>
            <span className={`hero-role gradient-text-subtle ${fadeState}`}>
              {personalInfo.roles[currentRoleIndex]}
            </span>
          </div>

          <p className="hero-objective">{personalInfo.objective}</p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              <i className="fa-solid fa-paper-plane"></i>
              <span>Get In Touch</span>
            </a>
            <a href="#experience" className="btn btn-secondary">
              <i className="fa-solid fa-briefcase"></i>
              <span>View Experience</span>
            </a>
            <a 
              href={personalInfo.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary github-btn"
              title="Visit GitHub Profile"
            >
              <i className="fa-brands fa-github"></i>
              <span>GitHub</span>
            </a>
          </div>

          <div className="hero-contact-strip">
            <div className="strip-item">
              <i className="fa-solid fa-location-dot"></i>
              <span>{personalInfo.location}</span>
            </div>
            <div className="strip-item">
              <i className="fa-solid fa-envelope"></i>
              <span>{personalInfo.email}</span>
            </div>
            <div className="strip-item">
              <i className="fa-solid fa-phone"></i>
              <span>{personalInfo.phone}</span>
            </div>
          </div>
        </div>

        {/* Profile Image Column */}
        <div className="hero-image-wrapper">
          <div className="photo-backdrop"></div>
          <div className="photo-card glass-card">
            <div className="photo-frame">
              <img 
                src={personalInfo.photo} 
                alt={personalInfo.name} 
                className="profile-img"
              />
            </div>
            <div className="floating-badge badge-top">
              <i className="fa-solid fa-laptop-code"></i>
              <div>
                <strong>MIST Software</strong>
                <span>Full Stack Intern</span>
              </div>
            </div>
            <div className="floating-badge badge-bottom">
              <i className="fa-solid fa-graduation-cap"></i>
              <div>
                <strong>B.Tech IT</strong>
                <span>2024 - 2027</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 92vh;
          display: flex;
          align-items: center;
          padding-top: 7rem;
        }
        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3.5rem;
          align-items: center;
          z-index: 1;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          background: rgba(0, 242, 254, 0.08);
          border: 1px solid rgba(0, 242, 254, 0.25);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-cyan);
          margin-bottom: 1.25rem;
        }
        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-cyan);
          box-shadow: 0 0 10px var(--accent-cyan);
          animation: pulseGlow 1.5s infinite;
        }
        .hero-name {
          font-family: var(--font-heading);
          font-size: 3.8rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .gradient-text {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gradient-text-subtle {
          color: var(--accent-cyan);
          font-weight: 700;
        }
        .hero-role-wrapper {
          font-size: 1.6rem;
          font-family: var(--font-heading);
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          min-height: 2.5rem;
        }
        .fade-in { opacity: 1; transition: opacity 0.3s ease; }
        .fade-out { opacity: 0; transition: opacity 0.3s ease; }

        .hero-objective {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 580px;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .hero-contact-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
        }
        .strip-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: var(--text-muted);
        }
        .strip-item i {
          color: var(--accent-cyan);
        }

        /* Image Styling */
        .hero-image-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .photo-backdrop {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: var(--accent-gradient);
          filter: blur(50px);
          opacity: 0.4;
          z-index: 0;
        }
        .photo-card {
          position: relative;
          padding: 1rem;
          border-radius: var(--radius-lg);
          z-index: 1;
        }
        .photo-frame {
          width: 290px;
          height: 350px;
          border-radius: calc(var(--radius-lg) - 6px);
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.15);
        }
        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.5s ease;
        }
        .photo-card:hover .profile-img {
          transform: scale(1.04);
        }

        .floating-badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          backdrop-filter: blur(12px);
          z-index: 2;
          animation: float 4s ease-in-out infinite;
        }
        .floating-badge i {
          font-size: 1.3rem;
          color: var(--accent-cyan);
        }
        .floating-badge strong {
          display: block;
          font-size: 0.85rem;
          color: var(--text-primary);
        }
        .floating-badge span {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .badge-top {
          top: -20px;
          right: -25px;
        }
        .badge-bottom {
          bottom: -20px;
          left: -25px;
          animation-delay: 2s;
        }

        @media (max-width: 992px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-objective { margin: 0 auto 2rem auto; }
          .hero-actions { justify-content: center; }
          .hero-contact-strip { justify-content: center; }
          .hero-image-wrapper { margin-top: 2rem; }
          .hero-name { font-size: 2.8rem; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
