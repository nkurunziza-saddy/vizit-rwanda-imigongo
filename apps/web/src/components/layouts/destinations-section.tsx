import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "../ui/section";

export const DestinationsSection = () => {
	const destinations = [
		{
			name: "Kigali",
			image:
				"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
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
			image:
				"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
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
			image:
				"https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
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
						className="group relative block focus:outline-none overflow-hidden rounded-lg aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/3]"
					>
						<img
							src={destination.image}
							alt={destination.name}
							className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
						<div className="absolute bottom-0 left-0 p-4 w-full">
							<h3 className="font-bold text-lg text-white mb-1">
								{destination.name}
							</h3>
							<p className="text-xs font-medium text-white/80">
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
