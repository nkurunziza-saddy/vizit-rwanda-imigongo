import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ChapterDividerProps {
	text: string;
	className?: string;
	theme?: "dark" | "light";
}

export function ChapterDivider({
	text,
	className,
	theme = "light",
}: ChapterDividerProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const el = containerRef.current;
			if (!el) return;

			gsap.to(el.querySelector(".scroller"), {
				x: "-20%",
				ease: "none",
				duration: 20,
				repeat: -1,
			});
		},
		{ scope: containerRef },
	);

	return (
		<div
			ref={containerRef}
			className={cn(
				"w-full overflow-hidden border-y py-4 md:py-6 flex items-center select-none",
				theme === "dark"
					? "bg-foreground border-white/10 text-white/20"
					: "bg-background border-foreground/10 text-foreground/20",
				className,
			)}
		>
			<div className="scroller flex whitespace-nowrap gap-8 md:gap-16">
				{Array.from({ length: 12 }).map((_, i) => (
					<span
						key={i}
						className="text-sm md:text-base font-mono uppercase tracking-[0.3em] font-bold"
					>
						{text}
					</span>
				))}
			</div>
		</div>
	);
}
