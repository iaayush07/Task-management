import axios from 'axios';
import { useToaster } from './../utility/custom-hooks/useToaster'; // Ensure the path is correct

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    const { showToast } = useToaster();
    showToast('Error', errorMessage);
    return Promise.reject(error);
  }
);

export default axiosInstance;


