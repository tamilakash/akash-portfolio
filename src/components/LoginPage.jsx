import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/api';

const LoginPage = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

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
        onLoginSuccess(result);
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Authentication failed. Check credentials.');
    }
  };

  const switchTab = (toLogin) => {
    setIsLoginView(toLogin);
    setErrorMsg('');
  };

  return (
    <div className="login-page-wrapper">
      <div className="bg-glow bg-glow-cyan"></div>
      <div className="bg-glow bg-glow-purple"></div>

      <div className="glass-card login-gateway-card">
        <div className="login-gateway-header">
          <div className="gateway-brand-badge">A</div>
          <h2>T. AKASH PORTFOLIO</h2>
          <p className="gateway-subtitle">
            {isLoginView 
              ? 'Enter your credentials to access the portfolio' 
              : 'Create an admin account to enter the portfolio'}
          </p>
        </div>

        <div className="auth-nav-tabs">
          <button 
            className={`auth-tab ${isLoginView ? 'active' : ''}`}
            onClick={() => switchTab(true)}
          >
            <i className="fa-solid fa-right-to-bracket"></i> Sign In
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
                <span>{isLoginView ? 'Login & Enter Portfolio' : 'Register & Enter Portfolio'}</span>
              </>
            )}
          </button>
        </form>

        <div className="gateway-footer-hint">
          <span>Protected with JWT Authentication & MongoDB Encryption</span>
        </div>
      </div>

      <style>{`
        .login-page-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
        }
        .login-gateway-card {
          width: 100%;
          max-width: 450px;
          padding: 2.5rem;
          background: var(--bg-secondary);
          z-index: 10;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 242, 254, 0.15);
        }
        .login-gateway-header {
          text-align: center;
          margin-bottom: 1.75rem;
        }
        .gateway-brand-badge {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: var(--accent-gradient);
          color: #0b0f19;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem auto;
          box-shadow: 0 4px 20px rgba(0, 242, 254, 0.4);
        }
        .login-gateway-header h2 {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          color: var(--text-primary);
          letter-spacing: 0.5px;
        }
        .gateway-subtitle {
          color: var(--text-secondary);
          font-size: 0.88rem;
          margin-top: 0.35rem;
        }

        .auth-nav-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .auth-tab {
          flex: 1;
          padding: 0.65rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-secondary);
          font-size: 0.9rem;
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
        .form-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.4rem;
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
          padding: 0.9rem;
          font-size: 0.98rem;
        }
        .gateway-footer-hint {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
