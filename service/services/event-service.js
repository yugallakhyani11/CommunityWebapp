import { log } from "console";
import Event from "../models/event.js";

/**
 * Creates a new event
 * @param {*} newEvent
 * @returns
 */
export const createEvent = async (newEvent) => {
  const event = new Event(newEvent);
  await event.save();
  return event;
};

/**
 * Returns all events
 * @returns
 */
export const getEvents = async () => {
  const events = await Event.find();
  return events;
};

/**
 * Get event by id
 * @param {*} id
 * @returns
 */
export const getEvent = async (id) => {
  const event = await Event.findById(id);
  return event;
};

/**
 * Updates an event based on id
 * @param {*} id
 * @param {*} updatedEvent
 * @returns
 */
export const updateEvent = async (id, updatedEvent) => {
  try {
  const event = await Event.findByIdAndUpdate(id, updatedEvent, { new: true });
  console.log('successfully updated event');
  return event;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Deletes an event by id
 * @param {*} id
 * @returns
 */
export const deleteEvent = async (id) => {
  const event = await Event.findByIdAndDelete(id);
  return event;
};

/**
 * Search for events based on the parameters
 * @param {*} params
 * @returns
 */
export const search = async (params = {}) => {
  const events = await Event.find(params).exec();
  return events;
};
