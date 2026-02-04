import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

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
        className="translate-y-[2px] rounded data-[state=checked]:bg-foreground"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] rounded data-[state=checked]:bg-foreground"
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
      return (
        <div className="font-bold text-foreground">
          {row.getValue("listing_title")}
        </div>
      );
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
          <span className="font-bold text-foreground">
            {row.original.customer_name}
          </span>
          <span className="text-xs text-muted-foreground font-mono">
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
        <div className="flex flex-col text-sm font-mono text-xs">
          <span>
            {format(new Date(row.original.start_date), "MMM d, yyyy")}
          </span>
          <span className="text-muted-foreground text-[10px]">
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
      return (
        <div className="font-bold font-mono text-foreground">{formatted}</div>
      );
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
				<Badge
					variant={variant}
					className="capitalize rounded font-bold text-[10px] tracking-wider"
				>
					{status}
				</Badge>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
];
