"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { donateCartProps } from "@/app/types/page";

export default function DonateCart() {
  const [item, setItem] = useState<string>("");
  const [result, setResult] = useState<donateCartProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // <-- Loading state

  interface DonationApiResponse {
    hits: donateCartProps[];
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // <-- Start loading

    try {
      const res = await axios.get<DonationApiResponse>(
        "/api/donations/donationApi",
        {
          params: { item },
        }
      );
      setResult(res.data.hits);
    } catch (err) {
      console.error("Search failed", err);
      setError("Failed to fetch item.");
    } finally {
      setLoading(false); // <-- Stop loading in both success/error
    }

    setItem("");
  };

  return (
    <Box maxWidth="lg" mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Donate an Item
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2} alignItems="center">
          <TextField
            label="Enter an item to donate"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            sx={{ width: "100%", maxWidth: 400 }}
            disabled={loading} // disable input while loading
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Search
          </Button>
        </Stack>
      </form>

      {loading && (
        <Box mt={3} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {result && !loading && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Search Results: pick what is closest to what you have
          </Typography>

          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
            gap={2}
          >
            {result.map((item, index) => {
              const imageUrl =
                item.image || item.images?.[0]?.url || "/placeholder.png";

              return (
                <Card
                  key={index}
                  sx={{
                    flex: "1 1 calc(33.333% - 16px)",
                    maxWidth: "calc(33.333% - 16px)",
                    boxShadow: 3,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: 6,
                    },
                  }}
                >
                  {imageUrl && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={imageUrl}
                      alt={item.name || "Product image"}
                    />
                  )}
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {item.name || "No name"}
                    </Typography>
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {item.shortDescription
                        ? item.shortDescription
                            .replace(/<\/?li>/g, "")
                            .replace(/<\/?p>/g, "")
                            .replace(/\n/g, " ")
                        : "No description available."}
                    </Typography>
                    <Box display="flex" justifyContent="flex-start" mt={2}>
                      <Button
                        variant="contained"
                        sx={{
                          transition: "background-color 0.3s",
                          "&:hover": {
                            backgroundColor: "primary.dark",
                          },
                        }}
                      >
                        ADD
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}
