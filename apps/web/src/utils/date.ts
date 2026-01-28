import { areIntervalsOverlapping } from "date-fns";
import type { BookingItem } from "./mock-db";

export const isDateRangeAvailable = (
	listingId: number,
	startDate: Date,
	endDate: Date,
	existingBookings: BookingItem[],
): boolean => {
	const listingBookings = existingBookings.filter(
		(b) => b.listing_id === listingId,
	);

	for (const booking of listingBookings) {
		const bookingStart = new Date(booking.start_date);
		const bookingEnd = new Date(booking.end_date);

		if (
			areIntervalsOverlapping(
				{ start: startDate, end: endDate },
				{ start: bookingStart, end: bookingEnd },
				{ inclusive: true },
			)
		) {
			return false;
		}
	}

	return true;
};
