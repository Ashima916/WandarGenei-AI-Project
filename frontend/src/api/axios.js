import axios from 'axios';

// Base URL for regular (non-streaming) API calls.
// The trip-generation endpoint itself is called with fetch() directly in
// TripPlannerForm because we need access to the raw ReadableStream body,
// which axios does not expose in the browser.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export default api;
