import { cookies } from "next/headers";
import { setAuthCookies } from "@/lib/auth/cookies";

const BACKEND_URL = process.env.API_URL || "http://localhost:3000";

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: {
    user_id: string;
    full_name: string;
    email: string;
  };
}

interface RefreshResponse {
  status: string;
  message: string;
  data: TokenResponse;
}

/**
 * Refresh the access token using the refresh token.
 * Returns new tokens on success, null on failure.
 */
async function refreshAccessToken(
  accessToken: string,
  refreshToken: string
): Promise<TokenResponse | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/token/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      return null;
    }

    const data: RefreshResponse = await response.json();
    return data.data;
  } catch {
    return null;
  }
}

/**
 * Make an authenticated fetch request to the backend.
 * Automatically handles token refresh on 401 responses.
 */
export async function authenticatedFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken) {
    return new Response(
      JSON.stringify({ status: "error", message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const url = `${BACKEND_URL}${path}`;

  // First attempt with current token
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // If 401 and we have a refresh token, try to refresh
  if (response.status === 401 && refreshToken) {
    const newTokens = await refreshAccessToken(accessToken, refreshToken);

    if (newTokens) {
      // Update cookies with new tokens
      await setAuthCookies(
        newTokens.access_token,
        newTokens.refresh_token,
        newTokens.expires_in
      );

      // Retry with new token
      return fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
          Authorization: `Bearer ${newTokens.access_token}`,
        },
      });
    }
  }

  return response;
}

