import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { AccountBalance } from "@mui/icons-material";
import Link from "next/link";

export default function NavBar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo and title */}
        <Link href="/" passHref>
          <Box sx={{ display: "flex", alignItems: "center", color: "black" }}>
            <IconButton sx={{ color: "black" }}>
              <AccountBalance fontSize="large" />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 1 }}>
              FoodBank+
            </Typography>
          </Box>
        </Link>

        {/* Right: Navigation */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            href="/client/login"
            sx={{ color: "black", textTransform: "none" }}
          >
            Login
          </Button>
          <Button
            component={Link}
            href="/client/profile"
            sx={{ color: "black", textTransform: "none" }}
          >
            Profile
          </Button>

          <Button
            component={Link}
            href="/client/search"
            sx={{ color: "black", textTransform: "none" }}
          >
            Search
          </Button>

          <Button
            component={Link}
            href="/client/donate"
            sx={{ color: "black", textTransform: "none" }}
          >
            Donate
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
