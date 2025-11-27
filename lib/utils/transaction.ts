import type { Transaction, TransactionGroup, TransactionType } from "@/lib/types/transaction";

/**
 * Format cents to currency string (e.g., 5000 -> "$50.00")
 */
export function formatAmount(amountInCents: number, currency: string = "USD"): string {
  const dollars = amountInCents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(dollars);
}

/**
 * Format ISO date to readable date string (e.g., "Oct 9, 2025")
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/**
 * Format ISO date to time string (e.g., "10:30 AM")
 */
export function formatTime(isoDate: string): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

/**
 * Get month key for grouping (e.g., "2025-10")
 */
export function getMonthKey(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

/**
 * Get human-readable month label (e.g., "October 2025")
 */
export function getMonthLabel(isoDate: string): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Format transaction type for display
 */
export function formatTransactionType(type: TransactionType): string {
  return type === "TRANSFER" ? "Transfer" : "Top-up";
}

/**
 * Group transactions by month, sorted by most recent first
 */
export function groupTransactionsByMonth(transactions: Transaction[]): TransactionGroup[] {
  const groupMap = new Map<string, { label: string; transactions: Transaction[] }>();

  for (const transaction of transactions) {
    const monthKey = getMonthKey(transaction.created_at);
    const monthLabel = getMonthLabel(transaction.created_at);

    if (!groupMap.has(monthKey)) {
      groupMap.set(monthKey, { label: monthLabel, transactions: [] });
    }
    groupMap.get(monthKey)!.transactions.push(transaction);
  }

  const groups: TransactionGroup[] = Array.from(groupMap.entries())
    .map(([monthKey, { label, transactions }]) => ({
      monthKey,
      monthLabel: label,
      transactions: transactions.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    }))
    .sort((a, b) => b.monthKey.localeCompare(a.monthKey));

  return groups;
}
