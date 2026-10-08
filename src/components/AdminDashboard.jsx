import React, { useState } from 'react';
import { 
  seedDatabase, 
  updateBio, 
  createSkill, 
  deleteSkill, 
  createProject, 
  deleteProject 
} from '../services/api';

const AdminDashboard = ({ isOpen, onClose, data, refreshData }) => {
  const [activeTab, setActiveTab] = useState('seed');
  const [msg, setMsg] = useState('');
  
  // Bio Form State
  const [bioInput, setBioInput] = useState({
    name: data.personalInfo.name || 'T. AKASH',
    title: data.personalInfo.title || 'Information Technology Undergraduate',
    objective: data.personalInfo.objective || ''
  });

  // Skill Form State
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'programming',
    level: 80,
    icon: 'fa-solid fa-code',
    color: '#00f2fe'
  });

  // Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Full Stack',
    tech: 'React, Node, MongoDB',
    description: '',
    link: 'https://github.com/tamilakash'
  });

  if (!isOpen) return null;

  const showNotification = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 4000);
  };

  const handleSeed = async () => {
    try {
      const res = await seedDatabase();
      showNotification(`✅ ${res.message || 'Database Seeded!'}`);
      await refreshData();
    } catch (err) {
      showNotification(`❌ Backend Server Error: Ensure 'server' is running on port 5000 (${err.message})`);
    }
  };

  const handleBioSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBio(bioInput);
      showNotification('✅ Personal Bio updated in MongoDB!');
      await refreshData();
    } catch (err) {
      showNotification(`❌ Error updating bio: Ensure backend server is running on port 5000.`);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name) return;
    try {
      await createSkill(newSkill);
      showNotification(`✅ Skill "${newSkill.name}" added to MongoDB!`);
      setNewSkill({ name: '', category: 'programming', level: 80, icon: 'fa-solid fa-code', color: '#00f2fe' });
      await refreshData();
    } catch (err) {
      showNotification(`❌ Error adding skill: Ensure backend server is running on port 5000.`);
    }
  };

  const handleDeleteSkill = async (id, name) => {
    if (!id) {
      showNotification(`⚠️ Please click "Seed MongoDB Database" first under 'DB Seed & Info' tab to enable database deletion!`);
      return;
    }
    try {
      await deleteSkill(id);
      showNotification(`🗑️ Skill "${name}" deleted from MongoDB!`);
      await refreshData();
    } catch (err) {
      showNotification(`❌ Error deleting skill: ${err.message}`);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    try {
      const formattedProject = {
        ...newProject,
        tech: typeof newProject.tech === 'string' ? newProject.tech.split(',').map(t => t.trim()) : newProject.tech
      };
      await createProject(formattedProject);
      showNotification(`✅ Project "${newProject.title}" added to MongoDB!`);
      setNewProject({ title: '', category: 'Full Stack', tech: 'React, Node, MongoDB', description: '', link: 'https://github.com/tamilakash' });
      await refreshData();
    } catch (err) {
      showNotification(`❌ Error adding project: Ensure backend server is running on port 5000.`);
    }
  };

  const handleDeleteProject = async (id, title) => {
    if (!id) {
      showNotification(`⚠️ Please click "Seed MongoDB Database" first under 'DB Seed & Info' tab to enable database deletion!`);
      return;
    }
    try {
      await deleteProject(id);
      showNotification(`🗑️ Project "${title}" deleted from MongoDB!`);
      await refreshData();
    } catch (err) {
      showNotification(`❌ Error deleting project: ${err.message}`);
    }
  };

  // Combine skills safely
  const allSkillsList = [
    ...(data.skills.programming || []),
    ...(data.skills.webTech || []),
    ...(data.skills.coreConcepts || [])
  ];

  return (
    <div className="admin-overlay">
      <div className="glass-card admin-modal">
        <div className="admin-header">
          <h3>
            <i className="fa-solid fa-database" style={{ color: 'var(--accent-cyan)' }}></i>
            MongoDB Portfolio Content Manager
          </h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {msg && <div className="admin-notification">{msg}</div>}

        <div className="admin-nav-tabs">
          <button 
            className={`admin-tab ${activeTab === 'seed' ? 'active' : ''}`}
            onClick={() => setActiveTab('seed')}
          >
            <i className="fa-solid fa-seedling"></i> DB Seed & Info
          </button>
          <button 
            className={`admin-tab ${activeTab === 'bio' ? 'active' : ''}`}
            onClick={() => setActiveTab('bio')}
          >
            <i className="fa-solid fa-user-pen"></i> Edit Bio
          </button>
          <button 
            className={`admin-tab ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <i className="fa-solid fa-code"></i> Skills CRUD
          </button>
          <button 
            className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <i className="fa-solid fa-folder-plus"></i> Projects CRUD
          </button>
        </div>

        <div className="admin-body">
          {/* TAB 1: SEED & STATUS */}
          {activeTab === 'seed' && (
            <div className="admin-pane">
              <h4>MongoDB Seed & Database Control</h4>
              <p>Populate your MongoDB database with T. Akash's initial resume content (Bio, Skills, Projects, Experience, Education) with a single click:</p>
              <button className="btn btn-primary" onClick={handleSeed} style={{ marginTop: '1rem' }}>
                <i className="fa-solid fa-database"></i> Seed MongoDB Database
              </button>
            </div>
          )}

          {/* TAB 2: EDIT BIO */}
          {activeTab === 'bio' && (
            <form onSubmit={handleBioSubmit} className="admin-pane">
              <h4>Update Personal Bio Details</h4>
              <div className="admin-field">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={bioInput.name} 
                  onChange={(e) => setBioInput({ ...bioInput, name: e.target.value })} 
                />
              </div>
              <div className="admin-field">
                <label>Title / Headline</label>
                <input 
                  type="text" 
                  value={bioInput.title} 
                  onChange={(e) => setBioInput({ ...bioInput, title: e.target.value })} 
                />
              </div>
              <div className="admin-field">
                <label>Objective</label>
                <textarea 
                  rows="4" 
                  value={bioInput.objective} 
                  onChange={(e) => setBioInput({ ...bioInput, objective: e.target.value })}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                <i className="fa-solid fa-floppy-disk"></i> Save Bio Changes
              </button>
            </form>
          )}

          {/* TAB 3: SKILLS CRUD */}
          {activeTab === 'skills' && (
            <div className="admin-pane">
              <h4>Add New Skill to MongoDB</h4>
              <form onSubmit={handleAddSkill} className="admin-inline-form">
                <input 
                  type="text" 
                  placeholder="Skill Name (e.g., Python)" 
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  required
                />
                <select 
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                >
                  <option value="programming">Programming</option>
                  <option value="webTech">Web Technologies</option>
                  <option value="coreConcepts">Core Concepts</option>
                </select>
                <input 
                  type="number" 
                  min="10" 
                  max="100"
                  placeholder="Level %"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  <i className="fa-solid fa-plus"></i> Add Skill
                </button>
              </form>

              <h4 style={{ marginTop: '1.5rem' }}>Active Skills List (Click Trash to Delete from DB)</h4>
              <div className="admin-item-list">
                {allSkillsList.map((skill, idx) => (
                  <div key={skill._id || idx} className="admin-item-row">
                    <span>
                      <strong>{skill.name}</strong> ({skill.category}) - {skill.level}%
                      {skill._id ? <span className="db-badge">DB Record</span> : <span className="fallback-badge">Static Fallback</span>}
                    </span>
                    <button 
                      className="btn-danger-icon" 
                      onClick={() => handleDeleteSkill(skill._id, skill.name)}
                      title={`Delete ${skill.name}`}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS CRUD */}
          {activeTab === 'projects' && (
            <div className="admin-pane">
              <h4>Add New Project to MongoDB</h4>
              <form onSubmit={handleAddProject} className="admin-form-stack">
                <div className="admin-field">
                  <label>Project Title</label>
                  <input 
                    type="text" 
                    placeholder="Title" 
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-field">
                  <label>Category & Tech Stack (comma separated)</label>
                  <input 
                    type="text" 
                    placeholder="React, Express, MongoDB" 
                    value={newProject.tech}
                    onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                  />
                </div>
                <div className="admin-field">
                  <label>Description</label>
                  <textarea 
                    rows="3" 
                    placeholder="Brief description..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  <i className="fa-solid fa-plus"></i> Add Project to MongoDB
                </button>
              </form>

              <h4 style={{ marginTop: '1.5rem' }}>Active Projects List (Click Trash to Delete from DB)</h4>
              <div className="admin-item-list">
                {(data.projects || []).map((proj, idx) => (
                  <div key={proj._id || idx} className="admin-item-row">
                    <span>
                      <strong>{proj.title}</strong> ({proj.category})
                      {proj._id ? <span className="db-badge">DB Record</span> : <span className="fallback-badge">Static Fallback</span>}
                    </span>
                    <button 
                      className="btn-danger-icon" 
                      onClick={() => handleDeleteProject(proj._id, proj.title)}
                      title={`Delete ${proj.title}`}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .admin-modal {
          width: 100%;
          max-width: 720px;
          max-height: 85vh;
          overflow-y: auto;
          padding: 2rem;
          background: var(--bg-secondary);
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .admin-header h3 {
          font-family: var(--font-heading);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: var(--text-primary);
        }
        .close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 1.4rem;
          cursor: pointer;
        }
        .close-btn:hover { color: var(--accent-cyan); }

        .admin-notification {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          background: rgba(0, 242, 254, 0.15);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 242, 254, 0.3);
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .admin-nav-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .admin-tab {
          padding: 0.55rem 1.1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .admin-tab.active {
          background: var(--accent-gradient);
          color: #0b0f19;
          border-color: transparent;
        }

        .admin-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }
        .admin-field label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .admin-field input, .admin-field textarea, .admin-field select {
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-family: var(--font-main);
        }
        .admin-inline-form {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 0.85rem;
        }
        .admin-inline-form input, .admin-inline-form select {
          padding: 0.55rem 0.75rem;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .admin-item-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 0.75rem;
          max-height: 220px;
          overflow-y: auto;
        }
        .admin-item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 0.9rem;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          font-size: 0.9rem;
        }
        .db-badge {
          font-size: 0.72rem;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          margin-left: 0.5rem;
          font-weight: 700;
        }
        .fallback-badge {
          font-size: 0.72rem;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          background: rgba(245, 158, 11, 0.15);
          color: #f59e0b;
          margin-left: 0.5rem;
          font-weight: 700;
        }
        .btn-danger-icon {
          background: rgba(244, 63, 94, 0.1);
          border: 1px solid rgba(244, 63, 94, 0.3);
          color: #f43f5e;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }
        .btn-danger-icon:hover {
          background: #f43f5e;
          color: #ffffff;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
