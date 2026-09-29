const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CityVibe API is running successfully"
  });
});

app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:");
    console.error(error.message);
  });