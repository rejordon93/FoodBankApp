import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { verifyToken } from "@/helpers/getToken";

type dataProp = {
  item: string;
  quantity: number;
};

export async function POST(req: NextRequest) {
  try {
    const body: dataProp = await req.json();
    const { item, quantity } = body;

    const token = verifyToken(req);

    if (!token || !token.id) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const userId = token.id;

    const newDonation = await prisma.donation.create({
      data: {
        item,
        quantity,
        userId, // Now this is a number, as expected
      },
    });

    return NextResponse.json(newDonation, { status: 200 });
  } catch (err) {
    console.error("Donation creation error:", err);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
