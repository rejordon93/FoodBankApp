import React from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import AboutUs from "./client/aboutUs/page";
import Search from "./client/search/page";

export default function FBHomePage() {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 6 }}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: { xs: 3, md: 6 },
          borderRadius: 4,
          backgroundColor: "#ffffff",
        }}
      >
        {/* Header */}
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2e3c43" }}
        >
          Food Bank Finder
        </Typography>

        <Typography variant="h6" color="text.secondary" gutterBottom>
          Built with compassion and community care in Seattle
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Mission Section */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="body1" paragraph>
            Welcome to <strong>Foodbank Finder</strong> — a project born from
            the desire to serve others.
          </Typography>

          <Typography variant="body1" paragraph>
            <strong>
              My mission is to help families in Seattle find food resources
            </strong>{" "}
            — whether you&apos;re facing food insecurity or simply need a little
            support, this platform is here to connect you with local help.
          </Typography>

          <Typography variant="body1" paragraph>
            I created this to help people across Seattle easily locate food
            banks and support services. My goal is to ensure that no one goes
            hungry. Whether you&apos;re seeking help, supporting others, or just
            want to get involved, this tool is here to make finding food easier
            for everyone in Seattle.
          </Typography>
        </Box>

        {/* About Us Section */}
        <Box id="about-us" sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ color: "#2e3c43" }}>
            About Us
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <AboutUs />
        </Box>

        {/* Search Section */}
        <Box id="search" sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ color: "#2e3c43" }}>
            Search for Food Banks
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Search />
        </Box>
      </Paper>
    </Box>
  );
}
