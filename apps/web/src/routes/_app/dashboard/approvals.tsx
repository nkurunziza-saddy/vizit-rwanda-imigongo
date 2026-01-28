import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard/approvals")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Approvals</div>;
}
