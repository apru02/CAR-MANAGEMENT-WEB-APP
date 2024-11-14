import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

const api = axios.create({
  baseURL: API_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['auth-token'] = token;
  } else {
    delete api.defaults.headers.common['auth-token'];
  }
};

export default api;
