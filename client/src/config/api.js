// Schiphol API URLs
const SCHIPOL_URL = import.meta.env.VITE_SCHIPOL_API_URL;
export const SCHIPOL_API_ROUTES = {
  DESTINATIONS: `${SCHIPOL_URL}/destinations`,
  FLIGHTS: `${SCHIPOL_URL}/flights`,
};

// API routes
const API_URL = import.meta.env.VITE_API_URL;
export const API_ROUTES = {
  //for authentication
  REGISTER: `${API_URL}/user/register`,
  LOGIN: `${API_URL}/user/login`,
  LOGOUT: `${API_URL}/user/logout`,

  //for flight reservation
  GET_USER_FLIGHTS: `${API_URL}/reservation/fetchFlight`,
  GET_FLIGHTS_BY_BOOKING_NUMBER: `${API_URL}/reservation/fetchFlight`,
  CREATE_FLIGHT_RESERVATION: `${API_URL}/reservation/createReservation`,
};
