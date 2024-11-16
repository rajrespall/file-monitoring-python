import React from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedIcon from '@mui/icons-material/Verified';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-scroll'; 

const HeroSection = () => {
  return (
    <Box
      id="hero"
      sx={{
        backgroundColor: '#fff', 
        color: '#000', 
        paddingY: 8, 
        minHeight: '80vh',
        marginTop: '70px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/check.jpg"
              alt="Hero Image"
              sx={{
                width: '100%',
                height: 'auto',
                marginRight: '50px',
                borderRadius: 2,
                transition: 'transform 0.5s ease, opacity 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.1)', 
                  opacity: 0.8, 
                },
              }}
            />
          </Grid>

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
              Welcome to IntegrityHub!
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
              IntegrityHub is your reliable solution for ensuring file integrity. We provide a
              seamless way to monitor, verify, and protect your digital files from unauthorized
              modifications and potential corruption.
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
              With IntegrityHub, gain peace of mind knowing that your files remain untouched and
              authentic. Dive in to explore a suite of tools designed to safeguard your data and
              maintain trust in your digital assets.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <VerifiedIcon sx={{ color: '#1e90ff', marginRight: 1 }} />
                <Typography variant="body2" color="text.secondary">Verified Integrity</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockIcon sx={{ color: '#1e90ff', marginRight: 1 }} />
                <Typography variant="body2" color="text.secondary">Data Protection</Typography>
              </Box>
            </Box>

            <Link
              to="getstarted"
              smooth={true}
              duration={500}
            >
              <Button
                sx={{
                  color: "#fff",
                  backgroundColor: "#1e90ff",
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
                    backgroundColor: '#1c86ee',
                    transform: 'scale(1.05)',
                  },
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Get Started
              </Button>
            </Link>
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

export default HeroSection;
