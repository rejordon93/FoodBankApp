import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { verifyToken } from "@/helpers/getToken";
import { z } from "zod";

// ✅ Define the schema
const updateProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(7),
  dataOfBirth: z.string(),
  hasDonated: z.string(),
  address: z.string().min(1),
});

export async function PUT(req: NextRequest) {
  try {
    const user = verifyToken(req);
    if (!user || !user.email) {
      return NextResponse.json({ message: "No User" }, { status: 401 });
    }

    const body = await req.json();

    // ✅ Validate input
    const validatedData = updateProfileSchema.parse(body);

    const updatedProfile = await prisma.profile.update({
      where: {
        email: user.email,
      },
      data: validatedData,
    });

    return NextResponse.json(updatedProfile);
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: err.errors },
        { status: 400 }
      );
    }

    console.error("Update error:", (err as Error).message);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
