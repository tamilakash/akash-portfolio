import React, { useState } from 'react';

const Contact = ({ personalInfo }) => {
  const [copiedField, setCopiedField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 4000);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Let's Connect</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-description">
            Open for entry-level full stack and Python software development roles. Feel free to reach out!
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Details & Info Cards */}
          <div className="contact-info-column">
            <div className="glass-card contact-card">
              <div className="contact-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="contact-details">
                <span className="contact-label">Email Address</span>
                <span className="contact-value">{personalInfo.email}</span>
              </div>
              <button 
                className="copy-btn"
                onClick={() => handleCopy(personalInfo.email, 'email')}
                title="Copy Email"
              >
                <i className={`fa-solid ${copiedField === 'email' ? 'fa-check' : 'fa-copy'}`}></i>
                <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="glass-card contact-card">
              <div className="contact-icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="contact-details">
                <span className="contact-label">Phone Number</span>
                <span className="contact-value">{personalInfo.phone}</span>
              </div>
              <button 
                className="copy-btn"
                onClick={() => handleCopy(personalInfo.phone, 'phone')}
                title="Copy Phone Number"
              >
                <i className={`fa-solid ${copiedField === 'phone' ? 'fa-check' : 'fa-copy'}`}></i>
                <span>{copiedField === 'phone' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="glass-card contact-card">
              <div className="contact-icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="contact-details">
                <span className="contact-label">Location</span>
                <span className="contact-value">{personalInfo.location}</span>
              </div>
            </div>

            <div className="glass-card contact-card">
              <div className="contact-icon">
                <i className="fa-brands fa-github"></i>
              </div>
              <div className="contact-details">
                <span className="contact-label">GitHub Repository</span>
                <a 
                  href={personalInfo.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-link"
                >
                  {personalInfo.githubHandle}
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="glass-card contact-form-card">
            <h3 className="form-title">Send Me a Message</h3>
            
            {formSubmitted ? (
              <div className="form-success-msg">
                <i className="fa-solid fa-circle-check"></i>
                <h4>Message Sent Successfully!</h4>
                <p>Thank you for reaching out, Akash will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Your Email *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input 
                    type="text" 
                    placeholder="Inquiry / Job Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea 
                    rows="5" 
                    required 
                    placeholder="Hello Akash, I would like to discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary form-submit-btn">
                  <i className="fa-solid fa-paper-plane"></i>
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 2rem;
        }
        .contact-info-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .contact-card {
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .contact-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: rgba(0, 242, 254, 0.1);
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
        }
        .contact-details {
          flex-grow: 1;
        }
        .contact-label {
          display: block;
          font-size: 0.78rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        .contact-value, .contact-link {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
        }
        .contact-link {
          color: var(--accent-cyan);
        }
        .copy-btn {
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.2s ease;
        }
        .copy-btn:hover {
          background: var(--accent-cyan);
          color: #0b0f19;
          border-color: var(--accent-cyan);
        }

        .contact-form-card {
          padding: 2.25rem;
        }
        .form-title {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-family: var(--font-main);
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }
        .form-group input:focus, .form-group textarea:focus {
          outline: none;
          border-color: var(--accent-cyan);
          background: rgba(0, 242, 254, 0.03);
          box-shadow: 0 0 10px rgba(0, 242, 254, 0.2);
        }
        .form-submit-btn {
          width: 100%;
          justify-content: center;
          margin-top: 0.5rem;
        }
        .form-success-msg {
          text-align: center;
          padding: 3rem 1.5rem;
        }
        .form-success-msg i {
          font-size: 3.5rem;
          color: #10b981;
          margin-bottom: 1rem;
        }
        .form-success-msg h4 {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .form-success-msg p {
          color: var(--text-secondary);
        }

        @media (max-width: 850px) {
          .contact-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
