import { NGO } from "../models/user.js";

export const getAllNgos = async () => {
  const ngos = await NGO.find();
  return ngos;
};

export const getNgoById = async (id) => {
  const ngo = await NGO.findById(id);
  return ngo;
};

export const searchNgo = async (searchFields) => {
  const name = searchFields.name;
  const location = searchFields.location;
  const focus = searchFields.focus;
  const ngos = await NGO.find({ name: name, location: location, focus: focus });

  return ngos;
};
