const express = require("express");
const cors = require("cors");
const connectMongoDB = require("./lib/db");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 3000; // Set the port from environment variables or default to 3000  

dotenv.config();

// Connect to MongoDB database
connectMongoDB();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const authRouter = require("./routes/auth");
// app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
