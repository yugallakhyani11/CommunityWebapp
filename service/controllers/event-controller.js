import * as eventService from "../services/event-service.js";
import { setResponse, setError } from "./response-handler.js";

export const createEvent = async (request, response) => {
  try {
    console.log("hello");
    const newEvent = { ...request.body };
    const event = await eventService.createEvent(newEvent);
    setResponse(event, response, 200);
  } catch (error) {
    setError(error, response);
  }
};

export const getEvents = async (request, response) => {
  try {
    const events = await eventService.getEvents();
    setResponse(events, response, 200);
  } catch (error) {
    setError(error, response);
  }
};

export const getEvent = async (request, response) => {
  try {
    const id = request.params.id;
    const event = await eventService.getEvent(id);
    setResponse(event, response, 200);
  } catch (error) {
    setError(error, response);
  }
};

export const updateEvent = async (request, response) => {
  try {
    const id = request.params.id;
    const updatedEvent = { ...request.body };
    const event = await eventService.updateEvent(id, updatedEvent);
    setResponse(event, response, 200);
  } catch (error) {
    setError(error, response);
  }
};

export const deleteEvent = async (request, response) => {
  try {
    const id = request.params.id;
    const event = await eventService.deleteEvent(id);
    setResponse(event, response, 200);
  } catch (error) {
    setError(error, response);
  }
};

export const search = async (request, response) => {
  try {
    const params = { ...request.query };
    const events = await eventService.search(params);
    setResponse(events, response, 200);
  } catch (err) {
    setError(err, response);
  }
};

// export const post = async (request, response) => {
//     try {
//         const event = {...request.body};
//         const newEvent = await eventsService.save(event);
//         setResponse(newEvent, response, 201);
//     } catch (err) {
//         console.log(err);
//         setError(err, response);
//     }
// }

// export const get = async (request, response) => {
//     try {
//         const id = request.params.id;
//         const event = await eventsService.findEventById(id);
//         setResponse(event, response, 200);
//     } catch (err) {
//         setError(err, response);
//     }
// }

// export const put = async (request, response) => {
//     try {
//         const id = request.params.id;
//         const updatedEvent = {...request.body};
//         const event = await eventsService.updateEvent(id, updatedEvent);
//         setResponse(event, response, 200);
//     } catch (err) {
//         setError(err, response);
//     }
// }

// export const remove = async (request, response) => {
//     try {
//         const id = request.params.id;
//         const event = await eventsService.deleteEvent(id);
//         setResponse(event, response, 200);
//     } catch (err) {
//         setError(err, response);
//     }
// }
