import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { verifyToken } from "@/helpers/getToken";
// Removed unused import of 'error'

export async function DELETE(req: NextRequest) {
  try {
    const user = verifyToken(req);

    if (!user || !user.email) {
      return NextResponse.json({ message: "Unauthorized" });
    }

    const deletedProfile = await prisma.profile.delete({
      where: { email: user.email },
    });

    return NextResponse.json(
      { message: "Profile deleted", profile: deletedProfile },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Delete error:", (err as Error).message);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
