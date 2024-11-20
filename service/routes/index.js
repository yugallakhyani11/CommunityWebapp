import express from "express";
import FoodRouter from "./food-post-route.js";
import BlogRouter from "./blogpost-route.js";
import donationRouter from "./donation-route.js";
import UserRouter from "./user-route.js";
import PersonRouter from "./person-route.js";
import orgRouter from "./org-route.js";
import ngoRouter from "./ngo-route.js";
import eventRouter from "./event-routes.js";

const initializeRoutes = (app) => {
  // Registering food post routes directly on the app instance
  app.use("/foodPosts", FoodRouter);
  app.use("/blogposts", BlogRouter);
  app.use("/donations", donationRouter);
  app.use("/users", UserRouter);
  app.use("/persons", PersonRouter);
  app.use("/org", orgRouter);
  app.use("/ngo", ngoRouter);
  app.use("/event", eventRouter);
};

export default initializeRoutes;
