import * as ngoController from "../controllers/ngo-controller.js";
import express from "express";

const ngoRouter = express.Router();
// Endpoint for getting all organizations

ngoRouter.route("/").get(ngoController.getAllNgos);
// Endpoint for getting organization by id
ngoRouter.route("/:id").get(ngoController.getNgoById);
ngoRouter.route("/search").post(ngoController.searchNgo);

export default ngoRouter;
