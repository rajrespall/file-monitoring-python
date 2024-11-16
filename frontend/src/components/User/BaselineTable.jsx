import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Box, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

const BaselineTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      filename: 'file1.txt',
      path: '/files/file1.txt',
      algorithm: 'MD5',
      status: 'Active',
    },
    {
      id: 2,
      filename: 'file2.pdf',
      path: '/files/file2.pdf',
      algorithm: 'SHA-256',
      status: 'Onboarding',
    },
    {
      id: 3,
      filename: 'image.jpg',
      path: '/images/image.jpg',
      algorithm: 'MD5',
      status: 'Awaiting',
    },
  ]);

  const handleAddBaseline = () => {
    console.log('Add Baseline clicked');
  };

  const handleScan = (id) => {
    console.log(`Scan clicked for ID: ${id}`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Baseline Configuration
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAddBaseline}
        sx={{ marginBottom: 2 }}
      >
        Add Baseline
      </Button>

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
              <TableCell>{row.filename}</TableCell>
              <TableCell>{row.path}</TableCell>
              <TableCell>{row.algorithm}</TableCell>
              <TableCell>
                {/* <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleScan(row.id)}
                >
                  Scan
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default BaselineTable;
