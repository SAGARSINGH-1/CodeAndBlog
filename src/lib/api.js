// src/lib/api.js
import axios from 'axios';
import conf from '../conf/conf.js';

const api = axios.create({
  baseURL: `${conf.apiUrl}/api`,
});

// Attach JWT on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Let the browser set multipart boundary when body is FormData
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});

export default api;