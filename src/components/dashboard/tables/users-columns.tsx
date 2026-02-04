import type { ColumnDef } from "@tanstack/react-table";
import { ActionMenu } from "@/components/dashboard/tables/table-action-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { User } from "@/schemas";

export const userColumns: ColumnDef<User>[] = [
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
		accessorKey: "fullName",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => (
			<div className="w-[150px] font-bold text-foreground truncate">
				{row.getValue("fullName")}
			</div>
		),
		enableSorting: true,
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex w-[200px] truncate text-muted-foreground font-mono text-xs">
					<span className="truncate">{row.getValue("email")}</span>
				</div>
			);
		},
		enableSorting: true,
	},
	{
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Role" />
		),
		cell: ({ row }) => {
			const role = row.getValue("role") as string;
			return (
				<Badge
					variant="outline"
					className="capitalize rounded font-bold tracking-wider text-[10px] border-foreground/20"
				>
					{role}
				</Badge>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "isActive",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const isActive = row.getValue("isActive") as boolean;
			return (
				<Badge
					variant={isActive ? "default" : "secondary"}
					className="rounded font-bold text-[10px] tracking-wider"
				>
					{isActive ? "Active" : "Inactive"}
				</Badge>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Joined" />
		),
		cell: ({ row }) => {
			const date = new Date(row.getValue("createdAt"));
			return (
				<div className="w-[100px] font-mono text-xs">
					{date.toLocaleDateString()}
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <ActionMenu row={row} />,
	},

	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
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
		accessorKey: "fullName",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => (
			<div className="w-[150px] font-medium truncate">
				{row.getValue("fullName")}
			</div>
		),
		enableSorting: true,
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex w-[200px] truncate">
					<span className="truncate">{row.getValue("email")}</span>
				</div>
			);
		},
		enableSorting: true,
	},
	{
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Role" />
		),
		cell: ({ row }) => {
			const role = row.getValue("role") as string;
			return (
				<Badge variant="outline" className="capitalize">
					{role}
				</Badge>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "isActive",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const isActive = row.getValue("isActive") as boolean;
			return (
				<Badge variant={isActive ? "default" : "secondary"}>
					{isActive ? "Active" : "Inactive"}
				</Badge>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Joined" />
		),
		cell: ({ row }) => {
			const date = new Date(row.getValue("createdAt"));
			return <div className="w-[100px]">{date.toLocaleDateString()}</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <ActionMenu row={row} />,
	},
];
