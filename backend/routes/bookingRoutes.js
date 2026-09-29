const express = require("express");

const Booking = require("../models/Booking");
const Event = require("../models/Event");

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("eventId")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      eventId,
      name,
      email,
      phone,
      tickets
    } = req.body;

    if (
      !eventId ||
      !name ||
      !email ||
      !phone ||
      !tickets
    ) {
      return res.status(400).json({
        message: "All booking fields are required"
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    const ticketCount = Number(tickets);

    if (ticketCount > event.seats) {
      return res.status(400).json({
        message: "Not enough seats available"
      });
    }

    const referenceId =
      "CV" +
      Date.now().toString().slice(-8);

    const total =
      ticketCount * Number(event.price);

    const booking = new Booking({
      referenceId,
      eventId,
      eventName: event.title,
      name,
      email,
      phone,
      tickets: ticketCount,
      total
    });

    const savedBooking = await booking.save();

    event.seats -= ticketCount;

    await event.save();

    res.status(201).json({
      message: "Booking successful",
      booking: savedBooking
    });
  } catch (error) {
    res.status(500).json({
      message: "Booking failed",
      error: error.message
    });
  }
});

module.exports = router;