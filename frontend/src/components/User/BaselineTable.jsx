import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Box, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { getBaselines, addBaseline, deleteBaseline } from '../../services/baselineService';

const BaselineTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBaselines();
  }, []);

  const fetchBaselines = async () => {
    try {
      setLoading(true);
      const response = await getBaselines();
      setData(response);
    } catch (error) {
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
      fetchBaselines(); // Refresh list after adding
    } catch (error) {
      console.error('Error adding baseline:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBaseline(id);
      fetchBaselines(); // Refresh list after deletion
    } catch (error) {
      console.error('Error deleting baseline:', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
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
      <Table sx={{ marginTop: 2 }}>
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
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default BaselineTable;
