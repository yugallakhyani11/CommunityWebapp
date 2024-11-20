import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  keywords: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ngo",
    required: true,
  },
  volunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  ],
  donations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: false,
    },
  ],
  currentDonation: {
    type: Number,
    required: true,
    default: 0,
  },
  targetDonation: {
    type: Number,
    required: true,
    default: 0,
  },
  currentVolunteers: {
    type: Number,
    required: true,
    default: 0,
  },
  targetVolunteers: {
    type: Number,
    required: true,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
