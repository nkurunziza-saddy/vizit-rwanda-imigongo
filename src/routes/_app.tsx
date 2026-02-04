import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CartSheet } from "@/components/booking/cart-sheet";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Lenis } from "@/components/ui/lenis";
import { SacredGrid } from "@/components/ui/sacred-grid";
import { Texture } from "@/components/ui/texture";

export const Route = createFileRoute("/_app")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Lenis>
			<div className="flex flex-col min-h-screen relative">
				<Texture />
				<SacredGrid />
				<Header />
				<main className="flex-1 relative z-10">
					<Outlet />
				</main>
				<Footer />
				<CartSheet />
			</div>
		</Lenis>
	);
}
