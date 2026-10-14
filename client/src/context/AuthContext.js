import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// Har axios request me token automatically jaye
function setAuthHeader(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Page refresh par: saved token se user wapas laao
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    setAuthHeader(token);
    axios
      .get('/api/v1/auth/me')
      .then(res => setUser(res.data.data))
      .catch(() => {
        localStorage.removeItem('token');
        setAuthHeader(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const authRequest = async (url, body) => {
    try {
      const res = await axios.post(url, body);
      localStorage.setItem('token', res.data.token);
      setAuthHeader(res.data.token);
      setUser(res.data.user);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Network error');
    }
  };

  const login = (email, password) =>
    authRequest('/api/v1/auth/login', { email, password });

  const register = (name, email, password) =>
    authRequest('/api/v1/auth/register', { name, email, password });

  const logout = () => {
    localStorage.removeItem('token');
    setAuthHeader(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, setError, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
