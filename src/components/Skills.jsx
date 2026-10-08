import React, { useState } from 'react';

const Skills = ({ skillsData }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'programming', label: 'Programming' },
    { id: 'webTech', label: 'Web Technologies' },
    { id: 'coreConcepts', label: 'Core CS Concepts' },
    { id: 'softSkills', label: 'Soft Skills' }
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Technical Expertise</span>
          <h2 className="section-title">Skills & Capabilities</h2>
          <p className="section-description">
            Technical stack and interpersonal abilities honed through academic coursework and internship projects.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="skills-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Technical Skills Grid */}
        {(activeCategory === 'all' || activeCategory === 'programming' || activeCategory === 'webTech' || activeCategory === 'coreConcepts') && (
          <div className="skills-grid">
            {/* Programming Languages */}
            {(activeCategory === 'all' || activeCategory === 'programming') && (
              <div className="glass-card skill-box">
                <h3 className="skill-box-title">
                  <i className="fa-solid fa-code"></i> Programming Languages
                </h3>
                <div className="skill-bars">
                  {skillsData.programming.map((item) => (
                    <div key={item.name} className="skill-bar-item">
                      <div className="skill-info">
                        <span className="skill-name">
                          <i className={item.icon} style={{ color: item.color, marginRight: '8px' }}></i>
                          {item.name}
                        </span>
                        <span className="skill-percent">{item.level}%</span>
                      </div>
                      <div className="skill-progress-bg">
                        <div className="skill-progress-fill" style={{ width: `${item.level}%`, background: item.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Web Technologies */}
            {(activeCategory === 'all' || activeCategory === 'webTech') && (
              <div className="glass-card skill-box">
                <h3 className="skill-box-title">
                  <i className="fa-solid fa-layer-group"></i> Web Technologies
                </h3>
                <div className="skill-bars">
                  {skillsData.webTech.map((item) => (
                    <div key={item.name} className="skill-bar-item">
                      <div className="skill-info">
                        <span className="skill-name">
                          <i className={item.icon} style={{ color: item.color, marginRight: '8px' }}></i>
                          {item.name}
                        </span>
                        <span className="skill-percent">{item.level}%</span>
                      </div>
                      <div className="skill-progress-bg">
                        <div className="skill-progress-fill" style={{ width: `${item.level}%`, background: item.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core CS Concepts */}
            {(activeCategory === 'all' || activeCategory === 'coreConcepts') && (
              <div className="glass-card skill-box">
                <h3 className="skill-box-title">
                  <i className="fa-solid fa-microchip"></i> Core Concepts
                </h3>
                <div className="skill-bars">
                  {skillsData.coreConcepts.map((item) => (
                    <div key={item.name} className="skill-bar-item">
                      <div className="skill-info">
                        <span className="skill-name">
                          <i className={item.icon} style={{ color: item.color, marginRight: '8px' }}></i>
                          {item.name}
                        </span>
                        <span className="skill-percent">{item.level}%</span>
                      </div>
                      <div className="skill-progress-bg">
                        <div className="skill-progress-fill" style={{ width: `${item.level}%`, background: item.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Soft Skills Section */}
        {(activeCategory === 'all' || activeCategory === 'softSkills') && (
          <div className="glass-card soft-skills-card">
            <h3 className="skill-box-title">
              <i className="fa-solid fa-comments"></i> Soft Skills & Professional Attributes
            </h3>
            <div className="soft-skills-pills">
              {skillsData.softSkills.map((skill, idx) => (
                <div key={idx} className="soft-pill">
                  <i className="fa-solid fa-check"></i>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .skills-tabs {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 3rem;
        }
        .tab-btn {
          padding: 0.65rem 1.4rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .tab-btn:hover, .tab-btn.active {
          background: var(--accent-gradient);
          color: #0b0f19;
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(0, 242, 254, 0.3);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.75rem;
          margin-bottom: 2rem;
        }
        .skill-box {
          padding: 1.75rem;
        }
        .skill-box-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }
        .skill-box-title i {
          color: var(--accent-cyan);
        }
        .skill-bars {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .skill-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
        }
        .skill-percent {
          color: var(--accent-cyan);
        }
        .skill-progress-bg {
          height: 8px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }
        .skill-progress-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 1s ease-in-out;
        }

        .soft-skills-card {
          padding: 2rem;
          margin-top: 1.5rem;
        }
        .soft-skills-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 1rem;
        }
        .soft-pill {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.35rem;
          border-radius: var(--radius-full);
          background: rgba(0, 242, 254, 0.08);
          border: 1px solid rgba(0, 242, 254, 0.2);
          color: var(--text-primary);
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .soft-pill:hover {
          transform: translateY(-2px);
          background: rgba(0, 242, 254, 0.18);
          border-color: var(--accent-cyan);
        }
        .soft-pill i {
          color: var(--accent-cyan);
        }
      `}</style>
    </section>
  );
};

export default Skills;
