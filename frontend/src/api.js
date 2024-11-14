// frontend/src/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' }); // Use backend's base URL

// Add token to requests if logged in
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// User Auth APIs
export const signup = (data) => API.post('/auth/create-user', data);
export const login = (data) => API.post('/auth/login', data);

// Car Management APIs
export const createCar = (data) => API.post('/cars', data);
export const getCars = () => API.get('/cars');
export const getCar = (id) => API.get(`/cars/${id}`);
export const updateCar = (id, data) => API.put(`/cars/${id}`, data);
export const deleteCar = (id) => API.delete(`/cars/${id}`);