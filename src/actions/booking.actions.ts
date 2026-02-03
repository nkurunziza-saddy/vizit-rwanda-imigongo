import {
	type Booking,
	type BookingItem,
	DB_KEYS,
	delay,
} from "../utils/mock-db";

export const createBooking = async (
	bookingData: Omit<Booking, "id" | "created_at" | "updated_at">,
	items: Omit<BookingItem, "id" | "booking_id">[],
): Promise<Booking> => {
	await delay(1000);

	const bookingsStr = localStorage.getItem(DB_KEYS.BOOKINGS);
	const bookings: Booking[] = bookingsStr ? JSON.parse(bookingsStr) : [];

	const bookingItemsStr = localStorage.getItem(DB_KEYS.BOOKING_ITEMS);
	const bookingItems: BookingItem[] = bookingItemsStr
		? JSON.parse(bookingItemsStr)
		: [];

	const newBookingId =
		bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1;

	const newBooking: Booking = {
		...bookingData,
		id: newBookingId,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};

	bookings.push(newBooking);
	localStorage.setItem(DB_KEYS.BOOKINGS, JSON.stringify(bookings));

	let newItemId =
		bookingItems.length > 0
			? Math.max(...bookingItems.map((i) => i.id)) + 1
			: 1;

	const newItems = items.map((item) => ({
		...item,
		id: newItemId++,
		booking_id: newBookingId,
	}));

	const updatedBookingItems = [...bookingItems, ...newItems];
	localStorage.setItem(
		DB_KEYS.BOOKING_ITEMS,
		JSON.stringify(updatedBookingItems),
	);

	return newBooking;
};

export const getMyBookings = async (userId: number): Promise<Booking[]> => {
	await delay(500);
	const bookingsStr = localStorage.getItem(DB_KEYS.BOOKINGS);
	const bookings: Booking[] = bookingsStr ? JSON.parse(bookingsStr) : [];
	return bookings.filter((b) => b.user_id === userId);
};
