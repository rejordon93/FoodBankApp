import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { verifyToken } from "@/helpers/getToken";

export async function GET(req: NextRequest) {
  try {
    const user = verifyToken(req);

    if (!user) {
      return NextResponse.json({ message: "No User in Db" }, { status: 401 });
    }

    const data = await prisma.foodBank.findMany({});

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
