import axios from 'axios';

import { API_BASE_URL } from './env';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// // SessionToken
// const getSessionToken = () => localStorage.getItem('sessionToken');

// // Interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = getSessionToken();
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default api;
