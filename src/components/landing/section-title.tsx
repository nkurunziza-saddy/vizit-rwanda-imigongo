import type React from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { PatternHorizontalDiamonds } from "../ui/patterns";

interface SectionTitleProps {
	title: React.ReactNode;
	className?: string;
	subtitle?: string;
	align?: "center" | "left";
	theme?: "light" | "dark";
	tooltip?: React.ReactNode;
}

export function SectionTitle({
	title,
	className,
	subtitle,
	align = "center",
	theme = "light",
	tooltip,
}: SectionTitleProps) {
	const isCentered = align === "center";
	const isDark = theme === "dark";

	const PatternIcon = (
		<PatternHorizontalDiamonds
			className={cn(
				"w-12 h-6 shrink-0 hidden md:block transition-transform hover:scale-105",
				isDark ? "text-primary" : "text-primary",
				tooltip ? "cursor-help" : "",
			)}
		/>
	);

	return (
		<div
			className={cn(
				"mb-12",
				isCentered ? "text-center" : "text-left",
				className,
			)}
		>
			<div
				className={cn(
					"flex items-center gap-3 mb-3",
					isCentered ? "justify-center" : "justify-start",
				)}
			>
				<TooltipProvider>
					{tooltip ? (
						<Tooltip>
							<TooltipTrigger>
								<div className="cursor-help ml-2 inline-flex align-middle">
									<PatternHorizontalDiamonds className="w-8 h-4 text-primary" />
								</div>
							</TooltipTrigger>
							<TooltipContent
								className={cn(
									"border border-primary p-4 max-w-xs shadow-xl rounded",
									isDark
										? "bg-white text-foreground"
										: "bg-foreground text-white",
								)}
							>
								{tooltip}
							</TooltipContent>
						</Tooltip>
					) : (
						PatternIcon
					)}
				</TooltipProvider>

				<h2
					className={cn(
						"text-3xl md:text-4xl font-black uppercase tracking-tighter px-4",
						isDark ? "text-white" : "text-foreground",
					)}
				>
					{title}
				</h2>

				{isCentered && (
					<TooltipProvider>
						{tooltip ? (
							<Tooltip>
								<TooltipTrigger>
									<PatternHorizontalDiamonds className="w-8 h-4 text-primary cursor-help" />
								</TooltipTrigger>
								<TooltipContent
									className={cn(
										"border border-primary p-4 max-w-xs shadow-xl rounded",
										isDark
											? "bg-white text-foreground"
											: "bg-foreground text-white",
									)}
								>
									{tooltip}
								</TooltipContent>
							</Tooltip>
						) : (
							PatternIcon
						)}
					</TooltipProvider>
				)}
			</div>
			{subtitle && (
				<p
					className={cn(
						"text-lg font-serif max-w-2xl leading-relaxed",
						isCentered ? "mx-auto" : "",
						isDark ? "text-white/70" : "text-foreground/60",
					)}
				>
					{subtitle}
				</p>
			)}
		</div>
	);
}
