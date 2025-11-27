"use client";

import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/lib/api/transactions";
import { groupTransactionsByMonth } from "@/lib/utils/transaction";
import { TransactionGroup } from "./transaction-group";
import { TransactionSkeleton } from "./transaction-skeleton";

export function TransactionList() {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["transactions"],
    queryFn: ({ pageParam }) => fetchTransactions(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.current_page < lastPage.pagination.total_pages
        ? lastPage.pagination.current_page + 1
        : undefined,
  });

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <TransactionSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">
          {error instanceof Error
            ? error.message
            : "Failed to load transactions"}
        </p>
      </div>
    );
  }

  const allTransactions = data?.pages.flatMap((page) => page.data) ?? [];
  const groups = groupTransactionsByMonth(allTransactions);

  if (groups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <TransactionGroup key={group.monthKey} group={group} />
      ))}

      {/* Sentinel */}
      <div ref={sentinelRef} className="h-4" />

      {/* Loading */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span className="text-sm">Loading more...</span>
          </div>
        </div>
      )}

      {/* End */}
      {!hasNextPage && groups.length > 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">No more transactions</p>
        </div>
      )}
    </div>
  );
}
