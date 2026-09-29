const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },

    eventName: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true
    },

    tickets: {
      type: Number,
      required: true,
      min: 1
    },

    total: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", bookingSchema);