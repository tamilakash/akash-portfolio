import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';
import { portfolioData } from './data/portfolioData';
import { fetchBio, fetchSkills, fetchProjects, fetchMe, removeAuthToken } from './services/api';

function App() {
  const [theme, setTheme] = useState('dark');
  const [adminOpen, setAdminOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isLiveFromMongo, setIsLiveFromMongo] = useState(false);
  const [data, setData] = useState(portfolioData);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Check JWT session token on load
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await fetchMe();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
    checkUser();
  }, []);

  const loadMongoData = useCallback(async () => {
    try {
      const [bioRes, skillsRes, projectsRes] = await Promise.all([
        fetchBio(),
        fetchSkills(),
        fetchProjects()
      ]);

      if (bioRes || Array.isArray(skillsRes) || Array.isArray(projectsRes)) {
        setIsLiveFromMongo(true);
        setData((prev) => ({
          ...prev,
          personalInfo: bioRes ? { ...prev.personalInfo, ...bioRes } : prev.personalInfo,
          skills: Array.isArray(skillsRes) ? {
            programming: skillsRes.filter(s => s.category === 'programming'),
            webTech: skillsRes.filter(s => s.category === 'webTech'),
            coreConcepts: skillsRes.filter(s => s.category === 'coreConcepts'),
            softSkills: prev.skills.softSkills
          } : prev.skills,
          projects: Array.isArray(projectsRes) ? projectsRes : prev.projects
        }));
      }
    } catch (err) {
      console.warn('MongoDB API offline, operating with local fallback data.');
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadMongoData();
    }
  }, [user, loadMongoData]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    loadMongoData();
  };

  const handleLogout = () => {
    removeAuthToken();
    setUser(null);
    setAdminOpen(false);
  };

  // Show loading spinner while checking initial token
  if (loadingUser) {
    return (
      <div className="login-page-wrapper">
        <div className="status-badge" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
          <span className="pulse-dot"></span>
          <span>Verifying Credentials...</span>
        </div>
      </div>
    );
  }

  // 🔒 GATEWAY: If user is not authenticated, show Login Screen first!
  if (!user) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // 🔓 AUTHENTICATED: Show Full Portfolio Website
  return (
    <div className="portfolio-app">
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        user={user}
        onOpenAdmin={() => setAdminOpen(true)}
        onLogout={handleLogout}
        isLiveFromMongo={isLiveFromMongo}
      />
      
      <main>
        <Hero personalInfo={data.personalInfo} />
        <About 
          personalInfo={data.personalInfo} 
          stats={data.stats} 
          interests={data.interests} 
        />
        <Skills skillsData={data.skills} />
        <Experience experienceData={data.experience} />
        <Education educationData={data.education} />
        <Projects 
          projectsData={data.projects} 
          hobbiesData={data.hobbies} 
        />
        <Contact personalInfo={data.personalInfo} />
      </main>

      <Footer personalInfo={data.personalInfo} />

      {/* Protected MongoDB Content Manager Modal */}
      <AdminDashboard 
        isOpen={adminOpen} 
        onClose={() => setAdminOpen(false)}
        data={data}
        refreshData={loadMongoData}
      />
    </div>
  );
}

export default App;
