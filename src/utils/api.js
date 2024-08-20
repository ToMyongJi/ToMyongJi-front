import axios from 'axios';
import useAuthStore from '../store/authStore';

// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/^http:/, 'https:');
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
