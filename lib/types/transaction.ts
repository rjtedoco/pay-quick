export type TransactionType = "TRANSFER" | "TOPUP";

export interface Transaction {
  id: string;
  amount_in_cents: number;
  currency: string;
  type: TransactionType;
  status: string;
  created_at: string;
  destination_id: string;
}

export interface TransactionPagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
}

export interface TransactionsResponse {
  status: string;
  message: string;
  pagination: TransactionPagination;
  data: Transaction[];
}

export interface TransactionGroup {
  monthKey: string;
  monthLabel: string;
  transactions: Transaction[];
}
