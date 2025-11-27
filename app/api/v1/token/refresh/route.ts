import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/auth/cookies";

const BACKEND_URL = process.env.API_URL || "http://localhost:3000";

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      { status: "error", message: "No tokens available" },
      { status: 401 }
    );
  }

  const response = await fetch(`${BACKEND_URL}/api/v1/token/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { status: "error", message: "Token refresh failed" },
      { status: 401 }
    );
  }

  const data = await response.json();

  // Update cookies with new tokens
  await setAuthCookies(
    data.data.access_token,
    data.data.refresh_token,
    data.data.expires_in
  );

  return NextResponse.json(data);
}
