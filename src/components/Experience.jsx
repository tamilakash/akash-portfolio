import React from 'react';

const Experience = ({ experienceData }) => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Work History</span>
          <h2 className="section-title">Internship Experience</h2>
          <p className="section-description">
            Hands-on professional exposure gained through industry internship training.
          </p>
        </div>

        <div className="experience-list">
          {experienceData.map((exp) => (
            <div key={exp.id} className="glass-card experience-card">
              <div className="exp-header">
                <div className="exp-icon-box">
                  <i className="fa-solid fa-briefcase"></i>
                </div>
                <div className="exp-title-area">
                  <div className="exp-top-row">
                    <h3 className="exp-role">{exp.role}</h3>
                    <span className="badge duration-badge">
                      <i className="fa-regular fa-clock"></i> {exp.duration}
                    </span>
                  </div>
                  <h4 className="exp-company">
                    <i className="fa-solid fa-building"></i> {exp.company}
                  </h4>
                </div>
              </div>

              <div className="exp-body">
                <p className="exp-intro">
                  Under professional guidance, worked across both frontend and backend software components, applying core computer science and web development concepts in a real-world project environment:
                </p>
                <ul className="exp-highlights">
                  {exp.highlights.map((point, idx) => (
                    <li key={idx}>
                      <span className="bullet-icon">
                        <i className="fa-solid fa-check"></i>
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="exp-footer">
                <span className="exp-tag"><i className="fa-solid fa-code"></i> Frontend & Backend Workflows</span>
                <span className="exp-tag"><i className="fa-solid fa-gears"></i> SDLC Practices</span>
                <span className="exp-tag"><i className="fa-solid fa-users"></i> Team Collaboration</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .experience-list {
          max-width: 900px;
          margin: 0 auto;
        }
        .experience-card {
          padding: 2.25rem;
          position: relative;
        }
        .exp-header {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-color);
        }
        .exp-icon-box {
          width: 54px;
          height: 54px;
          border-radius: var(--radius-md);
          background: var(--accent-gradient);
          color: #0b0f19;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(0, 242, 254, 0.3);
        }
        .exp-title-area {
          flex-grow: 1;
        }
        .exp-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .exp-role {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          color: var(--text-primary);
          font-weight: 700;
        }
        .exp-company {
          font-size: 1.05rem;
          color: var(--accent-cyan);
          font-weight: 600;
          margin-top: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .duration-badge {
          font-size: 0.82rem;
        }

        .exp-intro {
          color: var(--text-secondary);
          font-size: 1rem;
          margin-bottom: 1rem;
        }
        .exp-highlights {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.5rem;
        }
        .exp-highlights li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .bullet-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(0, 242, 254, 0.15);
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          flex-shrink: 0;
          margin-top: 3px;
        }

        .exp-footer {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          padding-top: 1rem;
          border-top: 1px dashed var(--border-color);
        }
        .exp-tag {
          font-size: 0.82rem;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
        }
        .exp-tag i {
          color: var(--accent-cyan);
          margin-right: 0.3rem;
        }

        @media (max-width: 600px) {
          .exp-header { flex-direction: column; }
          .exp-top-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
};

export default Experience;
