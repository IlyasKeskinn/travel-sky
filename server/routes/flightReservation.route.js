const express = require("express");
const {
  createFlightReservation,
} = require("../controller/flightReservation.controller");
const isAuth = require("../middlewares/isAuth");

const router = express.Router(); // Create a new router instance

router.post("/createReservation", isAuth, createFlightReservation);

module.exports = router;
