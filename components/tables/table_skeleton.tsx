"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton({ columns = 5, rows = 5 }: { columns?: number; rows?: number }) {
  return (
    <div className="rounded-md border overflow-hidden">
      <div className="bg-muted/50 px-4 py-2">
        <Skeleton className="h-4 w-40" />
      </div>
      <div>
        {[...Array(rows)].map((_, r) => (
          <div key={r} className="grid" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {[...Array(columns)].map((__, c) => (
              <div key={c} className="px-4 py-3 border-t">
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

