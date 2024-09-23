import Proptypes from "prop-types"
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa"
import { format } from "date-fns";

const UserFlight = ({ flight }) => {
    // Format the schedule date and time
    const formattedDateTime = format(new Date(flight.scheduleDateTime), 'dd MMM yyyy hh:mm a');
    return (
        <div className={`relative bg-white w-full p-4 rounded-lg shadow-lg`}>
            <div className='p-5'>
                <div className='mb-4 text-start'>
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
                        <img src={`https://airlabs.co/img/airline/m/${flight.airlineIATA}.png`} alt={`${flight.prefixIATA} logo`} className='h-12 w-12' />
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
        </div>
    )
}


UserFlight.propTypes = {
    flight: Proptypes.object,
    onSelectFlight: Proptypes.func.isRequired,
    selected: Proptypes.bool,
    isShowBookingButton: Proptypes.bool
}

export default UserFlight