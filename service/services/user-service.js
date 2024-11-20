import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

export const authentication = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    return user;
  } else {
    return null;
  }
};

export const register = async (newUser) => {
  const user = new User(newUser);
  await user.save();
  return user;
};

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};
