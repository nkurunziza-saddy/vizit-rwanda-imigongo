import { cn } from "@/lib/utils";

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
	title?: string;
	description?: string;
	children: React.ReactNode;
	align?: "start" | "center" | "end";
	action?: React.ReactNode;
}

function SectionContainer({
	title,
	description,
	children,
	className,
	align = "center",
	action,
	...props
}: SectionContainerProps) {
	return (
		<section
			className={cn(
				"py-24 border-b border-border/40 overflow-hidden",
				className,
			)}
			{...props}
		>
			{(title || description || action) && (
				<div className="container mx-auto px-4 max-w-7xl mb-12">
					<div
						className={cn("flex flex-col gap-4", {
							"md:flex-row md:items-end md:justify-between":
								action && align === "start",
							"items-center text-center": align === "center",
							"items-start text-start": align === "start",
							"items-end text-end": align === "end",
						})}
					>
						<SectionHeader>
							{title && (
								<SectionTitle className="text-sm font-semibold text-foreground/85 uppercase tracking-widest mb-1">
									{title}
								</SectionTitle>
							)}
							{description && (
								<SectionDescription className="text-sm text-muted-foreground tracking-tight">
									{description}
								</SectionDescription>
							)}
						</SectionHeader>
						{action && <div className="shrink-0">{action}</div>}
					</div>
				</div>
			)}
			<div className="container mx-auto px-4 max-w-7xl">{children}</div>
		</section>
	);
}

function SectionTitle({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			className="text-sm font-semibold text-foreground/85 uppercase tracking-widest mb-1"
			{...props}
		/>
	);
}

function SectionDescription({
	className,
	...props
}: React.ComponentProps<"h2">) {
	return (
		<h2 className="text-sm text-muted-foreground tracking-tight" {...props} />
	);
}

function SectionHeader({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn(className)} {...props} />;
}

export { SectionContainer, SectionTitle, SectionDescription, SectionHeader };
