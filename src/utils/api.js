import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Base backend URL for static files (uploads, etc.)
// Strip the trailing /api to get just the server root
export const BACKEND_URL = API_URL.replace(/\/api\/?$/, '');

const api = axios.create({ baseURL: API_URL });
export default api;