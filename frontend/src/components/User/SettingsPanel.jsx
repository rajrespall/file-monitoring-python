import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Paper,
  Grid,
  Snackbar,
  Alert,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import { getConfig, updateConfig } from "../../services/configService";

const SettingsPanel = () => {
  const [config, setConfig] = useState({
    algorithm: "sha256",
    scan_frequency: "daily",
    path: "C:/Users/username/Documents",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
    setConfig((prev) => ({ ...prev, algorithm: event.target.value }));
  };

  const handleFrequencyChange = (event) => {
    setConfig((prev) => ({ ...prev, scan_frequency: event.target.value }));
  };

  const handlePathChange = (event) => {
    setConfig((prev) => ({ ...prev, path: event.target.value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateConfig(config);
      setSuccess(true);
      setSnackbarMessage("Configuration saved successfully!");
      setSnackbarOpen(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to update configuration");
      setSnackbarMessage("Error saving configuration");
      setSnackbarOpen(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#f0f8ff",
        borderRadius: 5,
        maxWidth: 500,
        margin: "auto",
        boxShadow: 10,
        animation: "fadeIn 1s ease-out",
      }}
      component={Paper}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        align="center"
        sx={{
          color: "#8a7ae3",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Configuration Settings
      </Typography>

      <Box mt={2}>
        <FormControl fullWidth>
          <FormLabel
            sx={{
              fontSize: "1rem",
              color: "#8a7ae3",
              fontFamily: "Poppins, sans-serif",
              animation: "fadeIn 1.5s ease-out",
            }}
          >
            Hashing Algorithm
          </FormLabel>
          <RadioGroup
            row
            value={config.algorithm}
            onChange={handleAlgorithmChange}
            sx={{ justifyContent: "center", animation: "fadeIn 1.5s ease-out" }}
          >
            <FormControlLabel
              value="sha256"
              control={
                <Radio
                  sx={{
                    color: "#8a7ae3",
                    "&.Mui-checked": {
                      color: "#8a7ae3",
                    },
                  }}
                />
              }
              label="SHA-256"
              sx={{ fontFamily: "Poppins, sans-serif" }}
            />
            <FormControlLabel
              value="md5"
              control={
                <Radio
                  sx={{
                    color: "#8a7ae3",
                    "&.Mui-checked": {
                      color: "#8a7ae3",
                    },
                  }}
                />
              }
              label="MD5"
              sx={{ fontFamily: "Poppins, sans-serif" }}
            />
          </RadioGroup>
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
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#e3f2fd",
                borderRadius: 2,
              },
              "& .MuiSelect-icon": {
                color: "#8a7ae3",
              },
              "&:hover": {
                backgroundColor: "#c5cae9",
              },
            }}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mt={2}>
        <FormControl fullWidth>
          <TextField
            label="Base Path"
            value={config.path}
            onChange={handlePathChange}
            margin="normal"
            helperText="Enter the full path to monitor files (e.g., C:\\Users\\YourName\\Documents)"
            sx={{ mb: 2 }}
          />
        </FormControl>
      </Box>

      <Box mt={4}>
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{
              paddingX: 4,
              backgroundColor: "#8a7ae3",
              "&:hover": { backgroundColor: "#d6a2e8" },
              fontFamily: "Luckiest Guy, sans-serif",
              textTransform: "none",
              borderRadius: 20,
              boxShadow: 3,
            }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </Grid>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={success ? "success" : "error"}
          sx={{
            width: "100%",
            backgroundColor: success ? "#d1e7dd" : "#f8d7da",
            color: success ? "#155724" : "#721c24",
            borderRadius: 5,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPanel;