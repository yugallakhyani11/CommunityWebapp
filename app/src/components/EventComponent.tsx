import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Modal,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Event } from "../models/event";
import { Person } from "../models/user";
import { updateEvent } from "../store/slices/event-slice";
import eventService from "../services/event-service";
import CloseIcon from "@mui/icons-material/Close";

const EventButtons = (props: any) => {
  const { event, handleOpen, handleVolunteer } = props;
  return (
    <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
      <Link
        to={`/events/${event._id}/donation/checkout`}
        style={{ textDecoration: "none" }}
      >
        <Button size="small" color="primary">
          Donate!!
        </Button>
      </Link>
      <Button size="small" color="primary" onClick={() => handleVolunteer()}>
        Volunteer
      </Button>
      <Button size="small" color="primary" onClick={handleOpen}>
        More Info
      </Button>
    </CardActions>
  );
};

const EventBar = (props: any) => {
  const { event, handleOpen } = props;
  return (
    <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          bgcolor: "secondary.main",
          padding: "8px",
          borderRadius: 1,
        }}
      >
        Donations:{" "}
        {event && `${event.currentDonation} / ${event.targetDonation}`}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ bgcolor: "secondary.main", padding: "8px", borderRadius: 1 }}
      >
        Volunteers:{" "}
        {event && `${event.currentVolunteers} / ${event.targetVolunteers}`}
      </Typography>
      <Button size="small" color="primary" onClick={handleOpen}>
        More Info
      </Button>
    </CardActions>
  );
};

interface EventCardProps {
  event: Event;
}

const EventComponent = (props: any) => {
  console.log("comes here", props);

  const { event } = props;
  const currentUser: Person = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  let currentEvent: Event = event;
  const [open, setOpen] = useState(false);
  const handleVolunteer = () => {
    console.log("Current event:", currentEvent);
    console.log(
      "EVENT:",
      event.volunteers.findIndex(
        (volunteer: Person) => volunteer === currentUser
      )
    );
    try {
      if (
        event.volunteers.findIndex(
          (volunteer: Person) => volunteer === currentUser
        ) == -1 &&
        event.currentVolunteers < event.targetVolunteers
      ) {
        currentEvent = {
          ...event,
          volunteers: [...event.volunteers, currentUser as Person],
        };
        currentEvent.currentVolunteers += 1;
        eventService.updateEvent(currentEvent).then((event) => {
          dispatch(updateEvent(event));
        });
        //dispatch(updateEvent(event));
      } else {
        alert("You are already volunteering for this event");
      }
    } catch (error) {
      console.error("Error volunteering for the event:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid item xs={12} sm={6} md={4} key={event._id}>
      <Card sx={{ maxWidth: 350, height: "100%", display: "flex", flexDirection: "column" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={event.imageUrl}
            alt={event.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        {currentUser &&
          (currentUser.userType === "NGO" ? (
            <EventBar event={event} handleOpen={handleOpen} />
          ) : (
            <EventButtons
              event={event}
              handleOpen={handleOpen}
              handleVolunteer={handleVolunteer}
            />
          ))}
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 800,
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            borderRadius: 4,
            p: 4,
          }}
        >
          <Card>
            <CardMedia
              component="img"
              height="500"
              image={event.imageUrl}
              alt={event.title}
            />
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {event.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {event.date.toString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Location: {event.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current Donation: {event.currentDonation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Target Donation: {event.targetDonation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current Volunteers: {event.currentVolunteers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Target Volunteers: {event.targetVolunteers}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Grid>
  );
};

export default EventComponent;
