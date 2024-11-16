import * as React from 'react';
import 'typeface-anton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'; 
import { logout } from '../../services/authService';

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [bgColor, setBgColor] = React.useState('white'); 

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBgColor('black');
      } else {
        setBgColor('white'); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    // Scrolls to the top smoothly when the button is clicked
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
      // Redirect to login page
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
      // Still clear local storage and redirect on error
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
      <MenuItem onClick={handleMenuClose}>My Uploads</MenuItem>
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
      <MenuItem>
        <IconButton size="large" color={bgColor === 'white' ? 'default' : 'inherit'}>
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color={bgColor === 'white' ? 'default' : 'inherit'}>
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
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
          onClick={scrollToTop}
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

      <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
        <Button
          component="a"
          href="#getstarted"
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
          How to Start
        </Button>
        
        <Button
          component="a"
          href="#aboutus"
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
            borderColor: 'transparent'
          }}
        >
          About Us
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <IconButton size="large" color={bgColor === 'white' ? 'default' : 'inherit'}>
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
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
