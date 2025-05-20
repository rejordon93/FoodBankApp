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
import { z } from "zod";

// Zod schema for validation
const searchSchema = z.object({
  city: z.string().min(1, "City is required"),
  state: z
    .string()
    .min(2, "State should be 2 letters")
    .max(2, "State should be 2 letters"),
});

// Capitalize function
const capitalizeFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

export default function Search() {
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [errors, setErrors] = useState<{ city?: string; state?: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedCity = capitalizeFirstLetter(city.trim());
    const formattedState = state.trim().toUpperCase();

    const validation = searchSchema.safeParse({
      city: formattedCity,
      state: formattedState,
    });

    if (!validation.success) {
      const fieldErrors: { city?: string; state?: string } = {};
      validation.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof fieldErrors;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      const res = await axios.get("/api/search", {
        params: { city: formattedCity, state: formattedState },
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
            error={!!errors.city}
            helperText={errors.city}
            fullWidth
          />
          <TextField
            label="State (e.g., WA)"
            variant="outlined"
            value={state}
            onChange={(e) => setState(e.target.value)}
            error={!!errors.state}
            helperText={errors.state}
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
                  <Typography>
                    Would you like to:
                    <Link
                      href={{
                        pathname: `/client/search/${item.id}`,
                        query: {
                          name: item.name,
                          full_address: item.full_address,
                          description: item.description,
                          details_url: item.details_url,
                          state_abbreviation: item.state_abbreviation,
                          type: item.type,
                          website: item.website,
                          zipcode: item.zipcode,
                          business_hours: item.business_hours,
                        },
                      }}
                    >
                      Donate
                    </Link>
                  </Typography>
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
