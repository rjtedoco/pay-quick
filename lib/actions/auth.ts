"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { setAuthCookies, clearAuthCookies } from "@/lib/auth/cookies";
import { DEFAULT_LOGIN_REDIRECT, LOGIN_PATH } from "@/lib/config/routes";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

interface LoginResponse {
  status: string;
  message: string;
  data: {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    user: {
      user_id: string;
      full_name: string;
      email: string;
    };
  };
}

interface LoginActionResult {
  error?: string;
}

export async function loginAction(
  prevState: LoginActionResult | null,
  formData: FormData
): Promise<LoginActionResult> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(rawData);

  if (!result.success) {
    const firstError = result.error.issues[0];
    return { error: firstError.message };
  }

  const { email, password } = result.data;

  try {
    const response = await fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return { error: "Invalid email or password" };
      }
      return { error: "Login failed. Please try again." };
    }

    const data: LoginResponse = await response.json();

    // Store tokens in httpOnly cookies
    await setAuthCookies(
      data.data.access_token,
      data.data.refresh_token,
      data.data.expires_in
    );
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Unable to connect to server. Please try again." };
  }

  redirect(DEFAULT_LOGIN_REDIRECT);
}

export async function logoutAction(): Promise<void> {
  await clearAuthCookies();
  redirect(LOGIN_PATH);
}
