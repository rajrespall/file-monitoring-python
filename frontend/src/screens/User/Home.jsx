import React from 'react'
import { Box } from '@mui/material';
import PrimarySearchAppBar from '../../components/User/Navbar';
import Hero from '../../components/User/Hero';

function Home() {
  return (
    <Box>
      <PrimarySearchAppBar />
      <Hero />
    </Box>
  )
}

export default Home;