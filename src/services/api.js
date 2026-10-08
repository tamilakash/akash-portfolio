const API_BASE_URL = '/api';

// Token Management Helpers
export const getAuthToken = () => localStorage.getItem('portfolio_jwt_token');

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('portfolio_jwt_token', token);
  } else {
    localStorage.removeItem('portfolio_jwt_token');
  }
};

export const removeAuthToken = () => localStorage.removeItem('portfolio_jwt_token');

const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Authentication Service Calls
export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  if (data.token) setAuthToken(data.token);
  return data;
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  if (data.token) setAuthToken(data.token);
  return data;
};

export const fetchMe = async () => {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      removeAuthToken();
      return null;
    }
    return await res.json();
  } catch (err) {
    return null;
  }
};

// Portfolio Public Read Calls
export const fetchBio = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/bio`);
    if (!res.ok) throw new Error('Failed to fetch bio');
    return await res.json();
  } catch (err) {
    console.warn('MongoDB API offline, falling back to local dataset');
    return null;
  }
};

export const fetchSkills = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/skills`);
    if (!res.ok) throw new Error('Failed to fetch skills');
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const fetchProjects = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return await res.json();
  } catch (err) {
    return null;
  }
};

// Protected CRUD Calls (Require Bearer JWT Token)
export const updateBio = async (bioData) => {
  const res = await fetch(`${API_BASE_URL}/bio`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(bioData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update bio');
  return data;
};

export const createSkill = async (skillData) => {
  const res = await fetch(`${API_BASE_URL}/skills`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(skillData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create skill');
  return data;
};

export const deleteSkill = async (id) => {
  const res = await fetch(`${API_BASE_URL}/skills/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete skill');
  return data;
};

export const createProject = async (projectData) => {
  const res = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(projectData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create project');
  return data;
};

export const deleteProject = async (id) => {
  const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete project');
  return data;
};

export const seedDatabase = async () => {
  const res = await fetch(`${API_BASE_URL}/seed`, {
    method: 'POST',
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to seed database');
  return data;
};
