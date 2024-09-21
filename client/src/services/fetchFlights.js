import axios from "axios";

// Fetch flights based on the filters and page number
export const fetchFlights = async ({ pageParam = 0, fetchURL }) => {
  const url = `${fetchURL}&page=${pageParam}`;
  try {
    const response = await axios.get(url, {
      headers: {
        ResourceVersion: "v4", // API version
        app_id: import.meta.env.VITE_SCHIPOL_API_ID,
        app_key: import.meta.env.VITE_SCHIPOL_API_KEY,
      },
    });
    if (response.status === 204) {
      return { flights: [] }; // Return empty flights when 204 is received
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};
