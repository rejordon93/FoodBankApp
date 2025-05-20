"use client";

import { useSearchParams } from "next/navigation";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Link,
  Box,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const full_address = searchParams.get("full_address");
  const description = searchParams.get("description");
  const details_url = searchParams.get("details_url");
  const state_abbreviation = searchParams.get("state_abbreviation");
  const type = searchParams.get("type");
  const website = searchParams.get("website");
  const zipcode = searchParams.get("zipcode");
  const business_hours = searchParams.get("business_hours");

  const reuter = useRouter();

  const handleButton = () => {
    reuter.push("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {name || "No Name Provided"}
          </Typography>

          <Typography variant="body1" color="text.secondary" gutterBottom>
            {description || "No Description"}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Address</Typography>
            <Typography variant="body2">{full_address}</Typography>

            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              State
            </Typography>
            <Typography variant="body2">{state_abbreviation}</Typography>

            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Zip Code
            </Typography>
            <Typography variant="body2">{zipcode}</Typography>

            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Type
            </Typography>
            <Typography variant="body2">{type}</Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Business_hours
            </Typography>
            <Typography variant="body2">{business_hours}</Typography>

            {website && (
              <>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  Website
                </Typography>
                <Link
                  href={website}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                >
                  {website}
                </Link>
              </>
            )}

            {details_url && (
              <>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  Details
                </Typography>
                <Link
                  href={details_url}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                >
                  View More
                </Link>
                <Button onClick={handleButton}> Back</Button>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
