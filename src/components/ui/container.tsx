import type React from "react";
import { cn } from "@/lib/utils";
import { PatternZigZag } from "./patterns";

interface ContainerProps extends React.ComponentProps<"div"> {
	variant?: "zigzag" | "solid" | "double";
	borderColor?: string;
}

export function Container({
	children,
	className,
	variant = "zigzag",
	borderColor = "border-primary",
	...props
}: ContainerProps) {
	return (
		<div
			className={cn(
				"relative p-6 bg-background border-2",
				borderColor,
				className,
			)}
			{...props}
		>
			{variant === "zigzag" && (
				<>
					<div className="absolute top-0 left-0 right-0 h-4 -mt-2 overflow-hidden pointer-events-none">
						<PatternZigZag className="text-primary w-full h-full" />
					</div>
					<div className="absolute bottom-0 left-0 right-0 h-4 -mb-2 overflow-hidden pointer-events-none rotate-180">
						<PatternZigZag className="text-primary w-full h-full" />
					</div>
				</>
			)}

			{variant === "double" && (
				<div
					className={cn(
						"absolute inset-1 border-2 pointer-events-none",
						borderColor,
					)}
				/>
			)}

			{children}
		</div>
	);
}
