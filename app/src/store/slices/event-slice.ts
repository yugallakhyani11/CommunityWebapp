import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../../models/event';
import {AppState} from '../index';

interface EventsState {
  events: Event[];
  selectedEvent: Event | null;
}

const initialState: EventsState = {
  events: [],
  selectedEvent: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<Event[]>) {
      state.events = action.payload;
    },
    selectEvent(state, action: PayloadAction<Event | null>) {
      state.selectedEvent = action.payload;
    },
    updateEvent(state, action: PayloadAction<Event>) {
      const event = action.payload;
      const index = state.events.findIndex((e) => e._id === event._id);
      if (index !== -1) {
        state.events[index] = event;
      }
    },
    logoutEvent(state) {
      state = initialState;
    },
  },
});

// Selectors
export const selectEvents = (state: AppState) => state.event.events;
export const selectSelectedEvent = (state: AppState) => state.event.selectedEvent;

export const { setEvents, selectEvent, updateEvent , logoutEvent} = eventsSlice.actions;
export default eventsSlice.reducer;