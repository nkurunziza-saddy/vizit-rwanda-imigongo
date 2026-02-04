import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Filter, MapPin, Search, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import ListingCard from "@/components/listing-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { PatternDiamond } from "@/components/ui/patterns";
import { Reveal } from "@/components/ui/reveal";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { useDebounce } from "@/hooks/use-debounce";
import { useListings } from "@/hooks/use-listings";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
	category: z.string().optional(),
	search: z.string().optional(),
	sortBy: z.string().optional(),
	priceRange: z.array(z.number()).optional(),
	amenities: z.array(z.string()).optional(),
	from: z.string().optional(),
	checkIn: z.string().optional(),
	checkOut: z.string().optional(),
	guests: z.number().optional(),
	page: z.number().optional(),
});

export const Route = createFileRoute("/_app/listings/")({
	component: Listings,
	validateSearch: (search) => searchSchema.parse(search),
});

const categories = [
	{ value: "all", label: "All", icon: Sparkles },
	{ value: "hotel", label: "Hotels", icon: MapPin },
	{ value: "bnb", label: "BnBs", icon: MapPin },
	{ value: "car", label: "Car Rentals", icon: MapPin },
	{ value: "tour", label: "Tours", icon: MapPin },
];

interface FilterContentProps {
	searchQuery: string;
	setSearchQuery: (value: string) => void;
	selectedCategory: string;
	setCategory: (category: string) => void;
	priceRange: number[];
	setPriceRange: (range: number[]) => void;
	clearFilters: () => void;
	hasActiveFilters: boolean;
}

const FilterContent = ({
	searchQuery,
	setSearchQuery,
	selectedCategory,
	setCategory,
	priceRange,
	setPriceRange,
	clearFilters,
	hasActiveFilters,
}: FilterContentProps) => (
	<div className="space-y-10">
		<div className="space-y-4">
			<h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">
				Search
			</h3>
			<div className="relative group">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
				<Input
					placeholder="SEARCH DESTINATIONS..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="pl-10 h-10 bg-transparent border-border focus-visible:ring-0 focus-visible:border-primary rounded-none text-sm placeholder:text-xs placeholder:uppercase placeholder:tracking-wide shadow-none transition-colors"
				/>
			</div>
		</div>

		<div className="space-y-4">
			<h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">
				Categories
			</h3>
			<div className="flex flex-col gap-1">
				{categories.map((cat) => (
					<button
						type="button"
						key={cat.value}
						onClick={() => setCategory(cat.value)}
						className={cn(
							"flex items-center justify-between w-full text-left group transition-all duration-300 py-2 px-2 hover:bg-muted/50 rounded-sm",
							selectedCategory === cat.value
								? "text-primary font-bold pl-3 border-l-2 border-primary"
								: "text-foreground hover:text-primary",
						)}
					>
						<span className="text-sm font-serif group-hover:tracking-wide transition-all">
							{cat.label}
						</span>
						{selectedCategory === cat.value && (
							<PatternDiamond className="w-2 h-2 text-primary" />
						)}
					</button>
				))}
			</div>
		</div>

		<div className="space-y-4">
			<h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">
				Price Range
			</h3>
			<div className="pt-4 pb-2 px-2">
				<Slider
					defaultValue={[0, 1000]}
					max={1000}
					step={10}
					value={priceRange}
					onValueChange={(value) => setPriceRange(value as number[])}
					className="mb-6"
				/>
				<div className="flex items-center justify-between font-mono text-xs">
					<div className="bg-muted px-3 py-1.5 rounded-sm">
						${priceRange[0]}
					</div>
					<div className="text-muted-foreground">-</div>
					<div className="bg-muted px-3 py-1.5 rounded-sm">
						${priceRange[1]}+
					</div>
				</div>
			</div>
		</div>

		{hasActiveFilters && (
			<Button
				variant="outline"
				className="w-full gap-2 h-10 rounded-none border-border text-foreground hover:bg-foreground hover:text-white uppercase tracking-widest text-xs font-bold mt-6"
				onClick={clearFilters}
			>
				<X className="h-4 w-4" />
				Clear Filters
			</Button>
		)}
	</div>
);

