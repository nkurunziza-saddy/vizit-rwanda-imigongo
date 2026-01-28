import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { Listing, Addon } from "@/utils/mock-db";
import type { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";

export type CartItem = {
	id: string;
	image: string;
	listing: Listing;
	dateRange: DateRange;
	guests: number;
	selectedAddons: {
		addon: Addon;
		quantity: number;
	}[];
};

interface CartContextType {
	cart: CartItem[];
	addToCart: (item: Omit<CartItem, "id">) => void;
	removeFromCart: (itemId: string) => void;
	updateGuests: (itemId: string, count: number) => void;
	updateAddon: (itemId: string, addon: Addon, quantity: number) => void;
	updateDateRange: (itemId: string, range: DateRange) => void;
	totalPrice: number;
	openCart: boolean;
	setOpenCart: (open: boolean) => void;
	clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [openCart, setOpenCart] = useState(false);

	useEffect(() => {
		const storedCart = localStorage.getItem("vizit_cart");
		if (storedCart) {
			try {
				const parsed = JSON.parse(storedCart);
				if (Array.isArray(parsed)) {
					const restoredCart = parsed.map((item: any) => ({
						...item,
						dateRange: {
							from: new Date(item.dateRange.from),
							to: new Date(item.dateRange.to),
						},
					}));
					setCart(restoredCart);
				} else if (parsed && parsed.listing) {
					// Migrate legacy single-item cart
					const legacyItem = {
						...parsed,
						id: Date.now().toString(),
						dateRange: {
							from: new Date(parsed.dateRange.from),
							to: new Date(parsed.dateRange.to),
						},
					};
					setCart([legacyItem]);
				}
			} catch (e) {
				console.error("Failed to restore cart", e);
				localStorage.removeItem("vizit_cart");
			}
		}
	}, []);

	// Save to local storage on change
	useEffect(() => {
		localStorage.setItem("vizit_cart", JSON.stringify(cart));
	}, [cart]);

	const addToCart = (item: Omit<CartItem, "id">) => {
		const newItem = {
			...item,
			id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
		};
		setCart((prev) => [...prev, newItem]);
		setOpenCart(true);
	};

	const removeFromCart = (itemId: string) => {
		setCart((prev) => prev.filter((item) => item.id !== itemId));
	};

	const clearCart = () => {
		setCart([]);
		setOpenCart(false);
	};

	const updateGuests = (itemId: string, count: number) => {
		setCart((prev) =>
			prev.map((item) =>
				item.id === itemId ? { ...item, guests: count } : item,
			),
		);
	};

	const updateDateRange = (itemId: string, range: DateRange) => {
		setCart((prev) =>
			prev.map((item) =>
				item.id === itemId ? { ...item, dateRange: range } : item,
			),
		);
	};

	const updateAddon = (itemId: string, addon: Addon, quantity: number) => {
		setCart((prev) =>
			prev.map((item) => {
				if (item.id !== itemId) return item;

				const currentAddons = [...item.selectedAddons];
				const existingIndexer = currentAddons.findIndex(
					(a) => a.addon.id === addon.id,
				);

				if (quantity <= 0) {
					if (existingIndexer > -1) {
						currentAddons.splice(existingIndexer, 1);
					}
				} else {
					if (existingIndexer > -1) {
						currentAddons[existingIndexer].quantity = quantity;
					} else {
						currentAddons.push({ addon, quantity });
					}
				}
				return { ...item, selectedAddons: currentAddons };
			}),
		);
	};

	const totalPrice = cart.reduce((total, item) => {
		const nights =
			item.dateRange.from && item.dateRange.to
				? differenceInDays(item.dateRange.to, item.dateRange.from)
				: 0;

		if (nights < 1) return total;

		const baseTotal = (item.listing.base_price || 0) * nights;

		let addonsTotal = 0;
		item.selectedAddons.forEach((addonItem) => {
			let itemCost = 0;
			if (addonItem.addon.price_type === "per_person") {
				itemCost = addonItem.addon.price * addonItem.quantity;
			} else if (addonItem.addon.price_type === "per_night") {
				itemCost = addonItem.addon.price * nights * addonItem.quantity;
			} else {
				// per_stay
				itemCost = addonItem.addon.price * addonItem.quantity;
			}
			addonsTotal += itemCost;
		});

		return total + baseTotal + addonsTotal;
	}, 0);

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				updateGuests,
				updateAddon,
				updateDateRange,
				totalPrice,
				openCart,
				setOpenCart,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
