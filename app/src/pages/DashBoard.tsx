import { Button, Typography } from "@mui/material";

import EventList from "./EventInformationPage";

export const DashBoard = () => {
  return (
    <div>

      <Typography variant="h4" component="div" gutterBottom>
        Featured Events near you
      </Typography>
      <EventList />
    </div>
  );
};
