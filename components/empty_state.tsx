"use client";

import Link from "next/link";

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="rounded-lg border bg-card p-10 text-center text-muted-foreground">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border">
        {icon}
      </div>
      <h3 className="text-foreground text-lg font-medium">{title}</h3>
      {description && <p className="mt-1">{description}</p>}
      {action && (
        <div className="mt-6">
          <Link href={action.href} className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90">
            {action.label}
          </Link>
        </div>
      )}
    </div>
  );
}

