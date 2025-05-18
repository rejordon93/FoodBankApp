import React from "react";
import { Box, Typography } from "@mui/material";

export default function FBHomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        padding: 4,
        gap: 4,
      }}
    >
      {/* Left: Text Content */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Food Bank Finder
        </Typography>

        <Typography variant="body1" paragraph>
          Welcome to <strong>Foodbank Finder</strong> — a project built from
          compassion and community care in Seattle.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>
            My mission is to help families in Seattle find food resources
          </strong>{" "}
          — whether you're facing food insecurity or simply need a little
          support, this platform is here to connect you with local help.
        </Typography>

        <Typography variant="body1" paragraph>
          I created this to help people across Seattle easily locate food banks
          and support services. My goal is to ensure that no one goes hungry.
          Whether you're seeking help, supporting others, or just want to get
          involved, this tool is here to make finding food easier for everyone
          in Seattle.
        </Typography>
      </Box>

      {/* Right: Image */}
      <Box
        component="img"
        src="/images/foodbank-help.jpg" // Replace with your image path
        alt="Helping hand with food"
        sx={{
          flex: 1,
          maxWidth: "100%",
          borderRadius: 2,
          boxShadow: 3,
        }}
      />
    </Box>
  );
}
