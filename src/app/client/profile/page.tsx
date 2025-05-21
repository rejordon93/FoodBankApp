"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ProfileProps } from "@/app/types/page";
import {
  Card,
  Typography,
  CircularProgress,
  Box,
  Stack,
  Button,
  Alert,
  Divider,
  Avatar,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function Profile() {
  const [profileData, setProfileData] = useState<ProfileProps | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get("/api/profile/get");
        if (!res.data) {
          setProfileData(null);
        } else {
          setProfileData(res.data as ProfileProps);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [router]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (!profileData) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={8}
        gap={3}
        px={2}
      >
        <Alert
          severity="warning"
          sx={{
            maxWidth: 480,
            width: "100%",
            fontWeight: 500,
            fontSize: "1rem",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          No profile found. Please update your profile to continue.
        </Alert>
        <Button
          variant="contained"
          size="large"
          onClick={() => router.push("/client/createProfile")}
          sx={{ px: 4, borderRadius: 3 }}
        >
          Update Profile
        </Button>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={8}
      px={2}
      sx={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <Card
        sx={{
          maxWidth: 520,
          width: "100%",
          p: 3,
          borderRadius: 3,
          boxShadow:
            "0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)",
          bgcolor: "#fff",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          mb={2}
          sx={{ borderBottom: "1px solid #e0e0e0", pb: 2 }}
        >
          <Avatar
            sx={{
              bgcolor: deepPurple[500],
              width: 56,
              height: 56,
              fontWeight: "bold",
              fontSize: 24,
              textTransform: "uppercase",
              boxShadow: "0 0 8px rgba(103, 58, 183, 0.3)",
            }}
          >
            {profileData.firstName.charAt(0)}
            {profileData.lastName.charAt(0)}
          </Avatar>
          <Typography variant="h5" fontWeight={600} color="text.primary">
            {profileData.firstName} {profileData.lastName}
          </Typography>
        </Box>

        <Stack spacing={2} divider={<Divider flexItem />} sx={{ mb: 3 }}>
          <Typography variant="body1" color="text.secondary">
            <strong>Email:</strong> {profileData.email}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Phone:</strong> {profileData.phoneNumber || "Not provided"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Date of Birth:</strong> {profileData.dataOfBirth || "N/A"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Donated:</strong> {profileData.hasDonated ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Address:</strong> {profileData.address || "Not provided"}
          </Typography>
        </Stack>

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={() => router.push("/client/createProfile")}
          sx={{
            borderRadius: 3,
            fontWeight: 600,
            bgcolor: deepPurple[600],
            "&:hover": {
              bgcolor: deepPurple[700],
            },
          }}
        >
          Update Profile
        </Button>
      </Card>
    </Box>
  );
}
