import { ImageGallery } from "@/components/layouts/image-gallery";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/gallery")({
	component: RouteComponent,
});

function RouteComponent() {
	return <ImageGallery />;
}
