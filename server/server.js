const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const connectMongoDB = require("./lib/db");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 3000; // Set the port from environment variables or default to 3000

dotenv.config();

// Connect to MongoDB database
connectMongoDB();

const corsOptions = {
  origin: process.env.FRONTEND_SERVER || "http://localhost:5173",
  credentials: true,
};

// Enable CORS for all routes
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoute = require("./routes/user.route");
const flightReservationRoute = require("./routes/flightReservation.route");

app.use("/api/user", userRoute);
app.use("/api/reservation", flightReservationRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
