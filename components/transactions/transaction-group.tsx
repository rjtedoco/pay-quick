import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TransactionItem } from "./transaction-item";
import type { TransactionGroup as TransactionGroupType } from "@/lib/types/transaction";

interface TransactionGroupProps {
  group: TransactionGroupType;
}

export function TransactionGroup({ group }: TransactionGroupProps) {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-medium text-muted-foreground">
          {group.monthLabel}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {group.transactions.map((transaction, index) => (
          <div key={transaction.id}>
            {index > 0 && <Separator />}
            <TransactionItem transaction={transaction} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
