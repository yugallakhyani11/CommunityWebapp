import * as orgService from "../services/org-service.js";
import { setResponse, setError } from "./response-handler.js";

// find all organizations
export const getAllOrgs = async (request, response) => {
  try {
    const orgs = await orgService.getAllOrgs();
    setResponse(orgs, response, 200);
  } catch (error) {
    setError(error, response);
  }
};

// find organization by id
export const getOrgById = async (request, response) => {
  try {
    const id = request.params.id;
    const org = await orgService.getOrgById(id);
    setResponse(org, response, 200);
  } catch (error) {
    setError(error, response);
  }
};
