"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { FoodBank } from "@/app/types/page";

export default function Search() {
  const [apiDatas, setApiDatas] = useState<FoodBank[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/search/get");
        console.log(res.data);
        setApiDatas(res.data as FoodBank[]);
      } catch (error) {
        console.error("Error fetching food banks:", error);
      }
    };
    fetchData();
  }, []);

  // Filter the data based on search input (case insensitive)
  const filteredData = apiDatas.filter((fb) => {
    const lowerSearch = search.toLowerCase();

    return (
      fb.name.toLowerCase().includes(lowerSearch) ||
      fb.address.toLowerCase().includes(lowerSearch) ||
      fb.state.toLowerCase().includes(lowerSearch) ||
      fb.zipCode.toLowerCase().includes(lowerSearch) ||
      fb.phone.toLowerCase().includes(lowerSearch) ||
      fb.email.toLowerCase().includes(lowerSearch)
    );
  });

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 180 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 140 },
    {
      field: "website",
      headerName: "Website",
      width: 200,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      ),
    },
    { field: "state", headerName: "State", width: 120 },
    { field: "zipCode", headerName: "Zip", width: 120 },
    { field: "daysOpen", headerName: "Days Open", width: 140 },
    {
      field: "timeOpen",
      headerName: "Opens",
      width: 120,
      renderCell: (params) =>
        new Date(params.value).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      field: "timeClose",
      headerName: "Closes",
      width: 114,
      renderCell: (params) =>
        params.value
          ? new Date(params.value).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A",
    },
    {
      field: "donate",
      headerName: "Donate",
      width: 120,
      renderCell: (params) => (
        <Link
          href={{
            pathname: `/client/search/${params.row.id}`,
            query: {
              name: params.row.name,
              address: params.row.address,
              email: params.row.email,
              phone: params.row.phone,
              website: params.row.website,
              state: params.row.state,
              zip: params.row.zip,
              daysOpen: params.row.daysOpen,
              opens: params.row.opens,
              closes: params.row.closes,
            },
          }}
          style={{ color: "#1976d2", textDecoration: "underline" }}
        >
          Donate
        </Link>
      ),
    },
  ];

  return (
    <Box sx={{ px: 2, py: 4, display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1536,
          mx: "auto",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Food Bank Directory
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search Food Banks"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(10);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: "12px",
            },
          }}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={filteredData.slice(0, visibleCount)}
            columns={columns}
            hideFooter
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
          />
        </Box>

        {filteredData.length > 0 && (
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "100%",
            }}
          >
            {visibleCount < filteredData.length ? (
              <Button onClick={handleShowMore} variant="outlined">
                Show More
              </Button>
            ) : (
              <Box /> // empty box to balance layout
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
