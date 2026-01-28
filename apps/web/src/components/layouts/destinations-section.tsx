import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "../ui/section";

export const DestinationsSection = () => {
	const destinations = [
		{
			name: "Kigali",
			count: 156,
			href: "/listings",
			search: {
				search: "kigali",
				category: undefined,
				sortBy: undefined,
				priceRange: undefined,
				amenities: undefined,
				from: undefined,
				checkIn: undefined,
				checkOut: undefined,
				guests: undefined,
				page: 1,
			},
		},
		{
			name: "Lake Kivu",
			count: 89,
			href: "/listings",
			search: {
				search: "kivu",
				category: undefined,
				sortBy: undefined,
				priceRange: undefined,
				amenities: undefined,
				from: undefined,
				checkIn: undefined,
				checkOut: undefined,
				guests: undefined,
				page: 1,
			},
		},
		{
			name: "Volcanoes National Park",
			count: 45,
			href: "/listings",
			search: {
				search: "volcanoes",
				category: undefined,
				sortBy: undefined,
				priceRange: undefined,
				amenities: undefined,
				from: undefined,
				checkIn: undefined,
				checkOut: undefined,
				guests: undefined,
				page: 1,
			},
		},
	];

	const action = (
		<Link
			to="/listings"
			search={{
				category: undefined,
				search: undefined,
				sortBy: undefined,
				priceRange: undefined,
				amenities: undefined,
				from: undefined,
				checkIn: undefined,
				checkOut: undefined,
				guests: undefined,
				page: undefined,
			}}
		>
			<span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
				View map <ArrowRight className="h-4 w-4" />
			</span>
		</Link>
	);

	return (
		<SectionContainer
			title="Destinations"
			description="Explore Rwanda's most sought-after locations."
			align="start"
			action={action}
		>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				{destinations.map((destination) => (
					<Link
						key={destination.name}
						to={destination.href}
						search={destination.search}
						className="group block focus:outline-none"
					>
						<div className="p-3 rounded-lg transition-all border border-border bg-card">
							<h3 className="font-medium text-base mb-0.5">
								{destination.name}
							</h3>
							<p className="text-xs text-muted-foreground">
								{destination.count} Listings
							</p>
						</div>
					</Link>
				))}
			</div>
		</SectionContainer>
	);
};

export default DestinationsSection;
