import { SCHIPOL_API_ROUTES } from "@/config/api";
import axios from "axios";

// Schiphol API credentials
const apiId = import.meta.env.VITE_SCHIPOL_API_ID;
const apiKey = import.meta.env.VITE_SCHIPOL_API_KEY;

// Fetch locations by IATA code using the Schiphol Public Flights API
export const fetchLocationsByIATA = async (iata, setLocations) => {
  try {
    const response = await axios.get(`${SCHIPOL_API_ROUTES.DESTINATIONS}/${iata}`, {
      headers: {
        ResourceVersion: "v4", // API version
        app_id: apiId,
        app_key: apiKey,
      },
    });
    // Assuming the API returns data in a specific format
    const data = response.data;

    if (data.iata === "AMS") {
      return;
    }
    setLocations((prevLocations) => {
      const isDuplicate = prevLocations.some(
        (location) => location.value === data.iata
      );
      if (isDuplicate) {
        return prevLocations;
      }
      return [
        ...prevLocations,
        {
          value: data.iata,
          label: `${data.publicName.english}, ${data.country}`,
        },
      ];
    });
  } catch (err) {
    console.error("Error fetching locations:", err);
  }
};
