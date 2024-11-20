import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { updateFoodPost, deleteFoodPostById } from '../services/food-post-service';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import  { useRef } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { useTranslation } from 'react-i18next';


// Defined props interface for FoodPostCard component
interface FoodPostCardProps {
  _id: string;
  name: string;
  numOfPeople: number;
  shelfLife: number;
  location: string;
  image: string;
  description: string;
  email: string;
  status: boolean;
  timestamp: string;
  onDelete: () => void; 
}

// Define props interface for ExpandMore button
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// Styled component for ExpandMore button
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// Functional component for FoodPostCard
const FoodPostCard: React.FC<FoodPostCardProps> = ({
  _id,
  name,
  numOfPeople,
  shelfLife,
  location,
  image,
  email,
  timestamp,
  status,
  description,
  onDelete, 
}) => {

  const { t } = useTranslation(); // Initialize the translation hook
  const [expanded, setExpanded] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name,
    numOfPeople,
    shelfLife,
    location,
    image,
    email,
    description,
  });
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  // Function to handle expand/collapse of card
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

   // Function to handle input change in form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      // email: prevData.email,
    }));
  };

   // Function to handle saving changes
  const handleSaveChanges = async () => {
    try {
      const updatedPost = await updateFoodPost(_id, formData);
      console.log('Updated post:', updatedPost); // Log updated post data
      handleCloseEditDialog();
      // Update formData with the new values received after successful update
      setFormData({
        name: updatedPost.name,
        numOfPeople: updatedPost.numOfPeople,
        shelfLife: updatedPost.shelfLife,
        location: updatedPost.location,
        image: updatedPost.image,
        email: updatedPost.email,
        description: updatedPost.description,
      });
      window.location.reload();
    } catch (error) {
      console.error('Error updating food post:', error);
      
    }
  };

  
  // Function to handle deleting a post
  const handleDeletePost = async () => {
    try {
      await deleteFoodPostById(_id);
      onDelete(); // Call onDelete function to remove the card from UI
      window.location.reload();
    } catch (error) {
      console.error('Error deleting food post:', error);
      // Handle error here
    }
  };




  // Fetch user email from local storage and console log it
  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      console.log('User email:', user.email);
    }
  }, []);



 // Function to retrieve location coordinates from Google Maps API

  const getLocationCoordinates = async (location: string) => {
    const apiKey = 'AIzaSyDr9XJocHD_zMbbXQJdghMxk50g9N-nvKk';
    const encodedLocation = encodeURIComponent(location);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error('Location not found');
      }
    } catch (error) {
      console.error('Error retrieving location coordinates:', error);
      throw error;
    }
  };





// Function to handle status change
  const handleStatusChange = async () => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        throw new Error('User data not found in local storage');
      }
      const user = JSON.parse(userData);
      
      const updatedPost = await updateFoodPost(_id, { status: !status });
      const { latitude, longitude } = await getLocationCoordinates(updatedPost.location);
      const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
  
      const emailData = {
        user_name: user.ngoName,
        user_email: user.email,
        message: `To assist you in reaching your pickup location, here's the map location: ${mapsLink}`,
      };
  
      await emailjs.send('service_9rxd7gk', 'template_fp90dpm', emailData, 'OTFPGRs1rm7d1JC3g');
  
      window.location.reload();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  



 // Function to handle opening edit dialog

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };


  // Function to handle closing edit dialog
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const localTimestamp = new Date(timestamp).toLocaleString();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
    <Card sx={{ width: 300, marginBottom: '3rem', border: '2px solid #e0e0e0', borderRadius: '8px' }}>
      <CardHeader
         title={name}
        // title={t('foodpostcard.title', { name: name })}
        
        // subheader={`Number of People: ${numOfPeople}, Shelf Life: ${shelfLife}, Location: ${location},  Timestamp: ${localTimestamp}`}
        subheader={
          <>
            {/* <Typography variant="subtitle2">Feeds: {numOfPeople} People</Typography>
            <Typography variant="subtitle2">Shelf Life: {shelfLife} days</Typography>
            <Typography variant="subtitle2">Location: {location}</Typography>
            <Typography variant="subtitle2">Posted on: {localTimestamp}</Typography> */}
            <Typography variant="subtitle2">{t('foodpostcard.feeding')} {numOfPeople} {t('foodpostcard.people')}</Typography>
            <Typography variant="subtitle2">{t('foodpostcard.shelfLife')} {shelfLife} {t('foodpostcard.days')}</Typography>
            <Typography variant="subtitle2">{t('foodpostcard.location')} {location}</Typography>
            <Typography variant="subtitle2">{t('foodpostcard.postedOn')} {localTimestamp}</Typography>
          </>
        }
      />
      <CardMedia component="img" height="194" image={image} alt={name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="edit" onClick={handleOpenEditDialog}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDeletePost}>
          <DeleteIcon />
        </IconButton>
        <Button
          onClick={handleStatusChange}
          variant="contained"
          style={{ backgroundColor: status ? green[500] : red[500] }}
        >
          {/* {status ? 'Available' : 'Not Available'} */}
          {status ? t('foodpostcard.available') : t('foodpostcard.notAvailable')}
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {/* <Typography paragraph>Email: {formData.email}</Typography>
        <Typography paragraph>Description: {formData.description}</Typography>
        <Typography paragraph>Status: {status ? 'Available' : 'Not Available'}</Typography> Display status */}
        <Typography paragraph>{t('foodpostcard.email')}: {formData.email}</Typography>
        <Typography paragraph>{t('foodpostcard.description')}: {formData.description}</Typography> 
        <Typography paragraph>{t('foodpostcard.status')}: {status ? t('foodpostcard.available') : t('foodpostcard.notAvailable')}</Typography>
        </CardContent>
      </Collapse>
      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>{t('editFoodPost')}</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            type="number"
            name="numOfPeople"
            value={formData.numOfPeople}
            onChange={handleInputChange}
            label="Number of People"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            type="number"
            name="shelfLife"
            value={formData.shelfLife}
            onChange={handleInputChange}
            label="Shelf Life"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            label="Image URL"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleSaveChanges} variant="contained" color="success">
        {t('formButtons.save')}
        </Button>    
       <Button onClick={handleCloseEditDialog} variant="contained" color="error">
       {t('formButtons.cancel')}
       </Button>

      </DialogActions>
      </Dialog>
    </Card>
    </div>
  );
};

export default FoodPostCard;





