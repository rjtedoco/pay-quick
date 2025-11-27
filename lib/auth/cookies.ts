import { cookies } from "next/headers";

const TOKEN_NAME = "access_token";
const REFRESH_TOKEN_NAME = "refresh_token";

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
  expiresIn: number
) {
  const cookieStore = await cookies();

  // Set access token
  cookieStore.set(TOKEN_NAME, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: expiresIn,
    path: "/",
  });

  // Set refresh token
  cookieStore.set(REFRESH_TOKEN_NAME, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: expiresIn * 2,
    path: "/",
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
  cookieStore.delete(REFRESH_TOKEN_NAME);
}
