import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city") || "";
  const state = req.nextUrl.searchParams.get("state") || "";

  const options = {
    method: "GET",
    url: "https://homeless-shelters-and-foodbanks-api.p.rapidapi.com/resources",
    params: {
      city,
      state,
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
      "X-RapidAPI-Host": "homeless-shelters-and-foodbanks-api.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
