import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Card({
	className,
	size = "default",
	...props
}: ComponentProps<"div"> & { size?: "default" | "sm" }) {
	return (
		<div
			data-slot="card"
			data-size={size}
			className={cn(
				"flex flex-col gap-6 border-2 border-foreground bg-card p-6 text-card-foreground shadow-[4px_4px_0px_0px_currentColor] transition-shadow hover:shadow-[6px_6px_0px_0px_currentColor]",
				className,
			)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn("flex flex-col space-y-1.5", className)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn(
				"text-2xl font-black uppercase tracking-tighter leading-none text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-sm text-muted-foreground font-serif", className)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
	return (
		<div data-slot="card-content" className={cn("", className)} {...props} />
	);
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn("flex items-center pt-0", className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn("ml-auto", className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
	CardAction,
};
