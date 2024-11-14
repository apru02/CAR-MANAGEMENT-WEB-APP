import axios from 'axios';

const API_URL = 'https://car-management-web-app.onrender.com/api';

const getAuthHeader = () => ({
  headers: { 'auth-token': localStorage.getItem('token') }
});

export const createCar = async (carData) => {
  const response = await axios.post(`${API_URL}/cars/create`, carData, getAuthHeader());
  return response.data;
};

export const getCars = async () => {
  const response = await axios.get(`${API_URL}/cars`, getAuthHeader());
  return response.data;
};

export const searchCars = async (keyword) => {
  const response = await axios.get(`${API_URL}/cars/search?keyword=${keyword}`, getAuthHeader());
  return response.data;
};

export const getCarById = async (id) => {
  const response = await axios.get(`${API_URL}/cars/${id}`, getAuthHeader());
  return response.data;
};

export const updateCar = async (id, carData) => {
  const response = await axios.put(`${API_URL}/cars/${id}`, carData, getAuthHeader());
  return response.data;
};

export const deleteCar = async (id) => {
  const response = await axios.delete(`${API_URL}/cars/${id}`, getAuthHeader());
  return response.data;
};