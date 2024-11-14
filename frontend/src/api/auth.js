import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://car-management-web-app.onrender.com/api';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/create-user`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};
