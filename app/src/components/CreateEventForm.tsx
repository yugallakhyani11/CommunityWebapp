import { Grid, TextField, TextareaAutosize, Button, Box } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store";

const CreateEventForm = (props: any) => {
  const loggedInUser = useSelector((state: AppState) => state.user);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keywords: [] as string[],
    date: new Date(),
    location: "",
    createdBy: loggedInUser,
    targetDonation: 0,
    targetVolunteers: 0,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1683121611041-b2a4cee2dad4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "keywords") {
      setFormData({
        ...formData,
        keywords: e.target.value.split(",").map((keyword) => keyword.trim()),
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3000/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        alert("Event created successfully");
        props.handleCancel();
      } else {
        alert("Failed to create event");
      }
    });
  };

  return (
    <Box
      boxShadow={3}
      maxWidth="400px"
      width="100%"
      p={3}
      position="absolute"
      top="50%"
      left="50%"
      zIndex={100}
      bgcolor="white"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              minRows={3}
              maxRows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              aria-label="maximum height"
              placeholder="Enter Description for the Event"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Keywords (separated by commas)"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Target Donation"
              name="targetDonation"
              value={formData.targetDonation}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Target Volunteers"
              name="targetVolunteers"
              value={formData.targetVolunteers}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Create Event
            </Button>
            <Button
              sx={{ marginLeft: 4 }}
              variant="contained"
              color="secondary"
              onClick={props.handleCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateEventForm;
