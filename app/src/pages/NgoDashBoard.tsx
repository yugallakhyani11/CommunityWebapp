import { Create } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import CreateEventForm from "../components/CreateEventForm.js";
import { useState } from "react";
import EventList from "./EventInformationPage.js";

import { Link } from "react-router-dom";
import EventComponent from "../components/EventComponent.js";

export const NgoDashBoard = () => {
  const [showForm, setShowForm] = useState(false);

  const handleCreate = () => {
    setShowForm(true);
  };
  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div>

      <Typography variant="h4" component="div" gutterBottom>
        Our Events currently running
      </Typography>

      {/* <Grid container spacing={2} sx={{ border: 1 }}>
        {events.map((event) => (
          <EventComponent event={event} />
        ))}

      </Grid> */}
      
      <EventList />
      <Box
        sx={{
          position: "fixed",
          bottom: "150px", // Adjust distance from bottom
          right: "20px", // Adjust distance from right
          zIndex: 999, // Ensure the button is on top of other content
        }}
      >
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create an event
      </Button>
      </Box>
      {showForm && <CreateEventForm handleCancel={handleCancel} />}
    </div>
  );
};

export default NgoDashBoard;
