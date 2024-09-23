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
      prefixIATA,
      terminal,
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
      airlineIATA: prefixIATA,
      ...(terminal && { terminal }), // Only include terminal if it exists
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

// Function to fetch all flights reserved by the authenticated user
const fetchUserFlights = async (req, res) => {
  try {
    // Retrieve the user ID from the request object
    const userId = req.user._id;

    // Check if user ID is present
    if (!userId) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch all flight reservations for the specified user ID
    const flights = await FlightReservation.find({ User: userId });

    // Return the list of flights with a 200 status code
    return res.status(200).json(flights);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Function to fetch a flight reservation by its booking number
const fetchFlightByBookingNumber = async (req, res) => {
  try {
    // Retrieve the booking number from the request parameters
    const bookingNumber = req.params.bookingNumber;

    // Find the flight reservation that matches the booking number
    const flight = await FlightReservation.findOne({ bookingNumber });

    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }
    // Return the flight reservation with a 200 status code
    return res.status(200).json(flight);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createFlightReservation,
  fetchUserFlights,
  fetchFlightByBookingNumber,
};
