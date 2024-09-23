import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';
import { useEffect, useState } from 'react';
import { selectedDepartureFlightAtom, selectedReturnFlightAtom } from '@/atoms/selectedFlights';
import { flightFilterAtom } from '@/atoms/flightFilter';
import { API_ROUTES } from '@/config/api';
import useErrorHandler from "@/hooks/useErrorHandler";
import FlightTile from '@/components/FlightTile';
import axios from 'axios';
import ReservationConfirmSuccess from '@/components/ReservationConfirmSuccess';


const BookConfirm = () => {
    const navigate = useNavigate();
    const selectedDepartureFlight = useRecoilValue(selectedDepartureFlightAtom);
    const selectedReturnFlight = useRecoilValue(selectedReturnFlightAtom);
    const resetDepartureFlight = useResetRecoilState(selectedDepartureFlightAtom);
    const resetReturnFlight = useResetRecoilState(selectedReturnFlightAtom);
    const resetFlightFilter = useResetRecoilState(flightFilterAtom);
    const { handleError } = useErrorHandler();
    const [showConfirmation, setShowConfirmation] = useState(false);


    useEffect(() => {
        // If the departure flight is not selected, redirect the user to the home page
        if (!selectedDepartureFlight) {
            navigate(ROUTES.HOME);
        }
    }, [selectedDepartureFlight, navigate]);

    const saveFlight = async (flight) => {
        try {
            // Send a POST request to save the flight reservation to the API
            const response = await axios.post(API_ROUTES.CREATE_FLIGHT_RESERVATION, flight, {
                withCredentials: true, // Include credentials with the request
            });
        } catch (error) {
            // Call error handling if there is an error
            handleError(error);
        }
    }

    const handleConfirmBooking = async () => {
        // Save the departure flight
        await saveFlight(selectedDepartureFlight);

        // If a return flight is selected, save it as well
        if (selectedReturnFlight !== null && selectedReturnFlight !== undefined) {
            await saveFlight(selectedReturnFlight);
        }

        // Show confirmation animation
        setShowConfirmation(true);
    };

    const handleAnimationComplete = () => {
        // Redirect to the flights page after the animation completes
        resetDepartureFlight();
        resetReturnFlight();
        resetFlightFilter();
        localStorage.removeItem("selectedDepartureFlight");
        localStorage.removeItem("selectedReturnFlight");
        localStorage.removeItem("flightFilter");
        navigate(ROUTES.FLIGHTS);
    };



    return (
        <div className="container mx-auto my-4">
            <h2 className="text-2xl font-bold text-center mb-4">Confirm Your Booking</h2>
            {showConfirmation && <ReservationConfirmSuccess onComplete={handleAnimationComplete} />}
            {selectedDepartureFlight && (
                <div>
                    <h6 className='mb-2'>Departure Flight:</h6>
                    <FlightTile flight={selectedDepartureFlight} isShowBookingButton={false} />
                </div>
            )}
            {selectedReturnFlight && (
                <div className='mt-2'>
                    <h6 className='mb-2'>Return Flight:</h6>
                    <FlightTile flight={selectedReturnFlight} isShowBookingButton={false} />
                </div>
            )}
            <div className="text-center">
                <Button className="text-white" onClick={handleConfirmBooking}>
                    Confirm Booking
                </Button>
                <Button className="bg-gray-500 hover:bg-gray-600 text-white ml-4" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </div>
        </div>
    );
};

export default BookConfirm;
