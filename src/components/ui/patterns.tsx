import type React from "react";
import { cn } from "@/lib/utils";

interface PatternProps extends React.ComponentProps<"svg"> {
	color?: string;
	strokeWidth?: number;
}

export function PatternZigZag({
	className,
	color = "currentColor",
	strokeWidth = 2,
	animated = false,
	...props
}: PatternProps & { animated?: boolean }) {
	return (
		<svg
			viewBox="0 0 100 20"
			preserveAspectRatio="none"
			className={cn("w-full h-4", className)}
			{...props}
		>
			<path
				d="M0,20 L10,0 L20,20 L30,0 L40,20 L50,0 L60,20 L70,0 L80,20 L90,0 L100,20"
				fill="none"
				stroke={color}
				strokeWidth={strokeWidth}
				vectorEffect="non-scaling-stroke"
				className={cn(animated && "animate-trace")}
			/>
		</svg>
	);
}

export function PatternDiamond({
	className,
	color = "currentColor",
	strokeWidth = 2,
	...props
}: PatternProps) {
	return (
		<svg
			viewBox="0 0 40 40"
			preserveAspectRatio="xMidYMid slice"
			className={cn("w-10 h-10", className)}
			{...props}
		>
			<path
				d="M20,0 L40,20 L20,40 L0,20 Z"
				fill="none"
				stroke={color}
				strokeWidth={strokeWidth}
				vectorEffect="non-scaling-stroke"
			/>
			<path
				d="M20,10 L30,20 L20,30 L10,20 Z"
				fill="none"
				stroke={color}
				strokeWidth={strokeWidth}
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	);
}

export function PatternVerticalDiamond({
	className,
	color = "currentColor",
	strokeWidth = 2,
	...props
}: PatternProps) {
	return (
		<svg
			viewBox="0 0 100 400"
			preserveAspectRatio="none"
			className={cn("w-24 h-96", className)}
			{...props}
		>
			{/* 4 Stacked Concentric Diamonds */}
			{[0, 100, 200, 300].map((offset, i) => (
				<g key={i} transform={`translate(0, ${offset})`}>
					{/* Outer Diamond */}
					<path
						d="M50,0 L100,50 L50,100 L0,50 Z"
						fill="none"
						stroke={color}
						strokeWidth={strokeWidth}
						vectorEffect="non-scaling-stroke"
					/>
					{/* Middle Diamond */}
					<path
						d="M50,15 L85,50 L50,85 L15,50 Z"
						fill="none"
						stroke={color}
						strokeWidth={strokeWidth}
						vectorEffect="non-scaling-stroke"
					/>
					{/* Inner Diamond */}
					<path
						d="M50,30 L70,50 L50,70 L30,50 Z"
						fill="none"
						stroke={color}
						strokeWidth={strokeWidth}
						vectorEffect="non-scaling-stroke"
					/>
				</g>
			))}
		</svg>
	);
}

export function PatternHorizontalDiamonds({
	className,
	color = "currentColor",
	strokeWidth = 2,
	...props
}: PatternProps) {
	return (
		<svg
			viewBox="0 0 100 20"
			preserveAspectRatio="none"
			className={cn("w-full h-4", className)}
			{...props}
		>
			<defs>
				<pattern
					id="diamond-pattern"
					x="0"
					y="0"
					width="20"
					height="20"
					patternUnits="userSpaceOnUse"
				>
					<path
						d="M10,0 L20,10 L10,20 L0,10 Z"
						fill="none"
						stroke={color}
						strokeWidth={strokeWidth}
					/>
					<path
						d="M10,5 L15,10 L10,15 L5,10 Z"
						fill="none"
						stroke={color}
						strokeWidth={strokeWidth}
					/>
				</pattern>
			</defs>
			<rect
				x="0"
				y="0"
				width="100%"
				height="100%"
				fill="url(#diamond-pattern)"
			/>
		</svg>
	);
}

export function PatternSpiral({
	className,
	color = "currentColor",
	strokeWidth = 2,
	...props
}: PatternProps) {
	return (
		<svg
			viewBox="0 0 40 40"
			preserveAspectRatio="none"
			className={cn("w-10 h-10", className)}
			{...props}
		>
			<path
				d="M20,20 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0" // Simple spiral approximation or circle for now
				fill="none"
				stroke={color}
				strokeWidth={strokeWidth}
				vectorEffect="non-scaling-stroke"
			/>
			<path
				d="M20,20 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0"
				fill="none"
				stroke={color}
				strokeWidth={strokeWidth}
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	);
}
