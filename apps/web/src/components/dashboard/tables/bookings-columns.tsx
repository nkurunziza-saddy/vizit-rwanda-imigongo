import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { format } from "date-fns";

// We can define the shape of the data here since it's a derived type in the page
type BookingData = {
  id: number;
  booking_id: number;
  listing_title: string;
  customer_name: string;
  customer_email: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
};

export const bookingColumns: ColumnDef<BookingData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        data-state={
          table.getIsAllPageRowsSelected()
            ? "checked"
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : "unchecked"
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "listing_title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Listing" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("listing_title")}</div>;
    },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.customer_name}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.customer_email}
          </span>
        </div>
      );
    },
    accessorFn: (row) => row.customer_name + row.customer_email,
  },
  {
    accessorKey: "dates",
    header: "Dates",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col text-sm">
          <span>
            {format(new Date(row.original.start_date), "MMM d, yyyy")}
          </span>
          <span className="text-muted-foreground text-xs">
            to {format(new Date(row.original.end_date), "MMM d, yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const price = row.getValue("total_price") as number;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let variant: "default" | "secondary" | "destructive" | "outline" =
        "outline";
      if (status === "confirmed") variant = "default";
      if (status === "pending") variant = "secondary";
      if (status === "cancelled") variant = "destructive";

      return (
        <Badge variant={variant} className="capitalize">
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
