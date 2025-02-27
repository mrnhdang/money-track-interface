import axios from 'axios';

const API_ROUTE = process.env.LOCALHOST;

const api = axios.create({
  baseURL: API_ROUTE, // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the Bearer token dynamically
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); // Or wherever you store your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
