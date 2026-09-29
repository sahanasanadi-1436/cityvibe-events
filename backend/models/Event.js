const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    date: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    seats: {
      type: Number,
      required: true,
      min: 1
    },

    organizer: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", eventSchema);