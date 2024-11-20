import express from "express";
import * as donationController from "../controllers/donation-controller.js";

const router = express.Router();

router
  .route("/")
  .post(donationController.saveDonation)
  .get(donationController.getAllDonations);

router
  .route("/:id")
  .get(donationController.getDonationById)
  .put(donationController.updateDonation)
  .delete(donationController.deleteDonation);

router.route("/user/:userId").get(donationController.getDonationsByUserId);

router.route("/search").post(donationController.searchDonations);

export default router;
