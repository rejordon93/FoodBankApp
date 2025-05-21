import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { verifyToken } from "@/helpers/getToken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      dataOfBirth,
      hasDonated,
      address,
    } = body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !dataOfBirth ||
      !hasDonated ||
      !address
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: "No user logged in" }, { status: 401 });
    }

    const existingProfile = await prisma.profile.findUnique({
      where: { email },
    });

    if (existingProfile) {
      return NextResponse.json(
        { error: "Profile already exists" },
        { status: 400 }
      );
    }

    const newProfile = await prisma.profile.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        dataOfBirth,
        hasDonated,
        address,
        userId: user.id,
      },
    });

    return NextResponse.json(newProfile, { status: 201 });
  } catch (error) {
    console.error("Something went wrong:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
