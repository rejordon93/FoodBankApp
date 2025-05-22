import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const item = req.nextUrl.searchParams.get("item") || "";

  const options = {
    method: "GET",
    url: "https://grocery-pricing-api.p.rapidapi.com/searchGrocery",
    params: {
      keyword: item,
      perPage: "9",
      page: "1",
    },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY2!,
      "x-rapidapi-host": "grocery-pricing-api.p.rapidapi.com",
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
