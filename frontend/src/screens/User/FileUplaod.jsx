import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import PrimarySearchAppBar from '../../components/User/Navbar';
import MainPanel from '../../components/User/Panel';
import Spinner from '../../components/Spinner';
import Footer from '../../components/User/Footer';

function FileUplaodPage() {
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
            <MainPanel />
            <Footer />
        </Box>
      )}
    </>
  );
}

export default FileUplaodPage;
