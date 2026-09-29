const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch events",
      error: error.message
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch event",
      error: error.message
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);

    const savedEvent = await event.save();

    res.status(201).json({
      message: "Event created successfully",
      event: savedEvent
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create event",
      error: error.message
    });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json({
      message: "Event updated successfully",
      event: updatedEvent
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update event",
      error: error.message
    });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent =
      await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json({
      message: "Event deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete event",
      error: error.message
    });
  }
});

module.exports = router;