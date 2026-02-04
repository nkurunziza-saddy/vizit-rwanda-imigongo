"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { Vendor } from "@/schemas/vendor.schema";

// Define a type for the actions handler that we might pass via table meta or closure
// For now, we will define columns that might need to be created inside the component if we want direct access to handlers,
// or we can use a custom cell renderer that assumes the parent handles the logic or we pass it down.
// Given the current structure, let's create a definition factory or just export columns and handle actions loosely.

// We will use a meta interface to type the table options if we were passing functions.
// But for simplicity in this "mock" setup, let's just create the display columns.
// The "Actions" column will be defined locally in the Page component or we will create a dedicated component that takes `onApprove` / `onReject` as props if we can.
// Actually, standard practice with TanStack table for actions that need context is to use a Cell component.

export const approvalColumns: ColumnDef<Vendor>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
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
		accessorKey: "businessName",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Business" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex flex-col">
					<span className="font-bold text-foreground">
						{row.getValue("businessName")}
					</span>
					<span className="text-xs text-muted-foreground truncate max-w-[200px] font-serif italic">
						{row.original.bio}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "vendorType",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Type" />
		),
		cell: ({ row }) => {
			return (
				<Badge
					variant="outline"
					className="capitalize rounded font-bold tracking-wider text-[10px] border-foreground/20"
				>
					{((row.getValue("vendorType") as string) || "").replace("_", " ")}
				</Badge>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "contact",
		header: "Contact",
		cell: ({ row }) => {
			return (
				<div className="flex flex-col text-sm font-mono text-xs">
					<span>{row.original.email}</span>
					<span className="text-muted-foreground">{row.original.phone}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const status = (row.getValue("status") as string) || "";
			let variant: "default" | "secondary" | "destructive" | "outline" =
				"outline";
			if (status === "approved") variant = "default";
			if (status === "pending") variant = "secondary";
			if (status === "rejected") variant = "destructive";
			if (status === "under_review") variant = "secondary";

			return (
				<div className="flex w-[100px] items-center">
					<Badge
						variant={variant}
						className="capitalize rounded font-bold text-[10px] tracking-wider"
					>
						{status.replace("_", " ")}
					</Badge>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
];
