import * as personController from "../controllers/person-controller.js";
import express from "express";

const personRouter = express.Router();

// Endpoint for getting all persons
personRouter.route("/").get(personController.getAllPersons);

personRouter.route("/:id").get(personController.getPersonById);

personRouter.route("/search").post(personController.searchPerson);

export default personRouter;
