import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
	CalendarDays,
	CheckCircle,
	Hotel,
	LayoutDashboard,
	Settings,
	Users,
} from "lucide-react";
import { PageWrapper } from "@/components/layouts/page-wrapper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export const Route = createFileRoute("/_app/dashboard")({
	component: DashboardLayout,
	beforeLoad: () => {
		// We can't easily access auth context inside beforeLoad without a more complex setup
		// or passing it via router context. For now, we'll handle redirect in component
		// or rely on the fact that the component checks it.
		// However, strictly speaking, we should check here.
		// Since we are using a client-side auth context, we'll do the check in the component for simplicity
		// or assume the Router Context has it if we wired it up.
	},
});

function DashboardLayout() {
	const { user, isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				Loading...
			</div>
		);
	}

	if (!isAuthenticated || !user) {
		return (
			<div className="p-8 text-center">
				<p className="mb-4">You need to be logged in to view this page.</p>
				<Link to="/login">
					<Button>Login</Button>
				</Link>
			</div>
		);
	}

	const sidebarItems = [
		{
			label: "Overview",
			href: "/dashboard",
			icon: LayoutDashboard,
			roles: ["tourist", "vendor", "admin"],
		},
		{
			label: "My Bookings",
			href: "/dashboard",
			icon: CalendarDays,
			roles: ["tourist"],
		},
		{
			label: "My Listings",
			href: "/dashboard/listings",
			icon: Hotel,
			roles: ["vendor"],
		},
		{
			label: "Manage Bookings",
			href: "/dashboard/vendor-bookings",
			icon: CalendarDays,
			roles: ["vendor"],
		},
		{
			label: "Approvals",
			href: "/dashboard/approvals",
			icon: CheckCircle,
			roles: ["admin"],
		},
		{
			label: "All Users",
			href: "/dashboard/users",
			icon: Users,
			roles: ["admin"],
		},
		{
			label: "Settings",
			href: "/dashboard/settings",
			icon: Settings,
			roles: ["tourist", "vendor", "admin"],
		},
	];

	const filteredItems = sidebarItems.filter((item) =>
		item.roles.includes(user.role),
	);

	return (
		<div className="flex flex-col min-h-[calc(100vh-4rem)]">
			<PageWrapper>
				<div className="flex h-12 border-b items-center space-x-4 overflow-x-auto gap-2">
					{filteredItems.map((item) => (
						<Link
							key={item.href}
							to={item.href}
							activeProps={{
								className: "text-primary border-b-2 border-primary",
							}}
							className="flex items-center gap-1.5 whitespace-nowrap border-b-2 border-transparent text-sm font-medium transition-colors hover:text-primary"
						>
							<item.icon className="size-3.5" />
							{item.label}
						</Link>
					))}
				</div>
				<main className="py-4 mt-4">
					<Outlet />
				</main>
			</PageWrapper>
		</div>
	);
}
