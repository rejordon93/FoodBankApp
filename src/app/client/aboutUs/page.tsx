import React from "react";
import { Box, Typography } from "@mui/material";

export default function AboutUs() {
  return (
    <Box
      sx={{
        paddingTop: 6,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        About This Project
      </Typography>

      <Typography variant="body1" paragraph>
        Hi, I&apos;m <strong>Ethan</strong> — a self-taught developer and
        someone who truly cares about the people in my community. I created this
        app because I believe everyone deserves access to food, and finding help
        should be simple and stigma-free.
      </Typography>

      <Typography variant="body1" paragraph>
        As I’ve been learning to code, I wanted to use my growing skills for
        something meaningful. That’s when the idea for{" "}
        <strong>Foodbank Finder</strong> was born — a project dedicated to
        helping families and individuals across Seattle locate nearby food banks
        and get the support they need.
      </Typography>

      <Typography variant="body1" paragraph>
        This app is more than just a school project or coding exercise —
        it&apos;s a way for me to give back. I’ve seen firsthand how difficult
        it can be to find resources when you&apos;re struggling, and I hope this
        tool can make that process easier for anyone in need.
      </Typography>

      <Typography variant="body1" paragraph>
        Thank you for visiting. Whether you&apos;re looking for help, want to
        volunteer, or are simply spreading the word — I appreciate you being
        here.
      </Typography>
    </Box>
  );
}
