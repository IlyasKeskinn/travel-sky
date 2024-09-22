// Schiphol API URLs
const SCHIPOL_URL = import.meta.env.VITE_SCHIPOL_API_URL;
export const SCHIPOL_API_ROUTES = {
  DESTINATIONS: `${SCHIPOL_URL}/destinations`,
  FLIGHTS: `${SCHIPOL_URL}/flights`,
};


// API routes
const API_URL = import.meta.env.VITE_API_URL;
export const API_ROUTES = {
  REGISTER: `${API_URL}/user/register`,
  LOGIN: `${API_URL}/user/login`,
  LOGOUT: `${API_URL}/user/logout`,
};
