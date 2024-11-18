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
import { updateProfile } from '../../services/profileService';

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '******', // Keep password masked
    image: null
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const profData = JSON.parse(localStorage.getItem('profile'));
        if (userData) {
          setProfileData({
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            email: userData.email || '',
            username: userData.username || '',
            password: '******',
            image: profData?.image ? 
            `http://127.0.0.1:8000${profData.image}` : // Use your API base URL
            '/default_avatar.png' // Fallback to default avatar
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

  const handleSaveChanges = async () => {
    try {
      const cleanedData = Object.fromEntries(
        Object.entries(profileData).filter(([_, v]) => v != null && v !== '')
      );
      const response = await updateProfile(profileData, selectedImage);
      
      // Update localStorage with new user data
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('profile', JSON.stringify(response.profile))

      setSnackbarMessage('Profile updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      toggleEdit();
      
      setSelectedImage(null);
    } catch (error) {
      console.error('Error saving changes:', error);
      setSnackbarMessage(error.response?.data?.error || 'Error updating profile');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  return (
    <section style={{ background: 'linear-gradient(135deg, #a7c7e7, #d0a0d2)' }}>
      <PrimarySearchAppBar />
      <Container sx={{ py: 5, mt: 7, }}>
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
                <Card sx={{ mb: 4, height: '300px', backgroundColor: "#f0f8ff", boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
                  <CardContent sx={{ textAlign: 'center', mt: 2 }}>
                    <CardMedia
                      component="img"
                      image={selectedImage ? URL.createObjectURL(selectedImage) : profileData.image || "/default_avatar.png"}
                      alt="avatar"
                      sx={{ width: 150, height: 150, borderRadius: '50%', margin: '0 auto', border: '4px solid #d0a0d2' }}
                    />
                    <Typography 
                       variant="h6" 
                       sx={{ 
                       mt: 2,
                       color: '#5c6bc0',
                       fontWeight: 'bold',
                        fontFamily: 'Poppins, sans-serif'
                         }}
    >
      {profileData.first_name} {profileData.last_name}
    </Typography>
                    {isEditing && (
                      <>
                        <input
                          accept="image/*"
                          type="file"
                          onChange={handleImageChange}
                          style={{ display: 'none' }}
                          id="profile-image-input"
                        />
                        <label htmlFor="profile-image-input" style={{ display: 'inline-block' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            component="span" 
                            sx={{
                              width: '100%',
                              mt: 4,
                              bgcolor: '#a7c7e7',
                              '&:hover': { bgcolor: '#81d4fa' },
                            }}
                          >
                            Change Photo
                          </Button>
                        </label>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={8} xs={12}>
                <Card sx={{ mb: 4, height: '700px', bgcolor: '#ffffff', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', borderRadius: '15px', backgroundColor: "#f0f8ff" }}>
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
                    <Button
                      variant="contained"

                      sx={{
                        mt: 5,
                        width: '100%',
                        backgroundColor: isEditing ? '#d0a0d2' : '#a7c7e7',
                        color: isEditing ? '#fff' : '#fff',
                        transition: 'background-color 0.3s ease, transform 0.3s ease',
                        '&:hover': {
                          backgroundColor: isEditing ? '#9575cd' : '#81d4fa',
                        },
                      }}
                      onClick={toggleEdit}
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>

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
