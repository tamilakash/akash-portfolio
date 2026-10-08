import React from 'react';

const About = ({ personalInfo, stats, interests }) => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Get To Know Me</span>
          <h2 className="section-title">About My Journey</h2>
          <p className="section-description">
            Combining B.Tech Information Technology fundamentals with hands-on full stack internship experience.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-card stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-subtext">{stat.subtext}</div>
            </div>
          ))}
        </div>

        {/* Bio & Interests split */}
        <div className="about-grid">
          <div className="glass-card about-bio-card">
            <h3 className="card-heading">
              <i className="fa-solid fa-user-gear"></i> Profile Summary
            </h3>
            <p>
              I am an Information Technology undergraduate student with a passion for building high-performance web applications and Python utilities. Having recently completed a hands-on Full Stack Development Internship at <strong>MIST Software Solutions Pvt. Ltd.</strong>, I have gained real-world exposure to software engineering lifecycles, full stack architecture, and team collaboration.
            </p>
            <p>
              My core competencies range from building clean, interactive frontend interfaces using modern HTML, CSS, and JavaScript/React to developing backend logic and database structures with Python and SQL.
            </p>
            <div className="about-meta">
              <div className="meta-item">
                <i className="fa-solid fa-graduation-cap"></i>
                <div>
                  <small>Education</small>
                  <strong>B.Tech IT (2024 - 2027)</strong>
                </div>
              </div>
              <div className="meta-item">
                <i className="fa-solid fa-globe"></i>
                <div>
                  <small>Languages</small>
                  <strong>Tamil & English</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="interests-wrapper">
            <h3 className="card-heading" style={{ marginBottom: '1.25rem' }}>
              <i className="fa-solid fa-bullseye"></i> Key Areas of Interest
            </h3>
            <div className="interests-list">
              {interests.map((interest, idx) => (
                <div key={idx} className="glass-card interest-card">
                  <div className="interest-icon">
                    <i className={interest.icon}></i>
                  </div>
                  <div>
                    <h4 className="interest-title">{interest.title}</h4>
                    <p className="interest-desc">{interest.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3.5rem;
        }
        .stat-card {
          padding: 1.75rem 1.25rem;
          text-align: center;
        }
        .stat-value {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--accent-cyan);
          margin-bottom: 0.25rem;
        }
        .stat-label {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .stat-subtext {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .about-bio-card {
          padding: 2rem;
        }
        .card-heading {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .card-heading i {
          color: var(--accent-cyan);
        }
        .about-bio-card p {
          color: var(--text-secondary);
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        .about-meta {
          display: flex;
          gap: 2rem;
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-color);
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .meta-item i {
          font-size: 1.5rem;
          color: var(--accent-cyan);
        }
        .meta-item small {
          display: block;
          color: var(--text-muted);
          font-size: 0.75rem;
        }
        .meta-item strong {
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .interests-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .interest-card {
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }
        .interest-icon {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-sm);
          background: rgba(0, 242, 254, 0.1);
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
        }
        .interest-title {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        .interest-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default About;
