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
    <Container maxWidth="lg" sx={{ padding: 2 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12}>
          <Box>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            File Scanner
          </Typography>
            <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addFile(`File_${files.length + 1}.txt`)}
          >
            Add File (for testing lng)
          </Button>
        </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: files.length >= 3 ? 300 : 'none', overflowY: files.length >= 3 ? 'auto' : 'visible' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>File Name</TableCell>
                    <TableCell>Scanned</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map((file, index) => (
                    <TableRow key={index}>
                      <TableCell>{file.name}</TableCell>
                      <TableCell>{file.scanned ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color={file.scanned ? "default" : "primary"}
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
