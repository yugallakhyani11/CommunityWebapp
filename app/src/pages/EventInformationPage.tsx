// EventList.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvents, selectEvents } from "../store/slices/event-slice";
import EventComponent from "../components/EventComponent";
import eventService from "../services/event-service";
import { Box, Grid } from "@mui/material";
import { AppState } from "../store";
import { Event } from "../models/event";
import { BaseUser } from "../models/user";
import { useNavigate } from "react-router-dom";
import { Person } from "../models/user";

const EventList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetchedEvents, setFetchedEvents] = React.useState<Event[]>([]);

  const events = useSelector(selectEvents);
  // const user = useSelector((state: AppState) => state.user);

  const user1 = localStorage.getItem("user");

  const user: BaseUser = user1 ? JSON.parse(user1) : null;
  let isNGO: Boolean = false;

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
  }, []);

  if (user && user.userType === "NGO") {
    isNGO = true;
  }

  useEffect(() => {
    try {
      console.log("Fetching events");
      eventService.fetchAllEvents().then((events) => {
        console.log("Fetched events:", events);

        dispatch(setEvents(events));
        setFetchedEvents(events);
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, []);

  return (
    <div>
      {/* <h2 style={{ zIndex: 2 }}>Events</h2> */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", overflow: "auto"}}>
      {/* <Grid container spacing={2} sx={{ border: 1 }}> */}
      <Box sx={{ width: "100%", display: "flex", flexWrap: "nowrap", overflowX: "auto" }}>
      <Grid container spacing={3} justifyContent="center" >
        {fetchedEvents.map((event) => {
          if (user !== null && isNGO && event.createdBy === user._id) {
            return <EventComponent key={event._id} event={event} />;
          }
          if (user !== null && !isNGO) {
            return <EventComponent key={event._id} event={event} />;
          }

          //  return   <EventComponent key={event._id} event={event} />
        })}
      </Grid>
      </Box>
      </Box>
    </div>
  );
};

export default EventList;
