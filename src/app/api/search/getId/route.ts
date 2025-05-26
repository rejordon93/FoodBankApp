// src/app/api/search/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } } // <- make sure it's string
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const findId = await prisma.foodBank.findFirst({
    where: {
      id,
    },
  });

  if (!findId) {
    return NextResponse.json({ message: "No UserId" }, { status: 404 });
  }

  return NextResponse.json(findId);
}
