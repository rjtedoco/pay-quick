import { NextRequest, NextResponse } from "next/server";
import { authenticatedFetch } from "@/lib/api/bff-client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";

  const response = await authenticatedFetch(`/api/v1/transactions?page=${page}`);

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
