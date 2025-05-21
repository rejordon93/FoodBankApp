import { NextResponse } from "next/server";
import prisma from "@/database/prisma";

export async function GET() {
  // const user = await verifyToken(req);

  const find = await prisma.profile.findFirst({
    select: {
      email: true,
    },
  });

  const newFind = await prisma.profile.findUnique({
    where: {
      email: find?.email,
    },
  });
  return NextResponse.json(newFind, { status: 200 });
}
