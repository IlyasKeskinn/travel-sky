import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';
import { useEffect } from 'react';
import { selectedDepartureFlightAtom, selectedReturnFlightAtom } from '@/atoms/selectedFlights';
import { flightFilterAtom } from '@/atoms/flightFilter';
import FlightTile from '@/components/FlightTile';

const BookConfirm = () => {
    const navigate = useNavigate();
    const selectedDepartureFlight = useRecoilValue(selectedDepartureFlightAtom);
    const selectedReturnFlight = useRecoilValue(selectedReturnFlightAtom);
    const resetDepartureFlight = useResetRecoilState(selectedDepartureFlightAtom);
    const resetReturnFlight = useResetRecoilState(selectedReturnFlightAtom);
    const resetFlightFilter = useResetRecoilState(flightFilterAtom);

    useEffect(() => {
        if (!selectedDepartureFlight) {
            navigate(ROUTES.HOME);
        }
    }, [selectedDepartureFlight, navigate]);

    const handleConfirmBooking = () => {
        console.log('Booking confirmed!', selectedDepartureFlight, selectedReturnFlight);
        // resetDepartureFlight();
        // resetReturnFlight();
        // resetFlightFilter();
        localStorage.removeItem("selectedDepartureFlight");
        localStorage.removeItem("selectedReturnFlight");
        navigate(ROUTES.HOME);
    };

    return (
        <div className="container mx-auto my-4">
            <h2 className="text-2xl font-bold text-center mb-4">Confirm Your Booking</h2>

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
