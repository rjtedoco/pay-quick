import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function TransactionItemSkeleton() {
  return (
    <div className="flex items-center justify-between py-4 px-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function TransactionSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {[1, 2].map((groupIndex) => (
        <Card key={groupIndex}>
          <CardHeader className="pb-0">
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="p-0">
            {[1, 2, 3].map((itemIndex) => (
              <div key={itemIndex}>
                {itemIndex > 1 && <Separator />}
                <TransactionItemSkeleton />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
