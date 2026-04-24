import axios from 'axios';

const fitproApi = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

fitproApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fitpro_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

fitproApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('fitpro_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default fitproApi;