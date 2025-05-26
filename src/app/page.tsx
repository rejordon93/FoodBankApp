import React from "react";
import { Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export default function FBHomePage() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center", // center vertically
        justifyContent: "flex-start", // stick to the left
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box sx={{ ml: { xs: 2, md: 8 } }}>
        {" "}
        {/* slight left offset without using padding */}
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#2e3c43",
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Food Bank Finder
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
        >
          Built with compassion and community care in Seattle
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            px: 4,
            py: 1.5,
            backgroundColor: "#2e3c43",
            color: "#fff",
            textTransform: "uppercase",
            fontWeight: "bold",
            borderRadius: 2,
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#1f2a30",
            },
          }}
          component={Link}
          href="/client/search"
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
}
