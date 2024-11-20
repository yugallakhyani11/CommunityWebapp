import * as personService from "../services/person-service.js";
import { setResponse, setError } from "./response-handler.js";

// find all persons
export const getAllPersons = async (request, response) => {
  try {
    const persons = await personService.getAllPersons();
    setResponse(persons, response, 200);
  } catch (error) {
    setError(error, response);
  }
};

// find person by id
export const getPersonById = async (request, response) => {
  try {
    const id = request.params.id;
    const person = await personService.getPersonById(id);
    setResponse(person, response, 200);
  } catch (error) {
    setError(error, response);
  }
};

// search person by fields
export const searchPerson = async (request, response) => {
  try {
    const searchFields = request.body;
    const persons = await personService.searchPerson(searchFields);
    setResponse(persons, response, 200);
  } catch (error) {
    setError(error, response);
  }
};
