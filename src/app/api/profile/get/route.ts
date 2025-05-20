import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { verifyToken } from "@/helpers/getToken";

export async function GET(req: NextRequest) {
  const userId = await verifyToken(req);

  if (!userId || !userId.email) {
    return NextResponse.json({ message: "No User" }, { status: 401 });
  }

  const existingUser = await prisma.profile.findUnique({
    where: { email: userId.email },
  });

  if (!existingUser) {
    return NextResponse.json({ message: "No existing User" }, { status: 404 });
  }

  return NextResponse.json(existingUser, { status: 200 });
}
