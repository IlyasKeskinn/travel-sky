import PropTypes from 'prop-types';
import NoFlightsFound from './NoFlightsFound';
import Loading from './Loading';
import FlightTile from './FlightTile';
import { flightFilterAtom } from '@/atoms/flightFilter';
import { useRecoilValue } from 'recoil';

// FlightList component for displaying a list of flights
const FlightList = ({ flights, isFetching, error, fetchNextPage, hasNextPage, ref, loadingMessage, selectedFlight, onSelectFlight, isReturnFlight }) => {
    // Get the current flight filter state from Recoil
    const flightFilter = useRecoilValue(flightFilterAtom);


    // Show loading indicator while fetching data
    if (isFetching) return <Loading />;

    // Show error message if there was an error during fetching
    if (error) return <p>Error: {error.message}</p>;

    // Show NoFlightsFound component if there are no flights available
    if (flights.length === 0) return <NoFlightsFound />;

    const departureLocation = isReturnFlight ? flightFilter.arrivalLocation : flightFilter.departureLocation;
    const arrivalLocation = isReturnFlight ? flightFilter.departureLocation : flightFilter.arrivalLocation;

    return (
        <>
            {flights.map((flight) => {

                const updatedFlight = {
                    ...flight,
                    departureLocation,
                    arrivalLocation
                };

                return (
                    <FlightTile
                        key={flight.id}
                        flight={updatedFlight}
                        onSelectFlight={onSelectFlight}
                        selected={selectedFlight?.id === flight.id}
                    />
                );
            })}
            {fetchNextPage && <p>{loadingMessage}</p>}
            {hasNextPage && <div ref={ref} />}
        </>
    );
}

export default FlightList


FlightList.propTypes = {
    flights: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetching: PropTypes.bool,
    error: PropTypes.object,
    fetchNextPage: PropTypes.func,
    hasNextPage: PropTypes.bool,
    ref: PropTypes.object,
    loadingMessage: PropTypes.string,
    selectedFlight: PropTypes.object,
    onSelectFlight: PropTypes.func,
    isReturnFlight: PropTypes.bool
};