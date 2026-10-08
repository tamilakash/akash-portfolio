import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/api';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      let result;
      if (isLoginView) {
        result = await loginUser({ email: formData.email, password: formData.password });
      } else {
        result = await registerUser(formData);
      }

      setLoading(false);
      if (result && result.token) {
        onSuccess(result);
        onClose();
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Authentication failed. Please check credentials.');
    }
  };

  const switchTab = (toLogin) => {
    setIsLoginView(toLogin);
    setErrorMsg('');
  };

  return (
    <div className="auth-overlay">
      <div className="glass-card auth-modal">
        <div className="auth-header">
          <h3>
            <i className="fa-solid fa-user-shield" style={{ color: 'var(--accent-cyan)' }}></i>
            {isLoginView ? 'Admin Login' : 'Create Admin Account'}
          </h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="auth-nav-tabs">
          <button 
            className={`auth-tab ${isLoginView ? 'active' : ''}`}
            onClick={() => switchTab(true)}
          >
            <i className="fa-solid fa-right-to-bracket"></i> Login
          </button>
          <button 
            className={`auth-tab ${!isLoginView ? 'active' : ''}`}
            onClick={() => switchTab(false)}
          >
            <i className="fa-solid fa-user-plus"></i> Sign Up
          </button>
        </div>

        {errorMsg && (
          <div className="auth-error-badge">
            <i className="fa-solid fa-circle-exclamation"></i> {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLoginView && (
            <div className="form-group">
              <label>Full Name *</label>
              <div className="input-with-icon">
                <i className="fa-solid fa-user"></i>
                <input 
                  type="text"
                  required
                  placeholder="e.g. T. Akash"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address *</label>
            <div className="input-with-icon">
              <i className="fa-solid fa-envelope"></i>
              <input 
                type="email"
                required
                placeholder="tamilakashakash52@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password *</label>
            <div className="input-with-icon">
              <i className="fa-solid fa-lock"></i>
              <input 
                type={showPassword ? 'text' : 'password'}
                required
                minLength="6"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button 
                type="button" 
                className="toggle-pwd-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary auth-submit-btn" disabled={loading}>
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <i className={`fa-solid ${isLoginView ? 'fa-right-to-bracket' : 'fa-user-plus'}`}></i>
                <span>{isLoginView ? 'Sign In & Unlock Dashboard' : 'Create Account & Login'}</span>
              </>
            )}
          </button>
        </form>
      </div>

      <style>{`
        .auth-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.78);
          backdrop-filter: blur(8px);
          z-index: 2500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .auth-modal {
          width: 100%;
          max-width: 440px;
          padding: 2rem;
          background: var(--bg-secondary);
        }
        .auth-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-color);
        }
        .auth-header h3 {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: var(--text-primary);
        }
        .auth-nav-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .auth-tab {
          flex: 1;
          padding: 0.6rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          transition: all 0.2s ease;
        }
        .auth-tab.active {
          background: var(--accent-gradient);
          color: #0b0f19;
          border-color: transparent;
        }
        .auth-error-badge {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          background: rgba(244, 63, 94, 0.15);
          color: #f43f5e;
          border: 1px solid rgba(244, 63, 94, 0.3);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-with-icon > i {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
          font-size: 0.95rem;
        }
        .input-with-icon input {
          width: 100%;
          padding: 0.8rem 2.8rem 0.8rem 2.6rem;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-family: var(--font-main);
          font-size: 0.92rem;
        }
        .input-with-icon input:focus {
          outline: none;
          border-color: var(--accent-cyan);
          background: rgba(0, 242, 254, 0.04);
        }
        .toggle-pwd-btn {
          position: absolute;
          right: 0.75rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 0.9rem;
          padding: 0.25rem;
        }
        .toggle-pwd-btn:hover { color: var(--accent-cyan); }
        .auth-submit-btn {
          width: 100%;
          justify-content: center;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default AuthModal;
