
import axios from "axios";
import useErrorHandler from "@/hooks/useErrorHandler";
import UserFlight from "@/components/UserFlight";
import BoardingPass from "@/components/BoardingPass";
import Select from 'react-select';
import { API_ROUTES } from "@/config/api";
import { useEffect, useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // Assuming you have an Accordion component
import Loading from "@/components/Loading";
import customSelectStyles from "@/styles/customSelect";



const sortingOptions = [
    { value: 'dateAsc', label: 'Flight Date: Old to New' },
    { value: 'dateDesc', label: 'Flight Date: New to Old' },
    { value: 'reservationDateAsc', label: 'Reservation Date: Old to New' },
    { value: 'reservationDateDesc', label: 'Reservation Date: New to Old' }
];

const Flights = () => {
    const [flights, setFlights] = useState([]);
    const handleError = useErrorHandler(); // Use the custom hook for error handling
    const [loading, setLoading] = useState(true); // Loading state
    const [sortOption, setSortOption] = useState(null); // For sorting selection



    useEffect(() => {
        // Fetch user flight reservations from the API
        const fetchFlights = async () => {
            try {
                setLoading(true)
                const response = await axios.get(API_ROUTES.GET_USER_FLIGHTS, { withCredentials: true });
                setFlights(response.data);
            } catch (error) {
                console.error("Error fetching flights:", error);
                handleError(error);
            } finally {
                setLoading(false); // Stop loading after fetching
            }
        };
        fetchFlights();
    }, []);// Empty dependency array to run only on mount



    const handleSortChange = (option) => {
        setSortOption(option);
        sortFlights(option);
    };

    // Sort flights based on the selected option
    const sortFlights = (option) => {
        let sortedFlights = [...flights];
        // Sort based on the selected option using switch statement
        switch (option.value) {
            case 'dateAsc':
                sortedFlights.sort((a, b) => new Date(a.scheduleDateTime) - new Date(b.scheduleDateTime));
                break;
            case 'dateDesc':
                sortedFlights.sort((a, b) => new Date(b.scheduleDateTime) - new Date(a.scheduleDateTime));
                break;
            case 'reservationDateAsc':
                sortedFlights.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'reservationDateDesc':
                sortedFlights.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                break; // Optional: handle default case if needed
        }

        setFlights(sortedFlights);
    };

    if (loading) {
        return <Loading />
    }

    return (
        <div className="container mx-auto p-6">
            {flights.length === 0 ? (
                <p>No flight reservations found.</p>
            ) : (
                <>
                    <Select
                        id="sortingOptions"
                        value={sortOption}
                        onChange={handleSortChange}
                        options={sortingOptions}
                        placeholder="Sort By"
                        styles={customSelectStyles}
                        className="w-full"
                    />
                    <Accordion className="">
                        {flights.map((flight, index) => (
                            <AccordionItem key={index} value={`flight-${index}`}>
                                <AccordionTrigger>
                                    <UserFlight
                                        flight={flight}
                                    />
                                </AccordionTrigger>
                                <AccordionContent>
                                    <BoardingPass flight={flight} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </>
            )}
        </div>
    );
};

export default Flights;
