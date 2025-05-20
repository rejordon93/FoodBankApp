// utils/verifyToken.ts
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface tokenProps {
  id: number;
  email: string;
}

export function verifyToken(request: NextRequest): tokenProps {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    throw new Error("Token not found in cookies");
  }

  if (!process.env.TOKEN_SECRET) {
    throw new Error("TOKEN_SECRET not set in environment variables");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as tokenProps;
    return decoded;
  } catch (error: any) {
    console.error("Token verification failed:", error.message);
    throw new Error("Unauthorized: Invalid or expired token");
  }
}
