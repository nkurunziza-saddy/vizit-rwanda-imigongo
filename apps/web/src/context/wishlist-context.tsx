import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { Listing } from "@/utils/mock-db";
import { toast } from "sonner";

interface WishlistContextType {
	wishlist: Listing[];
	addToWishlist: (listing: Listing) => void;
	removeFromWishlist: (listingId: number) => void;
	isInWishlist: (listingId: number) => boolean;
	toggleWishlist: (listing: Listing) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
	undefined,
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
	const [wishlist, setWishlist] = useState<Listing[]>([]);

	// Load from local storage on mount
	useEffect(() => {
		const stored = localStorage.getItem("vizit_wishlist");
		if (stored) {
			try {
				setWishlist(JSON.parse(stored));
			} catch (e) {
				console.error("Failed to restore wishlist", e);
			}
		}
	}, []);

	// Save to local storage on change
	useEffect(() => {
		localStorage.setItem("vizit_wishlist", JSON.stringify(wishlist));
	}, [wishlist]);

	const addToWishlist = (listing: Listing) => {
		setWishlist((prev) => [...prev, listing]);
		toast.success("Added to your wishlist");
	};

	const removeFromWishlist = (listingId: number) => {
		setWishlist((prev) => prev.filter((item) => item.id !== listingId));
		toast.info("Removed from wishlist");
	};

	const isInWishlist = (listingId: number) => {
		return wishlist.some((item) => item.id === listingId);
	};

	const toggleWishlist = (listing: Listing) => {
		if (isInWishlist(listing.id)) {
			removeFromWishlist(listing.id);
		} else {
			addToWishlist(listing);
		}
	};

	return (
		<WishlistContext.Provider
			value={{
				wishlist,
				addToWishlist,
				removeFromWishlist,
				isInWishlist,
				toggleWishlist,
			}}
		>
			{children}
		</WishlistContext.Provider>
	);
};

export const useWishlist = () => {
	const context = useContext(WishlistContext);
	if (context === undefined) {
		throw new Error("useWishlist must be used within a WishlistProvider");
	}
	return context;
};
