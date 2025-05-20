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
  Snackbar,
  Alert,
} from "@mui/material";
import { z } from "zod";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  birth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(1, "Address is required"),
  hasDonated: z.enum(["yes", "no"]),
});

export default function CreateProfile() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasDonated, setHasDonated] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dataOfBirth, setDataOfBirth] = useState("");

  const [successOpen, setSuccessOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = profileSchema.safeParse({
      firstname,
      lastname,
      email,
      phoneNumber,
      dataOfBirth,
      address,
      hasDonated,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      const res = await axios.post("/api/profile/create", {
        firstname,
        lastname,
        address,
        hasDonated,
        phoneNumber,
        dataOfBirth,
        email,
      });
      console.log(res.data);
      router.push("/client/profile");
      setErrors(fieldErrors);
    } else {
      console.log("Submitted:", result.data);
      setErrors({});
      setSuccessOpen(true);
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setDataOfBirth("");
      setAddress("");
      setHasDonated("");
    }
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
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          error={!!errors.firstname}
          helperText={errors.firstname}
        />
        <TextField
          label="Last Name"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          error={!!errors.lastname}
          helperText={errors.lastname}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Phone Number"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          label="Date of Birth"
          type="date"
          value={dataOfBirth}
          onChange={(e) => setDataOfBirth(e.target.value)}
          InputLabelProps={{ shrink: true }}
          error={!!errors.birth}
          helperText={errors.birth}
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={!!errors.address}
          helperText={errors.address}
        />
        <FormControl component="fieldset" error={!!errors.hasDonated}>
          <FormLabel component="legend">Has Donated?</FormLabel>
          <RadioGroup
            row
            value={hasDonated}
            onChange={(e) => setHasDonated(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          {errors.hasDonated && (
            <Typography color="error" variant="caption">
              {errors.hasDonated}
            </Typography>
          )}
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSuccessOpen(false)}>
          Profile created successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
}
