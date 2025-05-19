"use client";
import React, { useState } from "react";
import axios from "axios";
import { SearchResult } from "@/app/types/page";
import Link from "next/link";
import {
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Box,
} from "@mui/material";

export default function Search() {
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.get("/api/search", {
        params: { city, state },
      });
      setResults(res.data as SearchResult[]);
    } catch (err) {
      console.error("Search failed", err);
    }

    setCity("");
    setState("");
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Search for Food Banks
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="City"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
          />
          <TextField
            label="State (e.g., WA)"
            variant="outlined"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Search
          </Button>
        </Box>
      </form>

      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Results
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {results.map((item, index) => (
              <Card key={index} variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.name || "No name available"}
                  </Typography>
                  <Typography>
                    <strong>Address:</strong> {item.full_address}
                  </Typography>
                  {item.business_hours && (
                    <Typography>
                      <strong>Hours:</strong> {item.business_hours}
                    </Typography>
                  )}
                  {item.description && (
                    <Typography>
                      <strong>Description:</strong> {item.description}
                    </Typography>
                  )}
                  {item.website && (
                    <Typography>
                      <strong>Website:</strong>{" "}
                      <Link
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.website}
                      </Link>
                    </Typography>
                  )}
                  {item.details_url && (
                    <Typography>
                      <strong>More Info:</strong>{" "}
                      <Link
                        href={item.details_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Details
                      </Link>
                    </Typography>
                  )}
                  {item.type && (
                    <Typography>
                      <strong>Type:</strong> {item.type}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {results.length === 0 && (
        <Typography variant="body2" color="text.secondary" mt={3}>
          No results yet. Please enter a city and state to begin your search.
        </Typography>
      )}
    </Box>
  );
}
