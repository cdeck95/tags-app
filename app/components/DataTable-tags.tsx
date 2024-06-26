// src/components/DataTable.tsx

"use client";
import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { EnhancedLeaderboardEntry, LeaderboardEntry } from "../types";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps {
  columns: ColumnDef<EnhancedLeaderboardEntry>[];
  data: EnhancedLeaderboardEntry[];
  sort?: string;
  loading: boolean;
  qualiferCount: number;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  sort,
  loading,
  qualiferCount,
}) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const initialSorting: SortingState = sort
    ? [
        {
          id: "id", // Assuming you want to sort by "ID"
          desc: sort === "desc", // If `sort` is "desc", set `desc` to true; otherwise false
        },
      ]
    : [];
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: false,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // Modify the getRowClassName function or create a similar utility to include the qualifier class
  const getRowClassName = (position: number) => {
    if (position >= 1 && position <= 3) {
      return `podium-${position}`; // existing podium classes
    } else if (position <= qualiferCount) {
      return "qualifier"; // new qualifier class for positions 4 to 16
    }
    return ""; // default, no additional class
  };

  return (
    <div className="space-y-4 px-4" style={{ maxWidth: "93dvw" }}>
      <DataTableToolbar searchName={"name"} table={table} />
      <div className="rounded-md border">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {/* {loading ? (
            <Skeleton className="h-80 w-full p-4 m-4" />
          ) : ( */}
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-80 w-full p-4 m-4"
                >
                  <Skeleton className="h-80 p-4 m-4" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={getRowClassName(row.original.position)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {/* )} */}
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};
