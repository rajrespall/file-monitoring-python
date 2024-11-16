import React from 'react'
import ButtonAppBar from '../../components/User/LandingNav';
import HeroSection from '../../components/User/Hero';
import AboutUsHeroSection from '../../components/User/Hero2';
import { Box } from '@mui/material';

const LandingPage = () => {
  return (
    <Box>
      <ButtonAppBar />
      <HeroSection />
      <AboutUsHeroSection />
    </Box>
)
}

export default LandingPage