import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem('authToken') || null
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      // Fetch user details using the authToken
      fetchUserDetails();
    }
  }, [authToken]);

  const fetchUserDetails = async () => {
    try {
      const res = await fetch('/api/auth/getuser', {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
    fetchUserDetails();
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
