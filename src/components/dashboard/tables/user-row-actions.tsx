"use client";

import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { userSchema } from "@/schemas/user.schema";

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const user = userSchema.parse(row.original);

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
				<DropdownMenuItem className="rounded focus:bg-foreground/5 cursor-pointer">
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem className="rounded focus:bg-foreground/5 cursor-pointer">
					Make a copy
				</DropdownMenuItem>
				<DropdownMenuItem className="rounded focus:bg-foreground/5 cursor-pointer">
					Favorite
				</DropdownMenuItem>
				<DropdownMenuSeparator className="bg-foreground/10" />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger className="rounded focus:bg-foreground/5 cursor-pointer">
						Labels
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent className="rounded border-foreground/20">
						<DropdownMenuRadioGroup value={user.role}>
							{["tourist", "vendor", "admin"].map((role) => (
								<DropdownMenuRadioItem
									key={role}
									value={role}
									className="rounded focus:bg-foreground/5 cursor-pointer"
								>
									{role}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator className="bg-foreground/10" />
				<DropdownMenuItem className="rounded text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer">
					Delete
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
