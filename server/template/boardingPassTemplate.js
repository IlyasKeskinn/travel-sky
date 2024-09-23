const { format } = require("date-fns");

module.exports = boardingPassTemplate = (flight,user) => {
    const formattedReservationDate = format(new Date(flight.createdAt), 'dd MMM yyyy hh:mm a');
    const formattedScheduleDate = format(new Date(flight.scheduleDateTime), 'dd MMM yyyy hh:mm a');

    return `
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border: 1px solid #ccc; border-radius: 8px; overflow: hidden;">
            <div style="padding: 16px; display: flex; justify-content: space-between; align-items: center; background: linear-gradient(to right, #38a169, #48bb78); color: white;">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <img src="https://airlabs.co/img/airline/m/${flight.airlineIATA}.png" alt="${flight.airlineIATA} logo" style="height: 64px; width: 64px; border-radius: 50%;" />
                    <div>
                        <h2 style="font-size: 24px; font-weight: bold; color: #ecc94b;">${flight.bookingNumber}</h2>
                        <p style="font-size: 14px;">${flight.flightName}</p>
                    </div>
                </div>
            </div>
            <div style="padding: 16px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                <div style="text-align: center;">
                    <h3 style="font-size: 14px; font-weight: bold;">Departure</h3>
                    <p style="font-size: 18px; font-weight: bold;">${flight.departureLocation.label} (${flight.departureLocation.value})</p>
                </div>
                <div style="text-align: center;">
                    <h3 style="font-size: 14px; font-weight: bold;">Class</h3>
                    <p style="font-size: 18px; font-weight: bold;">Economy</p>
                    <h3 style="font-size: 14px; font-weight: bold;">Reservation Date</h3>
                    <p style="font-size: 18px; font-weight: bold;">${formattedReservationDate}</p>
                </div>
                <div style="text-align: center;">
                    <h3 style="font-size: 14px; font-weight: bold;">Arrival</h3>
                    <p style="font-size: 18px; font-weight: bold;">${flight.arrivalLocation.label} (${flight.arrivalLocation.value})</p>
                </div>
            </div>
            <div style="border-top: 1px dashed #ccc; margin: 16px 0;"></div>
            <div style="padding: 16px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                <div style="text-align: center;">
                    <h3 style="font-size: 14px; font-weight: bold; color: gray;">Terminal</h3>
                    <p style="font-size: 18px; font-weight: bold;">${flight.terminal}</p>
                </div>
                <div style="text-align: center;">
                    <h3 style="font-size: 14px; font-weight: bold;">Passenger</h3>
                    <p style="font-size: 18px; font-weight: bold;">${user.name}</p>
                </div>
            </div>
        </div>
    `;
};
