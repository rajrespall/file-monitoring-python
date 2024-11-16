import React, { useState, useEffect } from 'react';
import { Box, Grid, Breadcrumbs, Link, Typography } from '@mui/material';
import PrimarySearchAppBar from '../../components/User/Navbar';
import Spinner from '../../components/Spinner';
import AboutUsHeroSection from '../../components/User/Hero2';
import Footer from '../../components/User/Footer';

function AboutUs() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

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

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box
          sx={{
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
          }}
        >
          <PrimarySearchAppBar />
          <AboutUsHeroSection />
          <Footer />
        </Box>
      )}
    </>
  );
}

export default AboutUs;
