import React, { useState } from "react";
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

const SettingsPanel = () => {
  const [hashingAlgorithm, setHashingAlgorithm] = useState("SHA-256");
  const [scanFrequency, setScanFrequency] = useState("Daily");

  const handleAlgorithmChange = (event) => {
    setHashingAlgorithm(event.target.value);
  };

  const handleFrequencyChange = (event) => {
    setScanFrequency(event.target.value);
  };

  const handleSave = () => {
    alert(`Settings Saved:
    Hashing Algorithm: ${hashingAlgorithm}
    Scan Frequency: ${scanFrequency}`);
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
            value={hashingAlgorithm}
            onChange={handleAlgorithmChange}
            variant="outlined"
          >
            <MenuItem value="SHA-256">SHA-256</MenuItem>
            <MenuItem value="MD5">MD5</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mt={2}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Scan Frequency</InputLabel>
          <Select
            value={scanFrequency}
            onChange={handleFrequencyChange}
            variant="outlined"
          >
            <MenuItem value="Every 12 hrs">Every 12 hrs</MenuItem>
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
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
          >
            Save Settings
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default SettingsPanel;
