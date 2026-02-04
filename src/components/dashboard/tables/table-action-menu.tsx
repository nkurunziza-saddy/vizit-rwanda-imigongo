import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionMenuProps<TData> {
	row: Row<TData>;
	onEdit?: (original: TData) => void;
	onDelete?: (original: TData) => void;
}

export function ActionMenu<TData>({
	row,
	onEdit,
	onDelete,
}: ActionMenuProps<TData>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						variant="ghost"
						className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
					/>
				}
			>
				<MoreHorizontal className="h-4 w-4" />
				<span className="sr-only">Open menu</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="w-[160px] rounded border-foreground/20"
			>
				{onEdit && (
					<DropdownMenuItem
						onClick={() => onEdit(row.original)}
						className="rounded focus:bg-foreground/5 cursor-pointer"
					>
						Edit
					</DropdownMenuItem>
				)}
				<DropdownMenuItem
					onClick={() =>
						navigator.clipboard.writeText(JSON.stringify(row.original))
					}
					className="rounded focus:bg-foreground/5 cursor-pointer"
				>
					Copy Details
				</DropdownMenuItem>
				<DropdownMenuSeparator className="bg-foreground/10" />
				{onDelete && (
					<DropdownMenuItem
						onClick={() => onDelete(row.original)}
						variant="destructive"
					>
						Delete
						<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
