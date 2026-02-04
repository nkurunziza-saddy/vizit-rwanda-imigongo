import { cn } from "@/lib/utils";

interface ChapterHeaderProps {
	number: string;
	title: string;
	className?: string;
	theme?: "dark" | "light";
}

export function ChapterHeader({
	number,
	title,
	className,
	theme = "light",
}: ChapterHeaderProps) {
	return (
		<div
			className={cn(
				"container mx-auto px-4 mb-12 md:mb-24 flex items-end gap-4",
				className,
			)}
		>
			<span
				className={cn(
					"text-6xl md:text-9xl font-black font-serif leading-[0.8] opacity-10 select-none",
					theme === "dark" ? "text-white" : "text-foreground",
				)}
			>
				{number}
			</span>
			<div className="flex flex-col pb-2 md:pb-6">
				<span
					className={cn(
						"text-sm font-mono uppercase tracking-widest mb-1",
						theme === "dark" ? "text-primary" : "text-primary",
					)}
				>
					Chapter {number}
				</span>
				<h2
					className={cn(
						"text-2xl md:text-4xl font-bold uppercase tracking-tight",
						theme === "dark" ? "text-white" : "text-foreground",
					)}
				>
					{title}
				</h2>
			</div>

			<div
				className={cn(
					"flex-1 h-px mb-4 md:mb-8 opacity-20",
					theme === "dark" ? "bg-white" : "bg-foreground",
				)}
			/>
		</div>
	);
}
