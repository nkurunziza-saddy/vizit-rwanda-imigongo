import { cn } from "@/lib/utils";

export function PageWrapper({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
