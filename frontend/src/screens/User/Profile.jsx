import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Breadcrumbs,
  Typography,
  Link,
  Box,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import PrimarySearchAppBar from '../../components/User/Navbar';
import Spinner from '../../components/Spinner';
import Footer from '../../components/User/Footer';

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '******' // Keep password masked
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          setProfileData({
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            email: userData.email || '',
            username: userData.username || '',
            password: '******' 
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setSnackbarMessage('Error loading profile data');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    };

    loadUserData();
  }, []);

  // Loading animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if (!isLoading) {
      const fadeTimer = setTimeout(() => setFadeIn(true), 50);
      return () => clearTimeout(fadeTimer);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    try {
      // Here you would typically make an API call to update the user profile
      // For now, we'll just update localStorage
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const updatedUser = {
        ...currentUser,
        fname: profileData.first_name,
        lname: profileData.last_name,
        email: profileData.email,
        username: profileData.username
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setSnackbarMessage('Profile updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      toggleEdit();
    } catch (error) {
      console.error('Error saving changes:', error);
      setSnackbarMessage('Error updating profile');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <section style={{ background: 'linear-gradient(135deg, #a7c7e7, #d0a0d2)' }}>
      <PrimarySearchAppBar />
      <Container sx={{ py: 5, mt: 7 }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Box
            sx={{
              opacity: fadeIn ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ backgroundColor: '#ffffff', borderRadius: 1, p: 2 }}>
                  <Link color="inherit" href="/home">Home</Link>
                  <Typography color="textPrimary" sx={{ fontWeight: 'bold' }}>User Profile</Typography>
                </Breadcrumbs>
              </Grid>

              <Grid item lg={4} xs={12}>
                <Card sx={{ mb: 4, height: '300px', bgcolor: '#f3f4f7', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
                  <CardContent sx={{ textAlign: 'center', mt: 2 }}>
                    <CardMedia
                      component="img"
                      image="https://preview.redd.it/hayley-williams-v0-amoz6z6e2h1c1.jpg?width=1200&format=pjpg&auto=webp&s=33331c7b20fc33fb739e323171639f0cec183b6c"
                      alt="avatar"
                      sx={{ width: 150, borderRadius: '50%', margin: '0 auto', border: '4px solid #d0a0d2' }}
                    />
                    <Typography variant="h6" color="textPrimary" sx={{ mt: 2, color: '#5c6bc0' }}>
                      Hayley Williams
                    </Typography>
                    <Button
                      sx={{
                        mt: 1,
                        backgroundColor: isEditing ? '#d0a0d2' : '#a7c7e7',
                        color: isEditing ? '#fff' : '#fff',
                        transition: 'background-color 0.3s ease, transform 0.3s ease',
                        '&:hover': {
                          backgroundColor: isEditing ? '#9575cd' : '#81d4fa',
                          transform: 'scale(1.05)',
                        },
                      }}
                      onClick={toggleEdit}
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={8} xs={12}>
                <Card sx={{ mb: 4, height: '700px', bgcolor: '#ffffff', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item sm={3}><Typography sx={{ color: '#5c6bc0', fontWeight: 'bold' }}>First Name</Typography></Grid>
                      <Grid item sm={9}>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            variant="outlined"
                            name="first_name"
                            value={profileData.first_name}
                            onChange={handleChange}
                            sx={{ bgcolor: '#f0f8ff', borderRadius: '4px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#a7c7e7' } } }}
                          />
                        ) : (
                          <Typography color="textSecondary">{profileData.first_name}</Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Box sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item sm={3}><Typography sx={{ color: '#5c6bc0', fontWeight: 'bold' }}>Last Name</Typography></Grid>
                      <Grid item sm={9}>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            variant="outlined"
                            name="last_name"
                            value={profileData.last_name}
                            onChange={handleChange}
                            sx={{ bgcolor: '#f0f8ff', borderRadius: '4px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#a7c7e7' } } }}
                          />
                        ) : (
                          <Typography color="textSecondary">{profileData.last_name}</Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Box sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item sm={3}><Typography sx={{ color: '#5c6bc0', fontWeight: 'bold' }}>Email</Typography></Grid>
                      <Grid item sm={9}>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            variant="outlined"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                            sx={{ bgcolor: '#f0f8ff', borderRadius: '4px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#a7c7e7' } } }}
                          />
                        ) : (
                          <Typography color="textSecondary">{profileData.email}</Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Box sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item sm={3}><Typography sx={{ color: '#5c6bc0', fontWeight: 'bold' }}>Username</Typography></Grid>
                      <Grid item sm={9}>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            variant="outlined"
                            name="username"
                            value={profileData.username}
                            onChange={handleChange}
                            sx={{ bgcolor: '#f0f8ff', borderRadius: '4px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#a7c7e7' } } }}
                          />
                        ) : (
                          <Typography color="textSecondary">{profileData.username}</Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Box sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item sm={3}><Typography sx={{ color: '#5c6bc0', fontWeight: 'bold' }}>Password</Typography></Grid>
                      <Grid item sm={9}>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            variant="outlined"
                            name="password"
                            value={profileData.password}
                            onChange={handleChange}
                            sx={{ bgcolor: '#f0f8ff', borderRadius: '4px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#a7c7e7' } } }}
                          />
                        ) : (
                          <Typography color="textSecondary">{profileData.password}</Typography>
                        )}
                      </Grid>
                    </Grid>

                    {isEditing && (
                      <Box sx={{ mt: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSaveChanges} 
                          sx={{
                            width: '100%',
                            bgcolor: '#a7c7e7',
                            '&:hover': { bgcolor: '#81d4fa' },
                          }}
                        >
                          Save Changes
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Footer />
    </section>
  );
}
