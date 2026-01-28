import { useEffect } from "react";
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { initializeMockDB } from "@/utils/mock-db";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import { CartProvider } from "@/context/cart-context";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
	queryClient: QueryClient;
}

import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<Search className="h-6 w-6" />
					</EmptyMedia>
					<EmptyTitle>Page Not Found</EmptyTitle>
					<EmptyDescription>
						The page you are looking for does not exist.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Link to="/" className={buttonVariants({ variant: "default" })}>
						Go Home
					</Link>
				</EmptyContent>
			</Empty>
		</div>
	);
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Vizit Africa",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	notFoundComponent: NotFoundPage,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		initializeMockDB();
	}, []);

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<CartProvider>
					{children}
					<Toaster />
				</CartProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},

						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
