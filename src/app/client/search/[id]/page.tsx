"use client";

import { useSearchParams, useParams } from "next/navigation";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import Donate from "../../donate/page";
import Link from "next/link";

export default function SearchId() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params.id;
  const name = searchParams.get("name");
  const address = searchParams.get("address");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const website = searchParams.get("website");
  const state = searchParams.get("state");
  const daysOpen = searchParams.get("daysOpen");

  console.log(id);
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {/* Info Section */}
          <Box sx={{ flex: 1, minWidth: "300px" }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Food Bank Info
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Info label="Name" value={name} />
              <Info label="Address" value={address} />
              <Info label="Email" value={email} />
              <Info label="Phone" value={phone} />
              <Info label="Website" value={website} />
              <Info label="State" value={state} />
              <Info label="Days Open" value={daysOpen} />
            </CardContent>
          </Box>

          {/* Donate Section */}
          <Box sx={{ flex: 1, minWidth: "300px", mt: 3 }}>
            <Typography variant="h5" gutterBottom>
              Donate
            </Typography>
            <Donate />
          </Box>
        </Box>
        <Button>
          <Link href="/profile">Finished</Link>{" "}
        </Button>
      </Card>
    </Container>
  );
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        {value || "N/A"}
      </Typography>
    </Box>
  );
}
