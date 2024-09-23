const express = require("express");
const {
  createFlightReservation,
  fetchFlightByBookingNumber,
  fetchUserFlights,
} = require("../controller/flightReservation.controller");
const isAuth = require("../middlewares/isAuth");

const router = express.Router(); // Create a new router instance

// Route to fetch all flights reserved by the authenticated user
router.get("/fetchFlights", isAuth, fetchUserFlights);

// Route to fetch a specific flight reservation by its booking number
router.get("/fetchFlight/:bookingNumber", isAuth, fetchFlightByBookingNumber);

// Route to create a new flight reservation for the authenticated user
router.post("/createReservation", isAuth, createFlightReservation);

module.exports = router;
