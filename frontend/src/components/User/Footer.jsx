import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 3,
        background: 'linear-gradient(135deg, #a7c7e7, #d0a0d2)', 
      }}
    >
      <Typography
        variant="body2"
        color={'#ffffff'} 
      >
        © 2024 Copyright: 
        <a
          href="https://yourwebsite.com"
          style={{
            color: '#ffffff', 
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          IntegrityHub
        </a>
      </Typography>
    </Box>
  );
}