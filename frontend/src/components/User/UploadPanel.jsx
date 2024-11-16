import React, { useState } from 'react';
import { Button, Typography, Box, Paper, Grid, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ScanIcon from '@mui/icons-material/CameraEnhance'; // Assuming a scan icon for action

const ScanningPanel = () => {
  const [files, setFiles] = useState([]);

  // Add dummy files for the table (this can be replaced with actual file handling logic)
  const addFile = (fileName) => {
    setFiles(prevFiles => [...prevFiles, { name: fileName, scanned: false }]);
  };

  const handleScan = (fileName) => {
    console.log(`Scanning file: ${fileName}`);
    alert(`Scanning initiated for: ${fileName}`);
    // You can add your scan logic here and update the file status
    setFiles(prevFiles => prevFiles.map(file =>
      file.name === fileName ? { ...file, scanned: true } : file
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 3 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12}>
          <Box>
            <Typography variant="h6" sx={{ marginBottom: 2, color: '#1976d2', fontFamily: 'Poppins, sans-serif' }}>
              File Scanner
            </Typography>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#8a7ae3', 
                  color: '#fff', 
                  '&:hover': { backgroundColor: '#d6a2e8' }, 
                  fontFamily: 'Luckiest Guy, sans-serif',
                  textTransform: 'none',
                }}
                onClick={() => addFile(`File_${files.length + 1}.txt`)}
              >
                Add File (for testing)
              </Button>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#f0f4fc', borderRadius: 2 }}>
            <TableContainer sx={{ maxHeight: files.length >= 3 ? 300 : 'none', overflowY: files.length >= 3 ? 'auto' : 'visible' }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#d0a0d2' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>File Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Scanned</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map((file, index) => (
                    <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#e3f2fd' }, '&:hover': { backgroundColor: '#c9daf8' } }}>
                      <TableCell sx={{ color: '#333' }}>{file.name}</TableCell>
                      <TableCell sx={{ color: file.scanned ? '#388e3c' : '#d32f2f' }}>
                        {file.scanned ? 'Yes' : 'No'}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color={file.scanned ? "default" : "primary"}
                          sx={{
                            backgroundColor: file.scanned ? '#d6d6d6' : '#8a7ae3', 
                            '&:hover': { backgroundColor: file.scanned ? '#e0e0e0' : '#d6a2e8' },
                            fontFamily: 'Poppins, sans-serif',
                          }}
                          startIcon={<ScanIcon />}
                          onClick={() => handleScan(file.name)}
                          disabled={file.scanned}
                        >
                          {file.scanned ? 'Scanned' : 'Scan'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ScanningPanel;
