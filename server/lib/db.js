const { mongoose } = require("mongoose");

const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const MONGO_URI = process.env.MONGO_URI;

const connectMongoDB = async () => {
  // Throw an error if MONGO_URI is not defined
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }
  // Connect to MongoDB
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectMongoDB;
