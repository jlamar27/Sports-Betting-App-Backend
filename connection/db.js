import 'dotenv/config';
import mongoose from "mongoose";

// get env variables
const DATABASE_URL = process.env.DATABASE_URL

// connect to mongoose
mongoose.connect(DATABASE_URL)

// Listen to connected
mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB");
})

// Listen to disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB!");
});

// Listen to error and log it 
mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
});