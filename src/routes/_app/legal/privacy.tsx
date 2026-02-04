import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/landing/section-title";

export const Route = createFileRoute("/_app/legal/privacy")({
	component: Privacy,
});

function Privacy() {
	return (
		<section className="py-8">
			<SectionTitle title="Privacy Policy" className="mb-8" />
			<div className="p-8 border border-border bg-card">
				Privacy Policy Placeholder
			</div>
		</section>
	);
}
