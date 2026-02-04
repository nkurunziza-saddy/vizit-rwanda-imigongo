import {
	ArrowLeft01Icon,
	ArrowRight01Icon,
	MoreHorizontalCircle01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			aria-label="pagination"
			data-slot="pagination"
			className={cn("mx-auto flex w-full justify-center", className)}
			{...props}
		/>
	);
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn("flex flex-wrap items-center gap-2", className)}
			{...props}
		/>
	);
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
	return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
	React.ComponentProps<"a">;

function PaginationLink({
	className,
	isActive,
	size = "icon",
	...props
}: PaginationLinkProps) {
	return (
		<Button
			variant={isActive ? "default" : "outline"}
			size={size}
			className={cn(
				isActive && "bg-foreground text-white hover:bg-foreground/90",
				!isActive &&
					"border-transparent bg-transparent hover:border-foreground hover:bg-transparent text-foreground",
				className,
			)}
			render={
				<a
					aria-current={isActive ? "page" : undefined}
					data-slot="pagination-link"
					data-active={isActive}
					{...props}
				/>
			}
		/>
	);
}

function PaginationPrevious({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			className={cn("gap-1 px-4", className)}
			{...props}
		>
			<HugeiconsIcon
				icon={ArrowLeft01Icon}
				strokeWidth={2}
				className="h-4 w-4"
			/>
			<span className="hidden sm:block">Previous</span>
		</PaginationLink>
	);
}

function PaginationNext({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			className={cn("gap-1 px-4", className)}
			{...props}
		>
			<span className="hidden sm:block">Next</span>
			<HugeiconsIcon
				icon={ArrowRight01Icon}
				strokeWidth={2}
				className="h-4 w-4"
			/>
		</PaginationLink>
	);
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn(
				"flex h-9 w-9 items-center justify-center opacity-50",
				className,
			)}
			{...props}
		>
			<HugeiconsIcon
				icon={MoreHorizontalCircle01Icon}
				strokeWidth={2}
				className="h-4 w-4"
			/>
			<span className="sr-only">More pages</span>
		</span>
	);
}

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
