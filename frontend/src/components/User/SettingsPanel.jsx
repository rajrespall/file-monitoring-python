import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Grid,
} from "@mui/material";

import { getConfig, updateConfig } from "../../services/configService";

const SettingsPanel = () => {
  const [config, setConfig] = useState({
    algorithm: "sha256",
    scan_frequency: "daily"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const data = await getConfig();
      setConfig(data);
    } catch (err) {
      setError("Failed to load configuration");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAlgorithmChange = (event) => {
    setConfig(prev => ({...prev, algorithm: event.target.value}));
  };

  const handleFrequencyChange = (event) => {
    setConfig(prev => ({...prev, scan_frequency: event.target.value}));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateConfig(config);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to update configuration");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f7f7f7",
        borderRadius: 2,
        maxWidth: 500,
        margin: "auto",
        boxShadow: 3,
        mt: 4
      }}
      component={Paper}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
        Configuration Settings
      </Typography>
      <Box mt={2}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Hashing Algorithm</InputLabel>
          <Select
            value={config.algorithm}
            onChange={handleAlgorithmChange}
            variant="outlined"
            disabled={loading}
          >
            <MenuItem value="sha256">SHA-256</MenuItem>
            <MenuItem value="md5">MD5</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mt={2}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Scan Frequency</InputLabel>
          <Select
            value={config.scan_frequency}
            onChange={handleFrequencyChange}
            variant="outlined"
            disabled={loading}
          >
            <MenuItem value="12hrs">Every 12 hrs</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mt={4}>
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ paddingX: 4 }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default SettingsPanel;
