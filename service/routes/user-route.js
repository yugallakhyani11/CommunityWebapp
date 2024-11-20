import express from "express";
import * as userController from "../controllers/user-controller.js";

const UserRouter = express.Router();

// Endpoint for user login
UserRouter.route("/login").post(userController.login);

// Endpoint for user registration
UserRouter.route("/register").post(userController.register);

UserRouter.route("/").get(userController.getAllUsers);

export default UserRouter;
