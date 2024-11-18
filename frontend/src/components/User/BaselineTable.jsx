import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  Snackbar,
  Alert,
  Checkbox,
  IconButton,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { getBaselines, addBaseline, deleteBaseline } from '../../services/baselineService';

const BaselineTable = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
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

  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      setSnackbarSeverity("warning");
      setSnackbarMessage("No rows selected for deletion.");
      setSnackbarOpen(true);
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete the selected rows?');
    if (confirmDelete) {
      try {
        await Promise.all(selectedRows.map((id) => deleteBaseline(id)));
        fetchBaselines();
        setSelectedRows([]);
        setSnackbarSeverity("success");
        setSnackbarMessage("Selected rows deleted successfully.");
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error deleting selected rows.");
        setSnackbarOpen(true);
        console.error('Error deleting baselines:', error);
      }
    }
  };

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          color: '#1976d2',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        Baseline Configuration
      </Typography>

      <input
        accept="/"
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
          sx={{
            marginBottom: 2,
            backgroundColor: '#8a7ae3',
            '&:hover': { backgroundColor: '#d6a2e8' },
            fontFamily: 'Luckiest Guy, sans-serif',
            textTransform: 'none',
          }}
        >
          Upload File
        </Button>
      </label>

      <IconButton
        onClick={handleDelete}
        color="error"
        sx={{ marginBottom: 2 }}
      >
        <Delete />
      </IconButton>

      <Box
        sx={{
          maxHeight: data.length >= 3 ? 300 : 'none',
          overflowY: data.length >= 3 ? 'auto' : 'visible',
          marginTop: 2,
        }}
      >
        <Table
          sx={{ backgroundColor: '#f0f4fc', borderRadius: 4 }}
        >
          <TableHead sx={{ backgroundColor: '#d0a0d2' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Select</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Original Filename</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Path</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Algorithm</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#e3f2fd' },
                  '&:hover': { backgroundColor: '#c9daf8' },
                }}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </TableCell>
                <TableCell sx={{ color: '#333' }}>{row.id}</TableCell>
                <TableCell sx={{ color: '#333' }}>{row.original_filename}</TableCell>
                <TableCell sx={{ color: '#333' }}>{row.path}</TableCell>
                <TableCell sx={{ color: '#333' }}>{row.algorithm}</TableCell>
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