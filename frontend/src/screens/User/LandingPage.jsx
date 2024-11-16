import React, { useState, useEffect } from 'react';
import ButtonAppBar from '../../components/User/LandingNav';
import HeroSection from '../../components/User/Hero';
import AboutUsHeroSection from '../../components/User/Hero2';
import { Box } from '@mui/material';
import Spinner from '../../components/Spinner';
import Footer from '../../components/User/Footer';

const LandingPage = () => {
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
          <ButtonAppBar />
          <HeroSection />
          <AboutUsHeroSection />
          <Footer />
        </Box>
      )}
    </>
  );
};

export default LandingPage;
