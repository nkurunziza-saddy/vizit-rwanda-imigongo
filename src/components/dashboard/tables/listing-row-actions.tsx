"use client";

import type { Row } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Listing } from "@/schemas";
import { DB_KEYS } from "@/utils/mock-db";

interface ListingRowActionsProps<TData> {
	row: Row<TData>;
}

export function ListingRowActions<TData>({
	row,
}: ListingRowActionsProps<TData>) {
	const listing = row.original as Listing;

	const handleDelete = () => {
		if (confirm("Are you sure you want to delete this listing?")) {
			const stored = localStorage.getItem(DB_KEYS.LISTINGS);
			if (stored) {
				const listings = JSON.parse(stored);
				const updated = listings.filter((l: any) => l.id !== listing.id);
				localStorage.setItem(DB_KEYS.LISTINGS, JSON.stringify(updated));
				toast.success("Listing deleted");
				window.location.reload();
			}
		}
	};

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
			<DropdownMenuContent align="end" className="w-[160px]">
				<DropdownMenuItem>
					<Edit className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Edit
				</DropdownMenuItem>
				<DropdownMenuSeparator className="bg-foreground/10" />
				<DropdownMenuItem
					onClick={handleDelete}
					className="text-red-600 focus:text-red-600 focus:bg-red-50 rounded cursor-pointer"
				>
					<Trash2 className="mr-2 h-3.5 w-3.5" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
