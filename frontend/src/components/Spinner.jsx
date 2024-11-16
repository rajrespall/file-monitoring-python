import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Spinner = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
                animation: 'pulse 1.5s infinite',
                '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.6 },
                    '100%': { opacity: 1 },
                },
            }}
        >
            <CircularProgress
                size={80}
                thickness={4}
                sx={{
                    color: '#3f51b5',
                    mb: 2,
                }}
            />
            <Typography variant="h6" sx={{ color: '#3f51b5' }}>
                Loading, please wait...
            </Typography>
        </Box>
    );
};

export default Spinner;
