const { mongoose } = require("mongoose");

const flightReservationScehema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    bookingNumber: {
      type: String,
      required: true,
    },
    aircraftType: {
      type: Object,
      required: true,
    },
    arrivalLocation: {
      type: Object,
      required: true,
    },
    departureLocation: {
      type: Object,
      required: true,
    },
    flightDirection: {
      type: String,
      required: true,
    },
    flightNumber: {
      type: String,
      required: true,
    },
    flightName: {
      type: String,
      required: true,
    },
    scheduleDate: {
      type: Date,
      required: true,
    },
    scheduleDateTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const FlightReservation = mongoose.model(
  "FlightReservation",
  flightReservationScehema
);

module.exports = FlightReservation;
