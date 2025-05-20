import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { verifyToken } from "@/helpers/getToken";
import { z } from "zod";

// ✅ Define schema with Zod
const profileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(7),
  dataOfBirth: z.string(),
  hasDonated: z.string(),
  address: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const user = verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: "No user logged in" }, { status: 401 });
    }

    const json = await req.json();

    // ✅ Validate input
    const parsed = profileSchema.parse(json);

    const existingProfile = await prisma.profile.findUnique({
      where: { email: parsed.email },
    });

    if (existingProfile) {
      return NextResponse.json(
        { error: "Profile already exists" },
        { status: 400 }
      );
    }

    const newProfile = await prisma.profile.create({
      data: parsed,
    });

    return NextResponse.json(newProfile, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.errors },
        { status: 400 }
      );
    }

    console.error("Something went wrong:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