function Listings() {
	const searchParams = useSearch({ from: "/_app/listings/" });
	const navigate = Route.useNavigate();

	const [localSearchQuery, setLocalSearchQuery] = useState(
		searchParams.search || "",
	);
	const debouncedSearchQuery = useDebounce(localSearchQuery, 500);

	useEffect(() => {
		if (debouncedSearchQuery !== (searchParams.search || "")) {
			navigate({
				search: (prev) => ({
					...prev,
					search: debouncedSearchQuery || undefined,
					page: 1,
				}),
			});
		}
	}, [debouncedSearchQuery, searchParams.search, navigate]);

	const selectedCategory = searchParams.category || "all";
	const priceRange = searchParams.priceRange || [0, 1000];
	const currentPage = searchParams.page || 1;

	const setCategory = (category: string) => {
		navigate({
			search: (prev) => ({ ...prev, category: category, page: 1 }),
		});
	};

	const setPriceRangeParam = (range: number[]) => {
		navigate({
			search: (prev) => ({ ...prev, priceRange: range, page: 1 }),
		});
	};

	const hasActiveFilters =
		selectedCategory !== "all" ||
		localSearchQuery !== "" ||
		priceRange[0] !== 0 ||
		priceRange[1] !== 1000;

	const clearFilters = () => {
		setLocalSearchQuery("");
		navigate({
			search: (prev) => ({
				...prev,
				page: 1,
			}),
		});
	};

	const { data: listings, isLoading } = useListings();

	if (isLoading) {
		return (
			<div className="min-h-screen bg-background pb-20">
				<div className="container mx-auto px-4 py-8">
					<Skeleton className="h-[40vh] w-full mb-12" />
					<div className="flex flex-col lg:flex-row gap-12 items-start">
						<aside className="hidden lg:block w-72 flex-none sticky top-24">
							<div className="space-y-8">
								<Skeleton className="h-8 w-32" />
								<Skeleton className="h-10 w-full" />
								<div className="space-y-4">
									<Skeleton className="h-6 w-full" />
									<Skeleton className="h-6 w-full" />
									<Skeleton className="h-6 w-full" />
								</div>
							</div>
						</aside>
						<main className="flex-1 w-full space-y-8">
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
								{Array.from({ length: 6 }).map((_, i) => (
									<Skeleton key={i} className="h-96 w-full" />
								))}
							</div>
						</main>
					</div>
				</div>
			</div>
		);
	}

	const activeSearchQuery = (searchParams.search || "").toLowerCase();

	const filteredListings =
		listings?.filter((listing) => {
			const matchesCategory =
				selectedCategory === "all" ||
				listing.listingType.includes(
					selectedCategory === "hotel" ? "hotel" : selectedCategory,
				);

			const matchesSearch =
				listing.title.toLowerCase().includes(activeSearchQuery) ||
				"location".toLowerCase().includes(activeSearchQuery);

			const matchesPrice =
				listing.basePrice >= priceRange[0] &&
				listing.basePrice <= priceRange[1];

			return matchesCategory && matchesSearch && matchesPrice;
		}) || [];

	const ITEMS_PER_PAGE = 12;
	const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);

	const paginatedListings = filteredListings.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	return (
		<div className="min-h-screen bg-background pb-32">
			<div className="relative h-[40vh] min-h-[400px] flex items-center justify-center bg-foreground overflow-hidden mb-16">
				<div className="absolute inset-0 z-0 opacity-40">
					<img
						src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop"
						alt="Listings Hero"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />

				<div className="relative z-20 text-center container px-4 mt-12">
					<Reveal>
						<PatternDiamond className="w-12 h-12 text-primary mx-auto mb-6" />
					</Reveal>
					<Reveal delay={0.1}>
						<h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4">
							Curated <span className="text-primary">Stays</span>
						</h1>
					</Reveal>
					<Reveal delay={0.2}>
						<p className="text-white/70 font-serif text-xl max-w-xl mx-auto">
							Handpicked sanctuaries that connect you to the soul of the land.
						</p>
					</Reveal>
				</div>
			</div>

			<div className="container mx-auto px-4">
				<div className="flex flex-col lg:flex-row gap-16 items-start">
					<aside className="hidden lg:block w-72 flex-none sticky top-28">
						<div className="bg-background relative">
							{/* decorated heading */}
							<div className="mb-8 flex items-center gap-4">
								<div className="h-px bg-border flex-1" />
								<span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
									Refine
								</span>
								<div className="h-px bg-border flex-1" />
							</div>

							<FilterContent
								searchQuery={localSearchQuery}
								setSearchQuery={setLocalSearchQuery}
								selectedCategory={selectedCategory}
								setCategory={setCategory}
								priceRange={priceRange}
								setPriceRange={setPriceRangeParam}
								clearFilters={clearFilters}
								hasActiveFilters={hasActiveFilters}
							/>
						</div>
					</aside>

					<main className="flex-1 w-full space-y-8">
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-border pb-6">
							<div className="w-full">
								<span className="text-primary font-mono text-xs uppercase tracking-widest mb-2 block">
									Collection
								</span>
								<div className="flex items-baseline gap-4">
									<h2 className="text-3xl font-black uppercase tracking-tight text-foreground">
										Available Experiences
									</h2>
									<span className="text-sm font-serif italic text-muted-foreground">
										({filteredListings.length} results)
									</span>
								</div>
							</div>

							<div className="flex items-center gap-3 w-full sm:w-auto">
								<div className="lg:hidden flex-1 sm:flex-initial">
									<Sheet>
										<SheetTrigger
											render={
												<Button
													variant="outline"
													className="w-full sm:w-auto gap-2 rounded-none h-10 uppercase tracking-widest text-[10px] font-bold border-foreground/20 hover:border-foreground transition-colors"
												/>
											}
										>
											<Filter className="h-3.5 w-3.5" />
											Filters
											{hasActiveFilters && (
												<span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
											)}
										</SheetTrigger>
										<SheetContent
											side="left"
											className="w-full sm:w-[320px] p-0"
										>
											<SheetHeader className="p-6 border-b">
												<SheetTitle className="text-left text-xl font-black uppercase tracking-tighter flex items-center justify-between">
													<span>Refine</span>
												</SheetTitle>
											</SheetHeader>
											<div className="p-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
												<FilterContent
													searchQuery={localSearchQuery}
													setSearchQuery={setLocalSearchQuery}
													selectedCategory={selectedCategory}
													setCategory={setCategory}
													priceRange={priceRange}
													setPriceRange={setPriceRangeParam}
													clearFilters={clearFilters}
													hasActiveFilters={hasActiveFilters}
												/>
											</div>
										</SheetContent>
									</Sheet>
								</div>

								<Select>
									<SelectTrigger className="w-full sm:w-[160px] h-10 rounded-none border-foreground/20 hover:border-foreground uppercase tracking-widest text-[10px] font-bold shadow-none transition-colors">
										<SelectValue placeholder="Sort By" />
									</SelectTrigger>
									<SelectContent className="rounded-none border-foreground/20 min-w-[160px]">
										<SelectItem
											value="popular"
											className="uppercase tracking-wider text-[10px]"
										>
											Popular
										</SelectItem>
										<SelectItem
											value="newest"
											className="uppercase tracking-wider text-[10px]"
										>
											Newest
										</SelectItem>
										<SelectItem
											value="price_low"
											className="uppercase tracking-wider text-[10px]"
										>
											Price: Low
										</SelectItem>
										<SelectItem
											value="price_high"
											className="uppercase tracking-wider text-[10px]"
										>
											Price: High
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						{hasActiveFilters && (
							<div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
								{selectedCategory !== "all" && (
									<Badge
										variant="outline"
										className="gap-2 pl-3 pr-2 py-1.5 cursor-pointer hover:bg-muted rounded-full border-primary/50 text-foreground uppercase tracking-widest text-[10px] font-bold transition-all hover:pr-3"
										onClick={() => setCategory("all")}
									>
										{
											categories.find((c) => c.value === selectedCategory)
												?.label
										}
										<X className="h-3 w-3 text-muted-foreground hover:text-primary transition-colors" />
									</Badge>
								)}
								{localSearchQuery && (
									<Badge
										variant="outline"
										className="gap-2 pl-3 pr-2 py-1.5 cursor-pointer hover:bg-muted rounded-full border-primary/50 text-foreground uppercase tracking-widest text-[10px] font-bold transition-all hover:pr-3"
										onClick={() => setLocalSearchQuery("")}
									>
										"{localSearchQuery}"
										<X className="h-3 w-3 text-muted-foreground hover:text-primary transition-colors" />
									</Badge>
								)}
								{(priceRange[0] !== 0 || priceRange[1] !== 1000) && (
									<Badge
										variant="outline"
										className="gap-2 pl-3 pr-2 py-1.5 cursor-pointer hover:bg-muted rounded-full border-primary/50 text-foreground uppercase tracking-widest text-[10px] font-bold transition-all hover:pr-3"
										onClick={() => setPriceRangeParam([0, 1000])}
									>
										${priceRange[0]} - ${priceRange[1]}
										<X className="h-3 w-3 text-muted-foreground hover:text-primary transition-colors" />
									</Badge>
								)}
							</div>
						)}

						{paginatedListings.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
								{paginatedListings.map((listing, i) => (
									<Reveal key={listing.id} delay={i * 0.05}>
										<ListingCard
											id={listing.id.toString()}
											title={listing.title}
											location={`Location ${listing.locationId}`}
											price={listing.basePrice}
											rating={4.8}
											reviewCount={12}
											image={
												listing.imageUrl ||
												"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
											}
											category={
												listing.listingType.includes("hotel")
													? "hotel"
													: listing.listingType.includes("car")
														? "car"
														: "tour"
											}
											listing={listing}
										/>
									</Reveal>
								))}
							</div>
						) : (
							<Empty className="py-32 border border-dashed border-border/50 rounded-sm bg-muted/20">
								<EmptyHeader>
									<EmptyMedia
										variant="icon"
										className="bg-background text-muted-foreground mx-auto"
									>
										<Search className="h-8 w-8" />
									</EmptyMedia>
									<EmptyTitle className="text-foreground font-black uppercase tracking-tighter text-2xl mt-6 mb-2">
										No results found
									</EmptyTitle>
									<EmptyDescription className="font-serif text-lg text-muted-foreground">
										Try adjusting your filters or search terms to find what
										you're looking for.
									</EmptyDescription>
								</EmptyHeader>
								<EmptyContent className="mt-8">
									<Button
										variant="default"
										className="rounded-none h-12 px-8 uppercase tracking-widest font-bold bg-foreground hover:bg-primary text-xs transition-colors"
										onClick={clearFilters}
									>
										Clear all filters
									</Button>
								</EmptyContent>
							</Empty>
						)}

						{filteredListings.length > ITEMS_PER_PAGE && (
							<div className="flex justify-center pt-16 border-t border-border">
								<Pagination>
									<PaginationContent>
										<PaginationItem>
											<PaginationPrevious
												onClick={(e) => {
													e.preventDefault();
													if (currentPage > 1) {
														navigate({
															search: (prev) => ({
																...prev,
																page: Math.max(1, currentPage - 1),
															}),
														});
													}
												}}
												className={cn(
													"cursor-pointer rounded-none h-10 px-4 text-xs uppercase tracking-wider font-bold border border-transparent hover:border-foreground/20 transition-all",
													currentPage === 1
														? "pointer-events-none opacity-30"
														: "hover:bg-muted",
												)}
												aria-disabled={currentPage === 1}
											/>
										</PaginationItem>
										{Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
											let p: number;
											if (totalPages <= 5) {
												p = i + 1;
											} else if (currentPage <= 3) {
												p = i + 1;
											} else if (currentPage >= totalPages - 2) {
												p = totalPages - 4 + i;
											} else {
												p = currentPage - 2 + i;
											}
											return (
												<PaginationItem key={p}>
													<PaginationLink
														isActive={currentPage === p}
														onClick={(e) => {
															e.preventDefault();
															navigate({
																search: (prev) => ({ ...prev, page: p }),
															});
														}}
														className={cn(
															"cursor-pointer rounded-none h-10 w-10 text-xs font-bold border border-transparent transition-all",
															currentPage === p
																? "bg-foreground text-white hover:bg-foreground border-foreground"
																: "hover:bg-muted hover:border-foreground/20",
														)}
													>
														{p}
													</PaginationLink>
												</PaginationItem>
											);
										})}
										<PaginationItem>
											<PaginationNext
												onClick={(e) => {
													e.preventDefault();
													if (currentPage < totalPages) {
														navigate({
															search: (prev) => ({
																...prev,
																page: Math.min(totalPages, currentPage + 1),
															}),
														});
													}
												}}
												className={cn(
													"cursor-pointer rounded-none h-10 px-4 text-xs uppercase tracking-wider font-bold border border-transparent hover:border-foreground/20 transition-all",
													currentPage === totalPages
														? "pointer-events-none opacity-30"
														: "hover:bg-muted",
												)}
												aria-disabled={currentPage === totalPages}
											/>
										</PaginationItem>
									</PaginationContent>
								</Pagination>
							</div>
						)}
					</main>
				</div>
			</div>
		</div>
	);
}
