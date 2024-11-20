import mongoose, { model } from "mongoose";

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "USD",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
});

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
