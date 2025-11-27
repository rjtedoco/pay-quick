import { TransactionList } from "@/components/transactions/transaction-list";

export default function TransactionsPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>
      <TransactionList />
    </>
  );
}
