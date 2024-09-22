import userAtom from "@/atoms/user"; // Assuming user data is stored in Recoil
import axios from "axios";
import { useRecoilState } from "recoil";
import { API_ROUTES } from "@/config/api";
import { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import FlightList from "@/components/FlightList";
import useErrorHandler from "@/hooks/useErrorHandler";

const UserProfile = () => {
    const [user, setUser] = useRecoilState(userAtom); // Get user data from Recoil
    const [flights, setFlights] = useState([]);
    const handleError = useErrorHandler(); // Use the custom hook for error handling


    useEffect(() => {
        // Fetch user flight reservations from the API
        const fetchFlights = async () => {
            try {
                const response = await axios.get(API_ROUTES.GET_USER_FLIGHTS);
                setFlights(response.data);
            } catch (error) {
                console.error("Error fetching flights:", error);
            }
        };
        fetchFlights();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.get(API_ROUTES.LOGOUT); // Call the logout API
            if (response.status === 200) {
                setUser(null); // Clear user data in Recoil
                localStorage.removeItem("user"); // Remove user data from localStorage
            }
        } catch (error) {
            handleError(error);
        }
    };


    const currentDate = new Date();

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-center items-center">
                <div className="bg-white shadow-md rounded-md p-4 mb-6 w-96">
                    <div className="flex flex-col items-center">
                        <div>
                            <Avatar />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 mt-2">
                            <p className="">Name : {user.name}</p>
                            <p className="">Email : {user.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-md p-4">
                <h2 className="text-xl font-semibold">Your Flights</h2>
                {flights.length === 0 ? (
                    <p>No flight reservations found.</p>
                ) : (
                    <FlightList flights={flights} />
                )}
            </div>
        </div>
    );
};

export default UserProfile;
