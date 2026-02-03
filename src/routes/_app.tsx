import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartSheet } from "@/components/booking/cart-sheet";
import { Lenis } from "@/components/ui/lenis";
import { Texture } from "@/components/ui/texture";
import { SacredGrid } from "@/components/ui/sacred-grid";

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
