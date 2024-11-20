import { Organization } from "../models/user.js";

// find all Organisations
export const getAllOrganisations = async () => {
  const organisations = await Organization.find();
  return organisations;
};

// find Organisation by id
export const getOrganisationById = async (id) => {
  const organisation = await Organization.findById(id);
  return organisation;
};

// search organisation by fields
export const searchOrganisation = async (searchFields) => {
  const organisations = await Organization.find(searchFields);
  return organisations;
};
