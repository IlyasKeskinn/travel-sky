import customSelectStyles from '@/styles/customSelect';
import debounce from 'lodash/debounce';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useCallback, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { validateLocationsForm } from '@/helpers/validateLocationsForm';
import { fetchLocationsByIATA } from '@/services/locationService';
import { useRecoilState } from 'recoil';
import { flightFilterAtom } from '@/atoms/flightFilter';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/config/routes';
import { PlaneIcon } from 'lucide-react';
import { format } from "date-fns";
import { API_ROUTES } from "@/config/api";
import 'react-datepicker/dist/react-datepicker.css';


// The main component of the booking form.
// Manages state for departure and arrival locations, dates, and trip type.

const FlightBookingForm = () => {
    const navigate = useNavigate();
    //The errors object contains the errors for each field.
    const [errors, setErrors] = useState({});

    const [locations, setLocations] = useState([]);  // Dynamically updated list of locations

    const [flightFilter, setFlightFilter] = useRecoilState(flightFilterAtom);


    // Debounced function for API call
    const debouncedFetchLocations = useCallback(
        debounce((iata) => {
            if (iata) fetchLocationsByIATA(iata, setLocations);
        }, 300),
        []
    );

    // Handle input changes for arrival location (fetch locations dynamically)
    const handleInputChange = (inputValue) => {
        debouncedFetchLocations(inputValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate user input
        const newErrors = validateLocationsForm(
            flightFilter.departureLocation,
            flightFilter.arrivalLocation,
            flightFilter.departureDate,
            flightFilter.returnDate,
            flightFilter.tripType
        );
        setErrors(newErrors);

        // If there are no errors, create the API URL
        if (Object.keys(newErrors).length === 0) {
            const formattedDepartureDate = format(new Date(flightFilter.departureDate), "yyyy-MM-dd");

            // If it's an arrival flight, use the departure location; otherwise, use the arrival location.
            const route = flightFilter.isArrivalFlight ? flightFilter.departureLocation.value : flightFilter.arrivalLocation.value;

            // If it's an arrival flight, set direction to "A" (Arrival); if not, set it to "D" (Departure).
            const direction = flightFilter.isArrivalFlight ? "A" : "D";


            // Create the API URL
            let fetchURL = `${API_ROUTES.FLIGHTS}?&flightDirection=${direction}&scheduleDate=${formattedDepartureDate}&route=${route}`;

            // If round trip, create a separate URL for the return flight
            if (flightFilter.tripType === 'round-trip') {
                const formattedReturnDate = format(new Date(flightFilter.returnDate), "yyyy-MM-dd");

                // If it's an arrival flight, the return leg is a departure flight, so set it to "D"; if not, set it to "A".
                const returnDirection = flightFilter.isArrivalFlight ? "D" : "A";
                
                const returnFetchURL = `${API_ROUTES.FLIGHTS}?flightDirection=${returnDirection}&scheduleDate=${formattedReturnDate}&route=${route}`;

                // Navigate to the results page
                navigate(ROUTES.FLIGHT_RESULT, { state: { fetchURL, returnFetchURL } });
            } else {

                // For one-way, navigate with a single URL
                navigate(ROUTES.FLIGHT_RESULT, { state: { fetchURL } });
            }
        }
    };

    //Handles the departure location change.
    const handleDepartureLocationChange = (selectedOption) => {
        setFlightFilter(prev => ({ ...prev, "departureLocation": selectedOption }));
        setErrors(prevErrors => ({ ...prevErrors, departureLocation: '' }));
    };
    //handles the arrival location change.
    const handleArrivalLocationChange = (selectedOption) => {
        setFlightFilter(prev => ({ ...prev, "arrivalLocation": selectedOption }));
        setErrors(prevErrors => ({ ...prevErrors, arrivalLocation: '' }));
    };
    //hables the departure date change.
    const handleDepartureDateChange = (date) => {
        setFlightFilter(prev => ({ ...prev, "departureDate": date }));
        setErrors(prevErrors => ({ ...prevErrors, departureDate: '' }));
    };
    //handles the return date change.
    const handleReturnDateChange = (date) => {
        setFlightFilter(prev => ({ ...prev, "returnDate": date }));
        setErrors(prevErrors => ({ ...prevErrors, returnDate: '' }));
    };
    // Function to swap departure and arrival locations
    const swapLocations = () => {
        const tempDeparture = flightFilter.departureLocation;
        setFlightFilter(prev => ({ ...prev, "departureLocation": flightFilter.arrivalLocation }));
        setFlightFilter(prev => ({ ...prev, "arrivalLocation": tempDeparture }));
        setFlightFilter(prev => ({ ...prev, "isArrivalFlight": !flightFilter.isArrivalFlight }));
    };

    // On click for one-way button
    const handleOneWayClick = () => {
        setFlightFilter(prev => ({ ...prev, "tripType": "one-way" }));
        setFlightFilter(prev => ({ ...prev, "returnDate": null }));
        setErrors(prevErrors => ({ ...prevErrors, returnDate: '' }));
    };

    // On click for round-trip button
    const handleRoundTripClick = () => {
        setFlightFilter(prev => ({ ...prev, "tripType": "round-trip" }));
    };
    return (
        <>
            <div id="tripTypeButtons" className="flex p-5 gap-4 items-center justify-center md:justify-start ">
                <div
                    onClick={handleOneWayClick}
                    className={`text-center w-32 px-4 py-2 rounded-full cursor-pointer ${flightFilter.tripType === 'one-way' ? 'bg-green-100 text-vegetation' : 'bg-gray-100 text-gray-600'} font-sans`}
                >
                    One-way
                </div>
                <div
                    onClick={handleRoundTripClick}
                    className={`text-center w-32 px-4 py-2 rounded-full cursor-pointer ${flightFilter.tripType === 'round-trip' ? 'bg-green-100 text-vegetation' : 'bg-gray-100 text-gray-600'} font-sans`}
                >
                    Round-trip
                </div>
            </div>
            <div>
                <div className='grid grid-cols-2 md:grid-cols-3 px-5  gap-5'>
                    <div className='flex items-center justify-between gap-2 relative'>
                        {/* Departure Location */}
                        <div className="relative flex-1">
                            <div>
                                <Select
                                    id="departureLocation"
                                    value={flightFilter.departureLocation}
                                    onChange={(option) => handleDepartureLocationChange(option)}
                                    onInputChange={handleInputChange}
                                    options={locations}
                                    placeholder="From"
                                    isSearchable
                                    styles={customSelectStyles}
                                    className="w-full"
                                    isDisabled={flightFilter.departureLocation?.value === 'AMS'}
                                    components={{
                                        DropdownIndicator: () => null, IndicatorSeparator: () => null, NoOptionsMessage: () => (
                                            <div style={{ padding: '10px', textAlign: 'center', color: '#999' }}>
                                                Search airport code
                                            </div>
                                        ),
                                    }}
                                />
                                <p className='text-red-500 h-8'>
                                    {errors.departureLocation}
                                </p>
                            </div>
                        </div>

                        {/* Exchange Button in the Center */}
                        <div className='absolute left-1/2 transform -translate-x-1/2 z-10'>
                            <button
                                type='button'
                                className='p-2 h-8 w-8 mb-6 rounded-full text-white bg-green-500 '
                                onClick={swapLocations}
                            >
                                <FaExchangeAlt />
                            </button>
                        </div>
                        {/* Arrival Location */}
                        <div className="relative flex-1">
                            <div className='w-full'>
                                <Select
                                    id="arrivalLocation"
                                    value={flightFilter.arrivalLocation}
                                    onChange={(option) => handleArrivalLocationChange(option)}
                                    onInputChange={handleInputChange}
                                    options={locations}
                                    placeholder="To"
                                    isSearchable
                                    className="w-full"
                                    styles={customSelectStyles}
                                    isDisabled={flightFilter.arrivalLocation?.value === 'AMS'}
                                    components={{
                                        DropdownIndicator: () => null, IndicatorSeparator: () => null,
                                        NoOptionsMessage: () => (
                                            <div style={{ padding: '10px', textAlign: 'center', color: '#999' }}>
                                                Search airport code
                                            </div>
                                        ),
                                    }}

                                />
                                <p className='text-red-500 h-8'>
                                    {errors.arrivalLocation}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                        <div className="relative w-full flex-1 items-center">
                            <div>
                                <DatePicker
                                    wrapperClassName='datePicker'
                                    selected={flightFilter.departureDate}
                                    onChange={handleDepartureDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Departure Date"
                                    className="w-[100%] h-16 border-2 z-100 border-gray-300 rounded-md p-5 shadow-md cursor-pointer hover:border-green-500 transition duration-150 ease-in-out"
                                />
                                <p className='text-red-500 h-8'>
                                    {errors.departureDate}
                                </p>
                            </div>
                        </div>
                        <div className={`relative flex-1 items-center`}>
                            <div>
                                <DatePicker
                                    wrapperClassName='datePicker'
                                    selected={flightFilter.returnDate}
                                    onChange={handleReturnDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Return Date"
                                    className={`w-full h-16 border-2 border-gray-300 rounded-md p-5 shadow-md transition duration-150 ease-in-out cursor-pointer ${flightFilter.tripType === 'one-way' ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-green-500'}`}
                                    minDate={flightFilter.departureDate}
                                    disabled={flightFilter.tripType === 'one-way'}
                                />
                                <p className='text-red-500 h-8'>
                                    {errors.returnDate}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <div
                            className='flex items-center justify-center gap-2  w-32 h-16 py-4 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200 cursor-pointer'
                            onClick={handleSubmit}
                        >
                            <span>Search</span>
                            <PlaneIcon />
                        </div>
                    </div>
                </div>
            </div></>
    );
};

export default FlightBookingForm;
