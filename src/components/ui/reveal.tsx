import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
	children: React.ReactNode;
	className?: string;
	delay?: number;
	duration?: number;
	direction?: "up" | "down" | "left" | "right";
}

export function Reveal({
	children,
	className,
	delay = 0,
	duration = 0.5,
	direction = "up",
}: RevealProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-10%" });

	const variants = {
		hidden: {
			opacity: 0,
			y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
			x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
		},
		visible: {
			opacity: 1,
			y: 0,
			x: 0,
			transition: {
				duration,
				delay,
			},
		},
	};

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={variants}
			className={cn(className)}
		>
			{children}
		</motion.div>
	);
}
