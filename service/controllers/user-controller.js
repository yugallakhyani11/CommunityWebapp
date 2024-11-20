import * as userService from "../services/user-service.js";
import { setResponse, setError } from "./response-handler.js";

// login user
export const login = async (request, response) => {
  console.log("user-controller.js: login: request.body: ", request.body);
  try {
    const { email, password } = request.body;
    const user = await userService.authentication(email, password);
    if (user) {
      setResponse(user, response, 200);
    } else {
      setResponse({ message: "Invalid email or password" }, response, 404);
    }
  } catch (error) {
    setError(error, response);
  }
};

// register a new user
export const register = async (request, response) => {
  try {
    const newUser = { ...request.body };
    const user = await userService.register(newUser);
    setResponse(user, response, 200);
  } catch (error) {
    setError(error, response);
  }
};

// get all users
export const getAllUsers = async (request, response) => {
  try {
    const users = await userService.getAllUsers();
    setResponse(users, response, 200);
  } catch (error) {
    setError(error, response);
  }
};
