import * as ngoService from "../services/ngo-service.js";
import { setResponse, setError } from "./response-handler.js";

// find all NGOs
export const getAllNgos = async (request, response) => {
  try {
    const ngos = await ngoService.getAllNgos();
    setResponse(ngos, response, 200);
  } catch (error) {
    setError(error, response);
  }
};

// find NGO by id
export const getNgoById = async (request, response) => {
  try {
    const id = request.params.id;
    const ngo = await ngoService.getNgoById(id);
    setResponse(ngo, response, 200);
  } catch (error) {
    setError(error, response);
  }
};

// search NGO
export const searchNgo = async (request, response) => {
  try {
    const searchFields = request.body;
    const ngos = await ngoService.searchNgo(searchFields);
    setResponse(ngos, response, 200);
  } catch (error) {
    setError(error, response);
  }
};
