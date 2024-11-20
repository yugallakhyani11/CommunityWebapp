import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const baseOptions = {
  discriminatorKey: "userType", // our discriminator key, could be anything
  collection: "users", // the name of our collection
};

// Base User schema
const userSchema = new Schema(
  {
    username: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: false },
  },
  baseOptions,
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// Discriminator for Person schema
const personSchema = new Schema({
  age: { type: Number, required: true, default: 18 },
  interests: { type: [String], required: false },
  bio: { type: String, required: false },
  totalDonation: { type: Number, required: false },
  totalVolunteerHours: { type: Number, required: true, default: 0 },
});

// Discriminator for Organization schema
const organizationSchema = new Schema({
  orgName: { type: String, required: true },
  rating: { type: Number, required: true },
  organizationType: {
    type: String,
    required: true,
    default: "Restaurant",
    enum: ["Restaurant", "Community Kitchen", "School", "Corporation"],
  },
});

const NGOSchema = new Schema({
  ngoName: { type: String, required: true },
  focus: { type: String, required: false },
  foundingYear: { type: Number, required: false },
});

// Registering discriminators
const User = mongoose.model("User", userSchema);
const Person = User.discriminator("Person", personSchema);
const Organization = User.discriminator("Organization", organizationSchema);
const NGO = User.discriminator("NGO", NGOSchema);

export { User, Person, Organization, NGO };
