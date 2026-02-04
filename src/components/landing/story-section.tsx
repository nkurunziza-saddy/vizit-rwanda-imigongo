import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { PatternHorizontalDiamonds } from "../ui/patterns";
import { CuratorNote } from "./curator-note";

interface ImigongoStorySectionProps {
	imageSrc: string;
	category: string;
	title: React.ReactNode;
	description: React.ReactNode;
	note?: string;
	reversed?: boolean;
}

export function StorySection({
	imageSrc,
	category,
	title,
	description,
	note,
	reversed = false,
}: ImigongoStorySectionProps) {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
	const textY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

	return (
		<div
			ref={containerRef}
			className={cn(
				"w-full grid grid-cols-1 md:grid-cols-2 min-h-[90vh] overflow-hidden",
				reversed ? "direction-rtl" : "",
			)}
		>
			<div
				className={cn(
					"relative min-h-[60vh] md:min-h-full bg-foreground overflow-hidden group",
					reversed ? "md:order-2" : "md:order-1",
				)}
			>
				<motion.div
					style={{ y: imageY }}
					className="absolute inset-0 w-full h-[120%] -top-[10%]"
				>
					<img
						src={imageSrc}
						alt={category}
						className="w-full h-full object-cover grayscale opacity-60"
					/>
					<div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
				</motion.div>

				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<span className="text-[15vw] font-black text-white/5 leading-none tracking-tighter mix-blend-overlay uppercase">
						{category}
					</span>
				</div>
			</div>

			<div
				className={cn(
					"bg-foreground text-white flex flex-col justify-center p-12 md:p-24 lg:p-32 relative z-10",
					reversed
						? "md:order-1 border-r-4 border-primary"
						: "md:order-2 border-l-4 border-primary",
				)}
			>
				<motion.div style={{ y: textY }}>
					<div className="mb-12 relative">
						<PatternHorizontalDiamonds className="w-64 h-8 text-primary mb-8 -ml-2" />

						<div className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
							{title}
						</div>

						{note && (
							<CuratorNote
								note={note}
								className={cn(
									"top-10",
									reversed
										? "left-0 md:-left-20 lg:-left-32"
										: "right-0 md:-right-20 lg:-right-32",
								)}
								arrowDirection={reversed ? "right" : "left"}
							/>
						)}
					</div>

					<div className="space-y-8 max-w-xl">{description}</div>
				</motion.div>
			</div>
		</div>
	);
}
