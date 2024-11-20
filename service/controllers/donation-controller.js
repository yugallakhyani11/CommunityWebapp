import * as donationService from "../services/donation-service.js";
import { setResponse, setError } from "./response-handler.js";

export const saveDonation = async (request, response) => {
  try {
    const donation = request.body;
    const newDonation = await donationService.save(donation);
    setResponse(newDonation, response, 200);
  } catch (err) {
    setError(err, response);
  }
};

export const getAllDonations = async (request, response) => {
  try {
    const donations = await donationService.getAllDonations();
    setResponse(donations, response, 200);
  } catch (err) {
    setError(err, response);
  }
};

export const getDonationById = async (request, response) => {
  try {
    const id = request.params.id;
    const donation = await donationService.getDonationById(id);
    setResponse(donation, response, 200);
  } catch (err) {
    setError(err, response);
  }
};

export const updateDonation = async (request, response) => {
  try {
    const id = request.params.id;
    const donation = request.body;
    const updatedDonation = await donationService.updateDonation(id, donation);
    setResponse(updatedDonation, response, 200);
  } catch (err) {
    setError(err, response);
  }
};

export const deleteDonation = async (request, response) => {
  try {
    const id = request.params.id;
    const deletedDonation = await donationService.deleteDonation(id);
    setResponse(deletedDonation, response);
  } catch (err) {
    setError(err, response);
  }
};

export const getDonationsByUserId = async (request, response) => {
  try {
    const userId = request.params.userId;
    const donations = await donationService.getDonationsByUserId(userId);
    setResponse(donations, response);
  } catch (err) {
    setError(err, response);
  }
};

export const searchDonations = async (request, response) => {
  try {
    const searchParams = request.query;
    const donations = await donationService.searchDonations(searchParams);
    setResponse(donations, response);
  } catch (err) {
    setError(err, response);
  }
};
