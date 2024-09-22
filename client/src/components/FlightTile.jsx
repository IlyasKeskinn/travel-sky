import Proptypes from "prop-types"
import { FaPlane, FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa"
import { formatInTimeZone } from 'date-fns-tz';

const FlightTile = ({ flight, onSelectFlight, selected, isShowBookingButton = true }) => {
    // Format the schedule date and time
    const formattedDateTime = formatInTimeZone(flight.scheduleDateTime, "Asia/Kolkata", "dd MMM yyyy hh:mm a");




    return (
        <div className={`relative bg-white w-full p-4 mb-4 rounded-lg shadow-lg border-2 transition-colors duration-150 ${selected ? 'border-green-600' : 'hover:border-green-300'}`}
            onClick={() => onSelectFlight(flight)}
        >



            <div className='p-5'>
                <div className='mb-4'>
                    <h4 className='text-lg font-semibold'>{flight.departureLocation.label} - {flight.arrivalLocation.label}</h4>
                    <h5>Time: {formattedDateTime}</h5>
                    <h5>Flight Name : {flight.flightName}</h5>
                </div>
                <div className='grid md:grid-cols-5 grid-cols-3 gap-4'>
                    <div className='flex gap-1 flex-col justify-center items-center'>
                        <div className='flex items-center gap-2 text-gray-500'>
                            <FaPlaneDeparture />
                            <span>Departure</span>
                        </div>
                        <div>
                            <span>Airport : {flight.departureLocation.value}</span>
                        </div>
                    </div>
                    <div className="md:flex hidden items-center ">
                        <div className='w-full h-[2px] bg-gray-500'></div>
                    </div>
                    <div className='flex flex-col gap-2 items-center justify-center'>
                        <FaPlane className="text-gray-500" />
                        <img src={`https://airlabs.co/img/airline/m/${flight.prefixIATA}.png`} alt={`${flight.prefixIATA} logo`} className='h-12 w-12' />
                    </div>
                    <div className="md:flex hidden items-center">
                        <div className='w-full h-[2px] bg-gray-500'></div>
                    </div>
                    <div className='flex gap-1 flex-col justify-center items-center'>
                        <div className='flex items-center gap-2 text-gray-500'>
                            <FaPlaneArrival />
                            <span>Arrival</span>
                        </div>
                        <div>
                            <span>Airport : {flight.arrivalLocation.value}</span>
                        </div>
                    </div>
                </div>
            </div>

            {isShowBookingButton && (
                <div className='absolute bg-green-500 bottom-0 right-0   md:w-16 sm:w-10   h-full rounded-r-md flex items-center justify-center cursor-pointer text-white font-semibold shadow-md hover:bg-green-600 transition-colors duration-200 '>
                    <p className='text-white -rotate-90'>
                        Book
                    </p>
                </div>
            )}

        </div>
    )
}


FlightTile.propTypes = {
    flight: Proptypes.object,
    onSelectFlight: Proptypes.func.isRequired,
    selected: Proptypes.bool,
    isShowBookingButton: Proptypes.bool
}

export default FlightTile