import axios from 'axios';

// Create an Axios instance for API requests
const api = axios.create({
  baseURL: 'https://backend-service-md3z.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// User API calls
export const getUsers = () => api.get('/users');
export const addUser = (name) => api.post('/users', { name });
export const claimPoints = (userId) => api.post('/users/claim', { userId });

// History API call with pagination
export const getHistory = (page = 1, limit = 10) => 
  api.get(`/history?page=${page}&limit=${limit}`);

export default api;