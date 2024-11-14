import React from 'react'
import { Box } from '@mui/material';
import PrimarySearchAppBar from '../../components/User/Navbar';
import Hero from '../../components/User/Hero';
import AboutUsHeroSection from '../../components/User/Hero2';

function Home() {
  return (
    <Box>
      <PrimarySearchAppBar />
      <Hero />
      <AboutUsHeroSection />
    </Box>
  )
}

export default Home;