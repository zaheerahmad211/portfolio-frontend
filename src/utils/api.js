import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Base backend URL for static files (legacy /uploads/ paths)
export const BACKEND_URL = API_URL.replace(/\/api\/?$/, '');

/**
 * Smart image URL resolver — handles all URL types:
 *  - data:image/...  → base64 stored in MongoDB  (used directly)
 *  - https://...     → Cloudinary or external URL (used directly)
 *  - /uploads/...    → old local path             (prepend BACKEND_URL)
 *  - empty/null      → returns ''
 */
export function resolveImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('data:'))    return url;          // base64 data URL
  if (url.startsWith('http://') || url.startsWith('https://')) return url; // external
  return `${BACKEND_URL}${url}`;  // legacy local path
}

const api = axios.create({ baseURL: API_URL });
export default api;