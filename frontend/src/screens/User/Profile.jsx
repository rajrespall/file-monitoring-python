import React, { useState } from 'react';
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
  TextField
} from '@mui/material';
import PrimarySearchAppBar from '../../components/User/Navbar';

export default function ProfilePage() {
  // State for managing profile data
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Hayley',
    lastName: 'Williams',
    email: 'hayley@gmail.com',
    username: 'hwilliams',
    password: '******',
  });

  // Handle change in editable fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section style={{ backgroundColor: '#fff' }}>
      <PrimarySearchAppBar />
      <Container sx={{ py: 5, mt: 7 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ backgroundColor: '#f4f6f8', borderRadius: 1, p: 2 }}>
              <Link color="inherit" href="/home">Home</Link>
              <Typography color="textPrimary">User Profile</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid item lg={4} xs={12}>
            <Card sx={{ mb: 4, height: '300px', bgcolor: '#ffffff' }}>
              <CardContent sx={{ textAlign: 'center', mt: 4 }}>
                <CardMedia
                  component="img"
                  image="https://preview.redd.it/hayley-williams-v0-amoz6z6e2h1c1.jpg?width=1200&format=pjpg&auto=webp&s=33331c7b20fc33fb739e323171639f0cec183b6c"
                  alt="avatar"
                  sx={{ width: 150, borderRadius: '50%', margin: '0 auto' }}
                />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2, color: 'black' }}>
                  Hayley Williams
                </Typography>
                <Button
                  sx={{
                    mt: 1,
                    backgroundColor: isEditing ? 'transparent' : 'transparent',
                    color: isEditing ? 'black' : 'black',
                    transition: 'transform 0.3s ease, background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: isEditing ? 'red' : 'green', 
                      transform: 'scale(1.05)',
                      color: 'white',
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
            <Card sx={{ mb: 4, height: '700px' }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item sm={3}><Typography>First Name</Typography></Grid>
                  <Grid item sm={9}>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                      />
                    ) : (
                      <Typography color="textSecondary">{profileData.firstName}</Typography>
                    )}
                  </Grid>
                </Grid>
                <Box sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid item sm={3}><Typography>Last Name</Typography></Grid>
                  <Grid item sm={9}>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                      />
                    ) : (
                      <Typography color="textSecondary">{profileData.lastName}</Typography>
                    )}
                  </Grid>
                </Grid>
                <Box sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid item sm={3}><Typography>Email</Typography></Grid>
                  <Grid item sm={9}>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                      />
                    ) : (
                      <Typography color="textSecondary">{profileData.email}</Typography>
                    )}
                  </Grid>
                </Grid>
                <Box sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid item sm={3}><Typography>Username</Typography></Grid>
                  <Grid item sm={9}>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="username"
                        value={profileData.username}
                        onChange={handleChange}
                      />
                    ) : (
                      <Typography color="textSecondary">{profileData.username}</Typography>
                    )}
                  </Grid>
                </Grid>
                <Box sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid item sm={3}><Typography>Password</Typography></Grid>
                  <Grid item sm={9}>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="password"
                        value={profileData.password}
                        onChange={handleChange}
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
                      onClick={toggleEdit}
                      sx={{ width: '100%' }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
