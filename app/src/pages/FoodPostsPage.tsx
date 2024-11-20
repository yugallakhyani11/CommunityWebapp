
import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Box, Grid, IconButton } from '@mui/material';
import CreateFoodPostForm from '../components/CreateFoodPostForm';
import FoodPostCard from '../components/FoodPostCard';
import SearchBar from '../components/SearchBar';
import { getAllFoodPosts, createFoodPost, searchFoodPosts } from '../services/food-post-service';
import { Header } from '../pages/Header';
import { Footer } from '../pages/Footer';
 import  { useRef } from 'react';
 import emailjs from '@emailjs/browser';
 import axios from 'axios';
 import AddIcon from '@mui/icons-material/Add';
 import { useTranslation } from 'react-i18next';


interface FoodPostsPageProps {}

// Define interface for FoodPost object
interface FoodPost {
  _id: string;
  name: string;
  numOfPeople: number;
  shelfLife: number;
  location: string;
  image: string;
  description: string;
  timestamp: string;
  status: boolean;
  email: string;
}

// Functional component for FoodPostsPage
const FoodPostsPage: React.FC<FoodPostsPageProps> = () => {
  
  const { t } = useTranslation();
  const [foodPosts, setFoodPosts] = useState<FoodPost[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchParams, setSearchParams] = useState<{ [key: string]: string }>({});

// Function to fetch food posts
  useEffect(() => {
    fetchFoodPosts();
  }, [searchParams]);

  const fetchFoodPosts = async () => {
    console.log('Search Params:', searchParams);
    try {
      const response = await (Object.keys(searchParams).length === 0 ? getAllFoodPosts() : searchFoodPosts(searchParams));
      setFoodPosts(response);
    } catch (error) {
      console.error('Error fetching food posts:', error);
    }
  };

  const handleToggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };


// Function to get location coordinates using Google Maps API
  const getLocationCoordinates = async (location: string) => {
    const apiKey = 'AIzaSyDr9XJocHD_zMbbXQJdghMxk50g9N-nvKk';
    const encodedLocation = encodeURIComponent(location);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const { results } = response.data;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error('Location not found');
      }
    } catch (error) {
      console.error('Error retrieving location coordinates:', error);
      throw error;
    }
  };



// Function to create a new food post
  const handleCreateFoodPost = async (newPost: FoodPost) => {
    try {
      const createdPost = await createFoodPost(newPost);


    // Get location coordinates
    const { latitude, longitude } = await getLocationCoordinates(newPost.location);

    // Construct Google Maps link
     const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
  
      // Send email using EmailJS
      const emailData = {
        user_name: newPost.name, 
        user_email: newPost.email,
        message: `For any inquiries or assistance, feel free to contact us at: savefood@unicef.com`,
      };
  
      await emailjs.send('service_9rxd7gk', 'template_w3bqc4i', emailData, 'OTFPGRs1rm7d1JC3g');
  
      // Update the state with the new food post
      setFoodPosts([...foodPosts, createdPost]);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating food post:', error);
    }
  };




// Function to handle search

  const handleSearch = async (params: { [key: string]: string }) => {
    setSearchParams(params);
  };

// Function to handle clearing search
  const handleClearSearch = async () => {
    setSearchParams({});
  };
  
// Function to handle canceling create form
  const handleCancel = () => {
    setShowCreateForm(false);
  };

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
      <Box sx={{ textAlign: 'center', marginTop: '2rem', marginBottom: '1rem' }}>
      {/* <h1>Share the surplus, Spread smiles.</h1> */}
      <h1>{t('foodpostspage.heading')}</h1>
      </Box>
      {/* <Button onClick={handleToggleCreateForm}>Create Food Post</Button> */}
      {/* <Button onClick={handleToggleCreateForm} variant="contained" sx={{ bgcolor: 'success.main' }}>Create Food Post</Button> */}
      {/* <IconButton
       sx={{ color: 'white', bgcolor: 'blue', '&:hover': { bgcolor: 'darkblue' } }}
      onClick={handleToggleCreateForm}>
      <AddIcon />
      </IconButton> */}

    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1.5rem' }}>
     <IconButton
      sx={{ color: 'white', bgcolor: 'rgb(32 118 246 / 81%)', '&:hover': { bgcolor: 'orange' }, padding: '15px' }}
      onClick={handleToggleCreateForm}>
    <AddIcon />
    </IconButton>
    </Box>

      <Dialog open={showCreateForm} onClose={handleCancel} maxWidth="xl">
        <DialogTitle>{t('createNewFoodPost')}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: '500px' }}>
            <CreateFoodPostForm onCreate={handleCreateFoodPost} onCancel={handleCancel} />
          </Box>
        </DialogContent>
      </Dialog>
      
      <Grid container justifyContent="center" spacing={5}>
        {foodPosts.map((post) => (
          <Grid item key={post._id}>
            <FoodPostCard
              _id={post._id}
              name={post.name}
              numOfPeople={post.numOfPeople}
              shelfLife={post.shelfLife}
              location={post.location}
              image={post.image}
              description={post.description}
              timestamp={post.timestamp}
              status={post.status}
              email={post.email}
              onDelete={() => {}}
            />
          </Grid>
        ))}
      </Grid>
      <Footer />
    </div>
  );
};

export default FoodPostsPage;





