import React, { useState } from 'react';
import { Button, Typography, Box, TextField, Paper, Grid, Container } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadPanel = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      console.log('Uploading file:', file);
      alert(`File uploaded: ${file.name}`);
    } else {
      alert('Please select a file to upload');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 4 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Welcome to File Uploader
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Use this tool to securely upload your files. Ensure that your files are in the
              supported formats, including Text File, Excel, Word, and PDF. Once uploaded, you’ll be notified of
              the status of your upload.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Click on the "Upload" button to get started. Your files will be safely processed and
              stored.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 3,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              maxWidth: 400,
              margin: '0 auto',
              boxShadow: 4,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2, textAlign: 'center' }}>
              Upload Your File
            </Typography>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                type="file"
                fullWidth
                inputProps={{
                  accept: '.txt, .xls, .pdf, .docx',
                }}
                onChange={handleFileChange}
                variant="outlined"
                sx={{ marginBottom: 3 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UploadPanel;
