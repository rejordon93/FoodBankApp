"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Paper,
} from "@mui/material";

export default function Profile() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasDonated, setHasDonated] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      firstname,
      lastname,
      address,
      hasDonated,
    };
    console.log("Submitted:", formData);
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 500, mx: "auto", mt: 6, p: 4 }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Profile Form
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          label="First Name"
          variant="outlined"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Phone Number"
          type="tel"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />
        <TextField
          label="Date of Birth"
          type="date"
          variant="outlined"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Has Donated?</FormLabel>
          <RadioGroup
            row
            name="hasDonated"
            value={hasDonated}
            onChange={(e) => setHasDonated(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Paper>
  );
}
