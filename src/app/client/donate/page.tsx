"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Container,
  Paper,
  Alert,
  Collapse,
} from "@mui/material";
import axios from "axios";

export default function Donate() {
  const [item, setItem] = useState<string>("");
  const [quantity, setQuantity] = useState<number>();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(false); // Reset before new attempt

    try {
      const res = await axios.post("/api/donations/create", {
        item,
        quantity,
      });

      console.log(res.data);

      // Show success message
      setShowSuccess(true);
      setItem("");
      setQuantity(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Donate Food Item
        </Typography>

        <Collapse in={showSuccess}>
          <Alert
            severity="success"
            onClose={() => setShowSuccess(false)}
            sx={{ mb: 2 }}
          >
            Thanks for your donation!
          </Alert>
        </Collapse>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Enter food to donate"
            placeholder="e.g. Potatoes"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            variant="outlined"
            margin="normal"
          />

          <TextField
            fullWidth
            label="Quantity"
            type="number"
            placeholder="Enter quantity"
            value={quantity ?? ""}
            onChange={(e) => setQuantity(Number(e.target.value))}
            variant="outlined"
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit Donation
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
