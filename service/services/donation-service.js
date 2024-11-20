import Donation from "../models/donation.js";

export const save = async (donation) => {
  const newDonation = new Donation(donation);
  return await newDonation.save();
};

export const getAllDonations = async () => {
  return await Donation.find();
};

export const getDonationById = async (id) => {
  return await Donation.findById(id);
};

export const updateDonation = async (id, donation) => {
  return await Donation.findByIdAndUpdate(id, donation, { new: true });
};

export const deleteDonation = async (id) => {
  return await Donation.findByIdAndDelete(id);
};

export const getDonationsByUserId = async (userId) => {
  return await Donation.find({ createdBy: userId });
};

export const searchDonations = async (searchParams = {}) => {
  const { userId, amount, date } = searchParams;
  const query = {};
  if (userId) query.userId = userId;
  if (amount) query.amount = amount;
  if (date) query.date = { $gte: date };
  return await Donation.find(query);
};
