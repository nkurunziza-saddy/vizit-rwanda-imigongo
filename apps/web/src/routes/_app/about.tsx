import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "@/components/layouts/page-wrapper";

export const Route = createFileRoute("/_app/about")({
	component: AboutPage,
});

function AboutPage() {
	return (
		<PageWrapper>
			<div className="py-12">
				<h1 className="text-4xl font-bold mb-6">About Vizit Africa</h1>
				<p className="text-lg text-muted-foreground">
					Your gateway to authentic African adventures. We connect travelers
					with trusted accommodations, transport, and local guides in Rwanda.
				</p>
			</div>
		</PageWrapper>
	);
}
