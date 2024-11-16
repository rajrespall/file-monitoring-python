import * as React from 'react';
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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
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

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component="a" href="/profile">Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" color={bgColor === 'white' ? 'default' : 'inherit'}>
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
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
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontFamily: 'Anton, sans-serif',
                color: bgColor === 'white' ? 'black' : 'white',
                marginRight: '20px', 
              }}
            >
              IntegrityHub
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
            <Button
              onClick={() => isHomePage ? scrollToSection('getstarted') : window.location.href = '/home/start'}
              sx={{
                textDecoration: 'none',
                color: bgColor === 'white' ? 'black' : 'white',
                '&:hover': {
                  color: bgColor === 'white' ? 'blue' : 'blue',
                },
                fontWeight: 'bold',
                textTransform: 'capitalize',
                padding: '6px 16px',
                border: '1px solid',
                borderColor: 'transparent',
              }}
            >
              {isHomePage ? "How to Start" : "File Upload"}
            </Button>

              <Button
                onClick={() => isHomePage ? scrollToSection('aboutus') : window.location.href = '/home/aboutus'}
                sx={{
                  textDecoration: 'none',
                  color: bgColor === 'white' ? 'black' : 'white',
                  '&:hover': {
                    color: bgColor === 'white' ? 'blue' : 'blue',
                  },
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  padding: '6px 16px',
                  border: '1px solid',
                  borderColor: 'transparent',
                }}
              >
                About Us
              </Button>
            </Box>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color={bgColor === 'white' ? 'default' : 'inherit'} 
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
              color={bgColor === 'white' ? 'default' : 'inherit'} 
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
