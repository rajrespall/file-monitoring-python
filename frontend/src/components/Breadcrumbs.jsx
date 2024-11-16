import React from 'react';
import { Breadcrumbs, Link, Typography, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';

const BreadcrumbsComponent = () => {
  const location = useLocation(); 
  
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const getBreadcrumbs = () => {
    return pathSegments.map((segment, index) => {
      const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
      return (
        <Link key={url} color="inherit" href={url}>
          {segment.charAt(0).toUpperCase() + segment.slice(1)}
        </Link>
      );
    });
  };

  return (
    <Grid item xs={12}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ backgroundColor: '#f4f6f8', borderRadius: 1, p: 2 }}>
        <Link color="inherit" href="/home">Home</Link>
        {getBreadcrumbs().length > 0 ? getBreadcrumbs() : <Typography color="textPrimary">Current Page</Typography>}
      </Breadcrumbs>
    </Grid>
  );
};

export default BreadcrumbsComponent;
