import React from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';

const AboutUsHeroSection = () => {
  return (
    <Box
      id="aboutus"
      sx={{
        backgroundColor: '#fff',
        color: '#000',
        paddingY: 8,
        minHeight: '60vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontFamily: 'Anton, sans-serif',
                animation: 'fadeIn 1s forwards',
                animationDelay: '0.3s',
              }}
            >
              About Us
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{
                color: '#000',
                animation: 'fadeIn 1s forwards',
                animationDelay: '0.6s',
              }}
            >
              At IntegrityHub, we are dedicated to providing top-tier file integrity and security solutions.
              Our team is committed to offering easy-to-use tools that empower individuals and businesses to
              ensure their digital files remain untampered and protected from unauthorized access.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                color: '#000',
                animation: 'fadeIn 1s forwards',
                animationDelay: '0.9s',
              }}
            >
              With years of experience in data security, our mission is to help you preserve the integrity of
              your digital assets. Whether you're an individual or a business, we have the right tools to 
              safeguard your files and provide you with peace of mind.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoIcon sx={{ color: '#1e90ff', marginRight: 1 }} />
                <Typography variant="body2" color="text.secondary">Expert Solutions</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <GroupIcon sx={{ color: '#1e90ff', marginRight: 1 }} />
                <Typography variant="body2" color="text.secondary">Trusted by Businesses</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SecurityIcon sx={{ color: '#1e90ff', marginRight: 1 }} />
                <Typography variant="body2" color="text.secondary">Robust Protection</Typography>
              </Box>
            </Box>

            <Button
              href="/contact-us"
              sx={{
                color: "#fff",
                backgroundColor: "#000",
                marginTop: '20px',
                borderRadius: '20px',
                paddingX: '24px',
                paddingY: '12px',
                fontSize: '14px',
                maxWidth: '180px',
                maxHeight: '50px',
                textTransform: 'capitalize',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: '#1e90ff',
                  transform: 'scale(1.05)',
                },
              }}
              endIcon={<InfoIcon />}
            >
              Learn More
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/file.png"  
              alt="About Us Image"
              sx={{
                width: '100%',
                height: 'auto',
                marginLeft: '40px;',
                borderRadius: 2,
                transition: 'transform 0.5s ease, opacity 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.1)', 
                  opacity: 0.8, 
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.2)', 
          zIndex: -1,
          animation: 'moveBackground 10s ease infinite', 
        }}
      />
    </Box>
  );
};

export default AboutUsHeroSection;
