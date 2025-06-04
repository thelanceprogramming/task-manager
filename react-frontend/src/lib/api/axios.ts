import axios from 'axios';
import { getCookie } from 'cookies-next';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const method = config.method?.toLowerCase();
  if (method && ['post', 'put', 'patch', 'delete'].includes(method)) {
    try {
      await axios.get('/sanctum/csrf-cookie', {
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        withCredentials: true,
      });

      const csrfToken = getCookie('XSRF-TOKEN');
      if (csrfToken && typeof csrfToken === 'string') {
        config.headers.set?.('X-XSRF-TOKEN', csrfToken); 
      }
    } catch (error) {
      console.error('CSRF token error:', error);
    }
  }

  return config;
});

export default axiosInstance;
