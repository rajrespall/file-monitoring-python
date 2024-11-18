import React, { useEffect, useState } from 'react';
import { 
  Button, Typography, Box, Paper, Grid, Container, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Snackbar, Alert, CircularProgress 
} from '@mui/material';
import ScanIcon from '@mui/icons-material/CameraEnhance';
import { startScan, individualScan, getLatestScan } from '../../services/scanService';

const ScanningPanel = () => {
  const [scanResults, setScanResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  useEffect(() => {
    fetchLatestScan();
  }, []);

  const fetchLatestScan = async () => {
    try {
      setLoading(true);
      const response = await getLatestScan();
      setScanResults(response.results || []);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Error fetching scan results',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleScan = async () => {
    try {
      setLoading(true);
      const response = await startScan();
      setScanResults(response.results);
      setSnackbar({
        open: true,
        message: 'Scan completed successfully',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Error performing scan',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleIndivScan = async (id) => {
    try {
      setLoading(true);
      const response = await individualScan(id);
      setScanResults(response.results);
      setSnackbar({
        open: true,
        message: 'Scan completed successfully',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Error performing scan',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };


  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
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
            sx={{backgroundColor: "#8a7ae3", '&:hover': {
                backgroundColor: '#d6a2e8', 
              }}}
            variant="contained"
            onClick={handleScan}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <ScanIcon />}
          >
            {loading ? 'Scanning...' : 'Start Scan'}
          </Button>
        </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#f0f4fc', borderRadius: 2 }}>
            <TableContainer sx={{ maxHeight: scanResults.length >= 3 ? 300 : 'none' }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#d0a0d2' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>File Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Expected Hash</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Current Hash</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scanResults.map((results, index) => (
                    <TableRow key={index}>
                      <TableCell>{results.filename}</TableCell>
                      <TableCell>
                        <Box sx={{
                          color: results.status === 'unchanged' ? 'green' : 
                                 results.status === 'modified' ? 'red' : 'orange'
                        }}>
                          {results.status}
                        </Box>
                      </TableCell>
                      <TableCell>{results.expected_hash}</TableCell>
                      <TableCell>{results.current_hash}</TableCell>
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