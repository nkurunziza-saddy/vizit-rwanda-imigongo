import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBooking, getMyBookings } from "@/actions/booking.actions";
import { Booking, BookingItem } from "@/utils/mock-db";

export const useCreateBooking = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: {
			booking: Omit<Booking, "id" | "created_at" | "updated_at">;
			items: Omit<BookingItem, "id" | "booking_id">[];
		}) => createBooking(data.booking, data.items),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["bookings"] });
		},
	});
};

export const useMyBookings = (userId?: number) => {
	return useQuery({
		queryKey: ["bookings", userId],
		queryFn: () => getMyBookings(userId!),
		enabled: !!userId,
	});
};
