import * as orgController from "../controllers/org-controller.js";
import express from "express";

const orgRouter = express.Router();
// Endpoint for getting all organizations

orgRouter.route("/").get(orgController.getAllOrgs);
// Endpoint for getting organization by id
orgRouter.route("/:id").get(orgController.getOrgById);

export default orgRouter;
