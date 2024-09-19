import customSelectStyles from '@/styles/customSelect';
import debounce from 'lodash/debounce';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useCallback, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { validateLocationsForm } from '@/helpers/validateLocationsForm';
import { fetchLocationsByIATA } from '@/services/locationService';
import 'react-datepicker/dist/react-datepicker.css';


// The main component of the booking form.
// Handles the state of the departure and arrival locations, departure and return dates, and the trip type.

const FlightBookingForm = () => {
    //The trip type can be either 'one-way' or 'round-trip'.
    const [tripType, setTripType] = useState('round-trip');
    //The departure location is the location from which the flight departs.
    const [departureLocation, setDepartureLocation] = useState({ value: 'AMS', label: 'Amsterdam, The Netherlands' });
    //The arrival location is the location to which the flight arrives.
    const [arrivalLocation, setArrivalLocation] = useState(null);
    // The departure date is the date on which the flight departs.
    const [departureDate, setDepartureDate] = useState(null);
    // The return date is the date on which the flight returns./
    const [returnDate, setReturnDate] = useState(null);

    //The errors object contains the errors for each field.
    const [errors, setErrors] = useState({});

    const [locations, setLocations] = useState([]);  // Dynamically updated list of locations


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

    // Handles the form submission.
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateLocationsForm(departureLocation, arrivalLocation, departureDate, returnDate, tripType);
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            console.log({ departureLocation, arrivalLocation, departureDate, returnDate });
        }
    };

    //Handles the departure location change.
    const handleDepartureLocationChange = (selectedOption) => {
        setDepartureLocation(selectedOption);
        setErrors(prevErrors => ({ ...prevErrors, departureLocation: '' }));
    };

    //handles the arrival location change.
    const handleArrivalLocationChange = (selectedOption) => {
        setArrivalLocation(selectedOption);
        setErrors(prevErrors => ({ ...prevErrors, arrivalLocation: '' }));
    };

    //hables the departure date change.
    const handleDepartureDateChange = (date) => {
        setDepartureDate(date);
        setErrors(prevErrors => ({ ...prevErrors, departureDate: '' }));
    };

    //handles the return date change.
    const handleReturnDateChange = (date) => {
        setReturnDate(date);
        setErrors(prevErrors => ({ ...prevErrors, returnDate: '' }));
    };

    // Swap departure and arrival locations
    const swapLocations = () => {
        const tempDeparture = departureLocation;
        setDepartureLocation(arrivalLocation);
        setArrivalLocation(tempDeparture);
    };

    //   Handles the one-way button click.
    const handleOneWayClick = () => {
        setTripType('one-way');
        setReturnDate(null);
        setErrors(prevErrors => ({ ...prevErrors, returnDate: '' }));
    };

    //handles the round-trip button click.
    const handleRoundTripClick = () => {
        setTripType('round-trip');
    };

    return (
        <div className="flex">
            <div className="h-96 w-full -mt-32 md:pl-24 md:pr-24 pr-8 pl-8 z-10">
                <div className="bg-white shadow-lg rounded-md min-h-[300px] py-4">
                    <div id="tripTypeButtons" className="flex p-5 gap-4 items-center">
                        <div
                            onClick={handleOneWayClick}
                            className={`text-center w-32 px-4 py-2 rounded-full cursor-pointer ${tripType === 'one-way' ? 'bg-green-100 text-vegetation' : 'bg-gray-100 text-gray-600'} font-sans`}
                        >
                            One-way
                        </div>
                        <div
                            onClick={handleRoundTripClick}
                            className={`text-center w-32 px-4 py-2 rounded-full cursor-pointer ${tripType === 'round-trip' ? 'bg-green-100 text-vegetation' : 'bg-gray-100 text-gray-600'} font-sans`}
                        >
                            Round-trip
                        </div>
                    </div>
                    <div className="form-Container">
                        <form onSubmit={handleSubmit} className="px-5" >
                            <div className='md:flex items-center justify-between gap-2'>
                                {/* Departure Location */}
                                <div className="relative w-full flex-1">
                                    <div>
                                        <Select
                                            id="departureLocation"
                                            value={departureLocation}
                                            onChange={(option) => handleDepartureLocationChange(option)}
                                            onInputChange={handleInputChange}
                                            options={locations}
                                            placeholder="Departure Location"
                                            isSearchable
                                            styles={customSelectStyles}
                                            className="w-full"
                                            isDisabled={departureLocation?.value === 'AMS'}
                                        />
                                        <p className='text-red-500 h-8'>
                                            {errors.departureLocation}
                                        </p>
                                    </div>
                                </div>
                                {/* Exchange Button in the Center */}
                                <div className='md:flex hidden md:flex-none flex-1 '>
                                    <button
                                        type='button'
                                        className='p-2 h-8 w-8 mb-6 rounded-full text-white bg-green-500 '
                                        onClick={swapLocations}
                                    >
                                        <FaExchangeAlt />
                                    </button>
                                </div>
                                {/* Arrival Location */}
                                <div className="relative w-full flex-1">
                                    <div>
                                        <Select
                                            id="arrivalLocation"
                                            value={arrivalLocation}
                                            onChange={(option) => handleArrivalLocationChange(option)}
                                            onInputChange={handleInputChange}
                                            options={locations}
                                            placeholder="Arrival Location"
                                            isSearchable
                                            className="w-full"
                                            styles={customSelectStyles}
                                            isDisabled={arrivalLocation?.value === 'AMS'}
                                        />
                                        <p className='text-red-500 h-8'>
                                            {errors.arrivalLocation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='md:flex items-center justify-between gap-2'>
                                <div className="relative w-full flex-1 items-center">
                                    <div>
                                        <DatePicker
                                            wrapperClassName='datePicker'
                                            selected={departureDate}
                                            onChange={handleDepartureDateChange}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Departure Date"
                                            className="w-[100%] h-16 border-2 border-gray-300 rounded-md p-5 shadow-md cursor-pointer hover:border-green-500 transition duration-150 ease-in-out"
                                        />
                                        <p className='text-red-500 h-8'>
                                            {errors.departureDate}
                                        </p>
                                    </div>
                                </div>
                                <div className='h-8 w-8 hidden md:block'></div>
                                <div className={`relative flex-1 items-center`}>
                                    <div>
                                        <DatePicker
                                            wrapperClassName='datePicker'
                                            selected={returnDate}
                                            onChange={handleReturnDateChange}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Return Date"
                                            className={`w-full h-16 border-2 border-gray-300 rounded-md p-5 shadow-md transition duration-150 ease-in-out cursor-pointer ${tripType === 'one-way' ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-green-500'}`}
                                            minDate={departureDate}
                                            disabled={tripType === 'one-way'}
                                        />
                                        <p className='text-red-500 h-8'>
                                            {errors.returnDate}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className='w-full py-4 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200'
                                >
                                    Search Flights
                                </button>
                            </div>
                        </form >
                    </div>
                </div>
            </div >
        </div >
    );
};

export default FlightBookingForm;
