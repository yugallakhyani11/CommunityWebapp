import { Person } from "../models/user.js";

// find all persons
export const getAllPersons = async () => {
  const persons = await Person.find();
  return persons;
};

// find person by id
export const getPersonById = async (id) => {
  const person = await Person.findById(id);
  return person;
};
