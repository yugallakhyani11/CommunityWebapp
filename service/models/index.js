// models/index.js
import FoodPost from "./food-post.js";
import BlogPost from "./blogpost.js";
import Comment from "./comment.js";
import Donation from "./donation.js";
import { NGO, Organization, Person, User } from "./user.js";
import Event from "./event.js";

export default {
  BlogPost,
  Comment,
  FoodPost,
  Donation,
  User,
  Person,
  Organization,
  NGO,
  Event,
};
