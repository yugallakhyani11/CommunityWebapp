import express from "express";
import * as eventController from "../controllers/event-controller.js";

const router = express.Router();

router
  .route("/")
  .post(eventController.createEvent)
  .get(eventController.getEvents);

router
  .route("/:id")
  .get(eventController.getEvent)
  .put(eventController.updateEvent)
  .delete(eventController.deleteEvent);

export default router;
