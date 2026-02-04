import type React from "react";
import { cn } from "@/lib/utils";

export function ImigongoHeading({
	className,
	as: Component = "h2",
	...props
}: React.ComponentProps<"h1"> & {
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) {
	return (
		<Component
			className={cn(
				"font-black uppercase tracking-tighter text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export function ImigongoText({
	className,
	as: Component = "p",
	...props
}: React.ComponentProps<"p"> & { as?: any }) {
	// Using any for 'as' to allow other tags like span/div
	return <Component className={cn("text-foreground", className)} {...props} />;
}

export function ImigongoLabel({
	className,
	children,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"text-[10px] font-mono text-primary uppercase tracking-widest",
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
}
