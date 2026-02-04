import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { PatternZigZag } from "@/components/ui/patterns";

export function CTA() {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

	return (
		<div
			ref={containerRef}
			className="relative h-[60vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center bg-zinc-900"
		>
			<motion.div
				style={{ y }}
				className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
			>
				<img
					src="https://images.unsplash.com/photo-1505051508004-cb74f075676f?q=80&w=2072&auto=format&fit=crop"
					alt="Rwanda Landscape"
					className="w-full h-full object-cover opacity-40 ml-5"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
				<div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
			</motion.div>

			<div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
				<div className="mb-8 flex justify-center">
					<PatternZigZag className="w-24 h-6 text-primary" />
				</div>

				<span className="block text-primary font-mono text-xs uppercase tracking-[0.3em] mb-6">
					Start Your Journey
				</span>

				<h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
					Ready to Experience <br />
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
						The Unforgettable?
					</span>
				</h2>

				<p className="text-lg md:text-xl font-light text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed">
					Let us curate a journey that honors the land, the people, and the
					stories of Rwanda.
				</p>

				<div className="flex flex-col md:flex-row gap-4 justify-center items-center">
					<Link to="/contact">
						<Button className="bg-primary text-primary-foreground hover:bg-white hover:text-black font-bold uppercase tracking-widest px-8 h-14 text-sm rounded-none border border-transparent transition-all duration-300">
							Plan My Trip
						</Button>
					</Link>
					<Link to="/">
						<Button
							variant="outline"
							className="border border-zinc-700 text-white hover:bg-white hover:text-black bg-transparent font-bold uppercase tracking-widest px-8 h-14 text-sm rounded-none transition-all duration-300 backdrop-blur-sm"
						>
							View All Tours
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
