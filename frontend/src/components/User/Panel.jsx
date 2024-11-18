import React, { useState } from 'react';
import { Box, Tab, Tabs, Card } from '@mui/material';
import HomePanel from './HomePanel';
import UploadPanel from './ScanPanel';
import BaselineTable from './BaselineTable';
import SettingsPanel from './SettingsPanel';

function MainPanel() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      id="getstarted"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '100px', 
        height: '100vh',
        background: 'linear-gradient(135deg, #a7c7e7, #d0a0d2)',
      }}
    >
      <Card
        sx={{
          width: '80%',
          height: '550px',
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="main options tabs"
            TabIndicatorProps={{ style: { backgroundColor: '#8a7ae3' } }} 
            sx={{
              marginBottom: 3,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 'bold',
                color: '#d0a0d2',
                '&:hover': {
                  backgroundColor: '#d0a0d2',
                  color: 'white'
                },
              },
            }}
          >
            <Tab label="Home" />
            <Tab label="Scan File" />
            <Tab label="Baseline" />
            <Tab label="Settings" />
          </Tabs>

          <Box sx={{ padding: 2 }}>
            {selectedTab === 0 && <HomePanel />}
            {selectedTab === 1 && <UploadPanel />}
            {selectedTab === 2 && <BaselineTable />}
            {selectedTab === 3 && <SettingsPanel />}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default MainPanel;
