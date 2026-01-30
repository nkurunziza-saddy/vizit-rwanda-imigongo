"use client";
import type React from "react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import {
	motion,
	useSpring,
	useTransform,
	type SpringOptions,
} from "motion/react";

export type AnimatedNumberProps = {
	value: number;
	className?: string;
	springOptions?: SpringOptions;
	as?: React.ElementType;
};

export function AnimatedNumber({
	value,
	className,
	springOptions,
	as = "span",
}: AnimatedNumberProps) {
	const MotionComponent = motion(as);

	const spring = useSpring(value, springOptions);
	const display = useTransform(spring, (current) =>
		Math.round(current).toLocaleString(),
	);

	useEffect(() => {
		spring.set(value);
	}, [spring, value]);

	return (
		<MotionComponent className={cn("tabular-nums", className)}>
			{display}
		</MotionComponent>
	);
}
