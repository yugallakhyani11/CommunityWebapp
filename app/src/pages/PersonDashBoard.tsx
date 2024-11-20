import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import  EventComponent  from "../components/EventComponent.js";
import EventList from "./EventInformationPage";

const event1 = {
  id: 1,
  title: "Help Farmers",
  description:
    "Help farmers in need and learn the necessary skills required to grow vegetables as well",
  image:
    "https://images.unsplash.com/photo-1535090467336-9501f96eef89?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const event2 = {
  id: 2,
  title: "Event 2",
  description:
    "Description of 2nd event Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, aperiam?",
  image:
    "https://plus.unsplash.com/premium_photo-1682092618317-9b50d60e6e0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const events = [event1, event2];

export const PersonDashBoard = () => {
  return (
    <div>
      <h1>DashBoard!!!</h1>

      <Typography variant="h4" component="div" gutterBottom>
        Featured Events near you
      </Typography>
     
      <EventList/>

    </div>
  );
};
