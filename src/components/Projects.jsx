import React, { useState } from 'react';

const Projects = ({ projectsData, hobbiesData }) => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Full Stack', 'Python App', 'Frontend'];

  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Portfolio Highlights</span>
          <h2 className="section-title">Projects & Hobbies</h2>
          <p className="section-description">
            Showcase of full stack implementations, Python tools, and personal interests.
          </p>
        </div>

        {/* Project Filters */}
        <div className="project-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="glass-card project-card">
              <div className="project-header">
                <span className="badge category-badge">{project.category}</span>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link-icon"
                  title="View on GitHub"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech-stack">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="tech-pill">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hobbies & Passions Section */}
        <div className="hobbies-section">
          <h3 className="hobbies-heading">
            <i className="fa-solid fa-heart"></i> Hobbies & Interests
          </h3>
          <div className="hobbies-grid">
            {hobbiesData.map((hobby, idx) => (
              <div key={idx} className="glass-card hobby-card">
                <div className="hobby-icon">
                  <i className={hobby.icon}></i>
                </div>
                <div>
                  <h4 className="hobby-title">{hobby.name}</h4>
                  <p className="hobby-desc">{hobby.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .project-filters {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }
        .filter-btn {
          padding: 0.5rem 1.2rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .filter-btn:hover, .filter-btn.active {
          background: var(--accent-cyan);
          color: #0b0f19;
          border-color: var(--accent-cyan);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.75rem;
          margin-bottom: 4rem;
        }
        .project-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        .category-badge {
          font-size: 0.75rem;
        }
        .project-link-icon {
          width: 36px;
          height: 36px;
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
        .project-link-icon:hover {
          background: var(--accent-cyan);
          color: #0b0f19;
          transform: scale(1.1);
        }
        .project-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 0.6rem;
        }
        .project-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }
        .project-tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .tech-pill {
          font-size: 0.78rem;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          background: rgba(0, 242, 254, 0.08);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 242, 254, 0.15);
        }

        .hobbies-section {
          max-width: 900px;
          margin: 0 auto;
        }
        .hobbies-heading {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }
        .hobbies-heading i {
          color: #f43f5e;
        }
        .hobbies-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .hobby-card {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .hobby-icon {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: var(--accent-gradient);
          color: #0b0f19;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .hobby-title {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        .hobby-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .hobbies-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
