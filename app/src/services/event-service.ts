import { Event } from './../models/event';

const serverURL = 'http://localhost:3000';

//get all events
 const fetchAllEvents = async (): Promise<Event[]> => {
    const response = await fetch(`${serverURL}/event`,{
    method: 'GET'}
    );
    return await response.json();
};


//get event by id
 const fetchEventById = async (id: string): Promise<Event> => {
    const response = await fetch(`${serverURL}/event/${id}`,{
    method: 'GET'}
    );
    return await response.json();
};

//update event by id and return the updated event
const updateEvent = async (event: Event): Promise<Event> => {
    const response = await fetch(`${serverURL}/event/${event._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    });
    return await response.json();
};

const eventService = {
    fetchAllEvents,
    fetchEventById,
    updateEvent
};

export default eventService;