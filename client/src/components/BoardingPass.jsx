import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import PropTypes from 'prop-types';
import { format } from "date-fns";


const BoardingPass = ({ flight }) => {
    const formattedDateTime = format(new Date(flight.createdAt), 'dd MMM yyyy hh:mm a');

    return (
        <div className="w-full mx-auto my-5 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 relative">
            {/* Upper Part */}
            <div className="p-4 flex justify-between items-center bg-gradient-to-r from-green-600 to-green-400 text-white">
                <div className="flex items-center gap-4">
                    <img
                        src={`https://airlabs.co/img/airline/m/${flight.airlineIATA}.png`}
                        alt={`${flight.airlineIATA} logo`}
                        className="h-16 w-16 object-cover rounded-full" // Adjusted size for better visibility
                    />
                    <div>
                        <h2 className="text-xl font-bold text-yellow-500">{flight.bookingNumber}</h2>
                        <p className="text-sm">{flight.flightName}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-lg">Boarding Pass</p>
                </div>
            </div>

            {/* Flight Info */}
            <div className="p-5 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                    <FaPlaneDeparture className="text-5xl mb-2" />
                    <h3 className="text-sm font-semibold">Departure</h3>
                    <p className="text-lg font-bold ">{flight.departureLocation.label} ({flight.departureLocation.value})</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div>
                        <h3 className="text-sm font-semibold">Class</h3>
                        <p className="text-lg font-bold">Economy</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold">Reservation Date</h3>
                        <p className="text-lg font-bold">{formattedDateTime}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <FaPlaneArrival className="text-5xl mb-2" />
                    <h3 className="text-sm font-semibold">Arrival</h3>
                    <p className="text-lg font-bold text-center">{flight.arrivalLocation.label} ({flight.arrivalLocation.value})</p>
                </div>
            </div>

            {/* Dashed Separator */}
            <div className="relative">
                <div className="border-t border-dashed border-gray-300 my-3"></div>
                <div className="absolute top-0 left-0 w-4 h-4 bg-white rounded-full transform -translate-y-2"></div>
                <div className="absolute top-0 right-0 w-4 h-4 bg-white rounded-full transform -translate-y-2"></div>
            </div>

            {/* Boarding Details */}
            <div className="p-5 grid grid-cols-2 gap-5">
                <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-500">Terminal</h3>
                    <p className="text-lg font-bold">{flight.terminal}</p>
                </div>
                <div className="text-center">
                    <h3 className="text-sm font-semibold">Passenger</h3>
                    <p className="text-lg font-bold">{flight.User.name}</p>
                </div>
            </div>

            {/* Dashed Separator */}
            <div className="relative">
                <div className="border-t border-dashed border-gray-300 my-3"></div>
                <div className="absolute top-0 left-0 w-4 h-4 bg-white rounded-full transform -translate-y-2"></div>
                <div className="absolute top-0 right-0 w-4 h-4 bg-white rounded-full transform -translate-y-2"></div>
            </div>
        </div>
    )
}


BoardingPass.propTypes = {
    flight: PropTypes.object.isRequired,
};
export default BoardingPass