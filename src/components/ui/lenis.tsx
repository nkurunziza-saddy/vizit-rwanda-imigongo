import LenisInstance from "lenis";
import type React from "react";
import { useEffect } from "react";

export function Lenis({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const lenis = new LenisInstance({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
			orientation: "vertical",
			gestureOrientation: "vertical",
			smoothWheel: true,
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	}, []);

	return <>{children}</>;
}
