import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Box, Typography, Snackbar, Alert } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { getBaselines, addBaseline, deleteBaseline } from '../../services/baselineService';

const BaselineTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchBaselines();
  }, []);

  const fetchBaselines = async () => {
    try {
      setLoading(true);
      const response = await getBaselines();
      setData(response);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error fetching baselines.");
      setSnackbarOpen(true);
      console.error('Error fetching baselines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBaseline = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('files', file);

      const response = await addBaseline(formData);
      fetchBaselines();
      setSnackbarSeverity("success");
      setSnackbarMessage("File uploaded successfully.");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error uploading file.");
      setSnackbarOpen(true);
      console.error('Error adding baseline:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this baseline?');
    
    if (confirmDelete) {
      try {
        await deleteBaseline(id);
        fetchBaselines();
        setSnackbarSeverity("success");
        setSnackbarMessage("Baseline deleted successfully.");
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error deleting baseline.");
        setSnackbarOpen(true);
        console.error('Error deleting baseline:', error);
      }
    } else {
      console.log('Deletion cancelled');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Baseline Configuration
      </Typography>

      <input
        accept="*/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleAddBaseline}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="contained"
          component="span"
          color="primary"
          startIcon={<Add />}
          sx={{ marginBottom: 2 }}
        >
          Upload File
        </Button>
      </label>

      <Box
        sx={{
          maxHeight: data.length >= 3 ? 300 : 'none',
          overflowY: data.length >= 3 ? 'auto' : 'visible',
          marginTop: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Original Filename</TableCell>
              <TableCell>Path</TableCell>
              <TableCell>Algorithm</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.original_filename}</TableCell>
                <TableCell>{row.path}</TableCell>
                <TableCell>{row.algorithm}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(row.id)}
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BaselineTable;
