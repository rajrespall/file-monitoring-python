import React from 'react';
import { Box, Typography } from '@mui/material';

const HomePanel = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Welcome to IntegrityHub!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
        IntegrityHub is your go-to solution for ensuring the integrity and security of your files.
        Use our powerful tools to verify and maintain the consistency of your critical documents.
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
        Features of File Integrity Checker:
      </Typography>
      <ul style={{ marginLeft: '20px', color: '#555', fontSize: '16px' }}>
        <li>Upload files securely with multiple format support.</li>
        <li>Check the integrity of files against a baseline.</li>
        <li>Detect any unauthorized changes or corruption in files.</li>
        <li>Easy-to-use interface for quick and reliable checks.</li>
      </ul>

      <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
        How to Use:
      </Typography>
      <ol style={{ marginLeft: '20px', color: '#555', fontSize: '16px' }}>
        <li>Navigate to the <strong>Upload File</strong> tab to upload your document.</li>
        <li>Go to the <strong>Baseline</strong> tab to set a baseline for comparison.</li>
        <li>Check for any file integrity issues in the corresponding panels.</li>
        <li>Adjust your preferences in the <strong>Settings</strong> tab as needed.</li>
      </ol>

      <Typography variant="body2" sx={{ mt: 3, fontStyle: 'italic', color: '#888' }}>
        Protect your files and ensure their safety with IntegrityHub.
      </Typography>
    </Box>
  );
};

export default HomePanel;
