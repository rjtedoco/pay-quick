import type { TransactionsResponse } from "@/lib/types/transaction";

export async function fetchTransactions(
  page: number = 1
): Promise<TransactionsResponse> {
  const response = await fetch(`/api/v1/transactions?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized - please log in again");
    }
    throw new Error(`Failed to fetch transactions: ${response.statusText}`);
  }

  return response.json();
}
