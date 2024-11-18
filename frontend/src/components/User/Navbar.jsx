import React from 'react';
import 'typeface-anton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../services/authService';

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [bgColor, setBgColor] = React.useState('white');
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  };

  const scrollToSection = (id) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        '& .MuiPaper-root': {
          padding: '10px',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f9f9f9',
        },
      }}
    >
      <MenuItem
        onClick={handleMenuClose}
        component="a"
        href="/profile"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px',
          '&:hover': {
            backgroundColor: '#e0f7fa',
          },
        }}
      >
        <PersonIcon />
        Profile
      </MenuItem>
      <MenuItem
        onClick={handleLogout}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px',
          '&:hover': {
            backgroundColor: '#ffe0e0',
          },
        }}
      >
        <LogoutIcon />
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
      sx={{
        '& .MuiPaper-root': {
          padding: '10px',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f9f9f9',
        },
      }}
    >
      <MenuItem
        onClick={handleProfileMenuOpen}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px',
          '&:hover': {
            backgroundColor: '#e0f7fa',
          },
        }}
      >
        <AccountCircle />
        Profile
      </MenuItem>
      <MenuItem
        onClick={handleLogout}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px',
          '&:hover': {
            backgroundColor: '#ffe0e0',
          },
        }}
      >
        <LogoutIcon />
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: bgColor, transition: 'background-color 0.3s ease' }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color={bgColor === 'white' ? 'default' : 'inherit'}
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Anton, sans-serif',
                color: bgColor === 'white' ? 'black' : 'white',
              }}
            >
              IntegrityHub
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Button
              onClick={() =>
                isHomePage ? scrollToSection('getstarted') : (window.location.href = '/home/start')
              }
              sx={{
                textDecoration: 'none',
                color: bgColor === 'white' ? 'black' : 'white',
                '&:hover': { color: 'blue' },
                fontWeight: 'bold',
                marginRight: '16px',
                textTransform: 'capitalize',
              }}
            >
              {isHomePage ? 'How to Start' : 'Check File'}
            </Button>

            <Button
              onClick={() =>
                isHomePage ? scrollToSection('aboutus') : (window.location.href = '/home/aboutus')
              }
              sx={{
                textDecoration: 'none',
                color: bgColor === 'white' ? 'black' : 'white',
                '&:hover': { color: 'blue' },
                fontWeight: 'bold',
                marginRight: '16px',
                textTransform: 'capitalize',
              }}
            >
              About Us
            </Button>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}