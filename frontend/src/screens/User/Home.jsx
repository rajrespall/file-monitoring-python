import React from 'react'
import { Box } from '@mui/material';
import PrimarySearchAppBar from '../../components/User/Navbar';
import MainPanel from '../../components/User/Panel';
import HeroSection from '../../components/User/Hero';
import AboutUsHeroSection from '../../components/User/Hero2';

function Home() {
  return (
    <Box>
      <PrimarySearchAppBar /> 
      <HeroSection />
      <MainPanel />
      <AboutUsHeroSection />
    </Box>
  )
}

export default Home;