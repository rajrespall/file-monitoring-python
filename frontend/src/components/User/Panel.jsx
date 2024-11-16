import React, { useState } from 'react';
import { Box, Tab, Tabs, Card } from '@mui/material';
import HomePanel from './HomePanel';
import UploadPanel from './UploadPanel';
import BaselineTable from './BaselineTable';
import SettingsPanel from './SettingsPanel';

function MainPanel() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      id = "getstarted"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '100px', 
        height: '100vh',
        backgroundColor: '#ffffff',
      }}
    >
      <Card
        sx={{
          width: '80%',
          height: '550px',
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="main options tabs"
            TabIndicatorProps={{ style: { backgroundColor: '#1976d2' } }}
            sx={{
              marginBottom: 3,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 'bold',
                color: '#555',
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                },
              },
              '& .Mui-selected': {
                color: '#1976d2',
                backgroundColor: '#e3f2fd',
                borderRadius: '4px',
              },
            }}
          >
            <Tab label="Home" />
            <Tab label="Upload File" />
            <Tab label="Baseline" />
            <Tab label="Settings" />
          </Tabs>

          <Box sx={{ padding: 2 }}>
            {selectedTab === 0 && (
              <HomePanel/>
            )}

            {selectedTab === 1 && (
              <Box>
                <UploadPanel />
              </Box>
            )}

            {selectedTab === 2 && (
              <BaselineTable />
            )}

            {selectedTab === 3 && (
              <SettingsPanel />
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default MainPanel;