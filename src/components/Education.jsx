import React from 'react';

const Education = ({ educationData }) => {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Academic Background</span>
          <h2 className="section-title">Education History</h2>
          <p className="section-description">
            Strong foundational knowledge in Information Technology and computer science principles.
          </p>
        </div>

        <div className="timeline-wrapper">
          <div className="timeline-line"></div>
          {educationData.map((item, index) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-node">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <div className="glass-card timeline-content">
                <div className="timeline-top">
                  <span className="badge period-badge">
                    <i className="fa-regular fa-calendar"></i> {item.period}
                  </span>
                  <span className={`status-pill ${item.status === 'Currently Pursuing' ? 'active' : ''}`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="degree-title">{item.degree}</h3>
                <h4 className="institution-name">
                  <i className="fa-solid fa-school"></i> {item.institution}
                </h4>
                <p className="education-details">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .timeline-wrapper {
          position: relative;
          max-width: 850px;
          margin: 0 auto;
          padding: 1rem 0;
        }
        .timeline-line {
          position: absolute;
          left: 28px;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, var(--accent-cyan), var(--accent-purple));
          opacity: 0.4;
        }
        .timeline-item {
          position: relative;
          display: flex;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }
        .timeline-node {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 3px solid var(--accent-cyan);
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          z-index: 1;
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.4);
          flex-shrink: 0;
        }
        .timeline-content {
          flex-grow: 1;
          padding: 1.75rem;
        }
        .timeline-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.85rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .period-badge {
          font-size: 0.82rem;
        }
        .status-pill {
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
        }
        .status-pill.active {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .degree-title {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
        }
        .institution-name {
          font-size: 0.95rem;
          color: var(--accent-cyan);
          font-weight: 600;
          margin-bottom: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .education-details {
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.6;
        }

        @media (max-width: 600px) {
          .timeline-line { left: 18px; }
          .timeline-node { width: 40px; height: 40px; font-size: 1rem; }
          .timeline-item { gap: 1rem; }
        }
      `}</style>
    </section>
  );
};

export default Education;
