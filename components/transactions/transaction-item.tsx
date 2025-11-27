import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Transaction } from "@/lib/types/transaction";
import {
  formatAmount,
  formatDate,
  formatTime,
  formatTransactionType,
} from "@/lib/utils/transaction";

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isTransfer = transaction.type === "TRANSFER";
  const formattedAmount = formatAmount(
    transaction.amount_in_cents,
    transaction.currency
  );
  const signedAmount = isTransfer
    ? `-${formattedAmount}`
    : `+${formattedAmount}`;

  return (
    <div className="flex items-center justify-between py-4 px-6">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full text-lg",
            isTransfer
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
          )}
        >
          {isTransfer ? "↗" : "↙"}
        </div>
        <div>
          <p className="font-medium text-sm">
            {formatTransactionType(transaction.type)}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDate(transaction.created_at)} at{" "}
            {formatTime(transaction.created_at)}
          </p>
        </div>
      </div>

      <div className="text-right flex flex-col items-end gap-1">
        <p
          className={cn(
            "font-semibold",
            isTransfer
              ? "text-foreground"
              : "text-green-600 dark:text-green-400"
          )}
        >
          {signedAmount}
        </p>
        <Badge variant="secondary" className="text-xs capitalize">
          {transaction.status.toLowerCase()}
        </Badge>
      </div>
    </div>
  );
}
