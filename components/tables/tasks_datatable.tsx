"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Task, TaskPriority, TaskStatus } from "@prisma/client";
import { Pencil, Trash2, Search } from "lucide-react";
import { format } from "date-fns";

export type TasksDataTableProps = {
  data: Task[];
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
};

export default function TasksDataTable({ data, canEdit = true, canDelete = false, onEdit, onDelete }: TasksDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<Task>[]>(
    () => [
      { accessorKey: "title", header: "Task" },
      { accessorKey: "description", header: "Description", cell: ({ row }) => row.original.description ?? "" },
      {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) => (row.original.dueDate ? format(new Date(row.original.dueDate), "MMM d, yyyy") : ""),
      },
      { accessorKey: "priority", header: "Priority", cell: ({ row }) => (row.original.priority as TaskPriority) },
      { accessorKey: "status", header: "Status", cell: ({ row }) => (row.original.status as TaskStatus) },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 justify-start">
            {canEdit && (
              <button
                title="Edit"
                className="px-2 py-1 rounded-md text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => onEdit && onEdit(row.original)}
              >
                <Pencil size={16} />
              </button>
            )}
            {canDelete && (
              <button
                title="Delete"
                className="px-2 py-1 rounded-md text-sm text-destructive hover:opacity-80"
                onClick={() => onDelete && onDelete(row.original.id)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [canEdit, canDelete, onEdit, onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative w-full max-w-xs">
          <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-8 pr-3 py-2 border rounded-md bg-background"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full bg-card text-card-foreground">
          <thead className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className="text-left text-xs font-medium text-muted-foreground px-4 py-2 select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="inline-flex items-center gap-1 cursor-pointer">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{ asc: "▲", desc: "▼" }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center text-sm text-muted-foreground">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

