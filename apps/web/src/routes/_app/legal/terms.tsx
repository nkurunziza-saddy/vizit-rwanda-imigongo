import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/legal/terms")({
	component: Terms,
});

function Terms() {
	return <div className="p-8">Terms of Service Placeholder</div>;
}
