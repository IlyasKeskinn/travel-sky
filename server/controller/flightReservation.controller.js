const generateBookingNumber = require("../helpers/generateBookingNumber");
const FlightReservation = require("../models/flightReservation.model");
const User = require("../models/user.model");

// Function to create a flight reservation
const createFlightReservation = async (req, res) => {
  try {
    // Destructure flight details from the request body
    const {
      aircraftType,
      arrivalLocation,
      departureLocation,
      flightDirection,
      flightNumber,
      flightName,
      scheduleDate,
      scheduleDateTime,
    } = req.body;

    // Retrieve user ID and email from the request object
    const userId = req.user._id;
    const userEmail = req.user.email;

    // Check if user ID and email are available
    if (!userId || !userEmail) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a unique booking number
    const bookingNumber = generateBookingNumber();

    // Create a new flight reservation instance
    const newFlightReservation = new FlightReservation({
      User: userId,
      userEmail: userEmail,
      bookingNumber,
      aircraftType,
      arrivalLocation,
      departureLocation,
      flightDirection,
      flightNumber,
      flightName,
      scheduleDate,
      scheduleDateTime,
    });

    // Save the new flight reservation to the database
    await newFlightReservation.save();

    // Return the created flight reservation with a 201 status code
    return res.status(201).json(newFlightReservation);
  } catch (error) {
    // Return an error response if something goes wrong
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createFlightReservation };
