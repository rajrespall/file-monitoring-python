import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { register } from '../../services/authService';

function Copyright() {
  return (
    <Typography variant="body2" align="center" color="#a7c7e7">
      {'Copyright © '}
      <Link color="#9575cd" href="https://mui.com/">
        IntegrityHub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const generateUsername = (fname, lname) => {
    return (fname.charAt(0) + lname).toLowerCase().replace(/\s+/g, '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const newData = {
        ...prevData,
        [name]: value
      };
      
      if (name === 'fname' || name === 'lname') {
        newData.username = generateUsername(
          name === 'fname' ? value : prevData.fname,
          name === 'lname' ? value : prevData.lname
        );
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.fname || !formData.lname || !formData.email || !formData.password) {
        setError('Please fill in all required fields');
        return;
      }
      
      const data = await register(
        formData.username,
        formData.email,
        formData.password,
        formData.fname,
        formData.lname
      );
  
      console.log('Registration successful:', data);
      window.location.href = '/login';
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      console.error('Registration error:', err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', background: 'linear-gradient(135deg, #a7c7e7, #d0a0d2)'}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{color:"#9575cd"}}>
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="fname"
                label="First Name"
                autoFocus
                value={formData.fname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="lname"
                value={formData.lname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive information and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, background: 'linear-gradient(135deg, #a7c7e7, #d0a0d2)', fontWeight: 'bold' }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" color="#d0a0d2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
