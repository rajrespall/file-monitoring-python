import React from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff', 
        color: '#000', 
        paddingY: 8, 
        minHeight: '60vh',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/file.png" 
              alt="Hero Image"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
              }}
            />
          </Grid>

          {/* Text on the right */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome to Our Website
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ color: '#000' }}>
              This is the hero section where you can add some introductory text. You can use this
              area to highlight key points, provide a brief overview of your website, or direct
              users to a call-to-action.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ color: '#000' }}>
              Add more details here to give the visitor an understanding of what you offer. Make it
              engaging and informative!
            </Typography>
            <Button href="/mainpage" 
            sx={{ color: "#fff", 
                backgroundColor: "#000",
                marginTop: '20px',
                borderRadius: '20px',
                fontSize: '10px',
                maxWidth: '150px',
                maxHeight: '50px'

            }}>
                Get Started
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
