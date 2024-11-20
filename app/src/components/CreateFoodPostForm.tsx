import * as React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

interface CreateFoodPostFormProps {
  onCreate: (newPost: any) => void; // Defined the type of onCreate function
  onCancel: () => void; // Defined the type of onCancel function
}

const CreateFoodPostForm: React.FC<CreateFoodPostFormProps> = ({ onCreate, onCancel }) => {
  const { t } = useTranslation(); // Initialize the translation hook

  const [formData, setFormData] = React.useState({
    name: '',
    numOfPeople: 0,
    shelfLife: 0,
    location: '',
    image: '',
    description: '',
    email: '', 
  });



  // Function to handle file upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result as string,
        }));
      };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    // Reset form data after submission
    setFormData({
      name: '',
      numOfPeople: 0,
      shelfLife: 0,
      location: '',
      image: '',
      description: '',
      email: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        label="Name"
        variant="outlined"
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
        margin="normal"
        required
      />
      {/* <TextField
        type="text"
        name="image"
        value={formData.image}
        onChange={handleInputChange}
        label="Image URL"
        variant="outlined"
        margin="normal"
        required
      /> */}
            <input
        type="file"
        onChange={handleImageUpload} // Call handleImageUpload function when file is selected
        accept="image/*" // Accept only image files
        required
      />
      <TextField
        type="text"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        label="Email"
        variant="outlined"
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
        margin="normal"
        required
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="submit" variant="contained" color="success">
        {t('formButtons.save')}
        </Button>
        <Button variant="contained" color="error" onClick={onCancel}>
        {t('formButtons.cancel')}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateFoodPostForm;

