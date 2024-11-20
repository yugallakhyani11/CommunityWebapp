import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Header } from './Header';

const LandingPage: React.FC = () => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {

    // Used local storage to store user details
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
    }}, []);

  return (
    <>
    {user && <Header location={location} />}
      <Box sx={{ bgcolor: 'background.default', pt: 30, pb: 30,
        backgroundImage: "url('../../public/images/background-img.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
       }}
      >

        <Container maxWidth="sm">
          <Typography variant="h3" align="center" color="text.primary" gutterBottom style={{ color: 'white' }}>
            Welcome to Care2Share
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph style={{ color: 'white' }}>
            A platform where individuals, organizations, and NGOs come together to share and collect surplus food, organize events, donate, and raise awareness about pressing issues surrounding hunger relief.
          </Typography>
        </Container>
      </Box>
      <br/>
      <Box sx={{ bgcolor: 'background.paper', pt: 4, pb: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" color="text.primary" gutterBottom>
            <img src='../../public/images/features.svg' />
          </Typography>
          <Typography variant="h4" align="center" color="text.primary" gutterBottom>
            Features
          </Typography>
          <br/>
          <Grid container spacing={7} justifyContent="center">
            <Grid item xs={12} sm={6} md={4.5}>
              <Typography variant="h6" align="center" color="text.primary" gutterBottom>
              Surplus Food Sharing
              </Typography>
              <Typography align="center" color="text.secondary">
              Post surplus food listings for NGOs to collect
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4.5}>
              <Typography variant="h6" align="center" color="text.primary" gutterBottom>
                Community Engagement
              </Typography>
              <Typography align="center" color="text.secondary">
                Create events, allowing volunteers to participate and donate
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" align="center" color="text.primary" gutterBottom>
                Donations
              </Typography>
              <Typography align="center" color="text.secondary">
                Donate to events via payment gateways
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" align="center" color="text.primary" gutterBottom>
                User Engagement
              </Typography>
              <Typography align="center" color="text.secondary">
                Write, comment or like blogs to amplify awareness efforts
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ bgcolor: 'background.default', pt: 4, pb: 6 }}>
        <Container maxWidth="md">
        <Typography variant="h4" align="center" color="text.primary" gutterBottom>
            <img src='../../public/images/join.svg' />
          </Typography>
          <Typography variant="h4" align="center" color="text.primary" gutterBottom>
            Join Care2Share Today
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Be the change, feeding hope one community at a time, and making a difference today.
          </Typography>
        </Container>
      </Box>
      <Box sx={{ bgcolor: 'background.default', pt: 4, pb: 6 }}>
        <Container maxWidth="md">
        <Typography variant="h4" align="center" color="text.primary" gutterBottom>
            <img src='../../public/images/goal.svg' />
          </Typography>
          <Typography variant="h4" align="center" color="text.primary" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Empowering users to make a meaningful impact in the fight against hunger.
          </Typography>
        </Container>
      </Box>
      <footer>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          © {new Date().getFullYear()} Care2Share. All rights reserved.
        </Typography>
      </footer>
    </>
  );
}

export default LandingPage;