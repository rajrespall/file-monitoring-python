import * as React from 'react';
import 'typeface-anton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  const [bgColor, setBgColor] = React.useState('transparent');

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBgColor('white');
      } else {
        setBgColor('white');
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: bgColor, 
          transition: 'background-color 0.3s ease', 
          boxShadow: bgColor === 'transparent' ? 'none' : 3 
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color={bgColor === 'black' ? 'inherit' : 'black'}  
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              display: { xs: 'none', sm: 'block' },
              fontFamily: 'Anton, sans-serif', 
              color: bgColor === 'black' ? 'white' : 'black' 
            }}
          >
            IntegrityHub
          </Typography>

          <Button 
            href="/login" 
            color={bgColor === 'black' ? 'inherit' : 'black'} 
            sx={{ color: bgColor === 'black' ? 'white' : 'black' }} 
          >
            Login/ Register
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
