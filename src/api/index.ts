import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://fittrack.helperly.in/api',
  withCredentials: true,
});

export default API;

