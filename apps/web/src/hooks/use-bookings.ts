import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import type { BookingFilters, CreateBookingInput } from "@/schemas";

// Query keys for bookings
export const bookingKeys = {
  all: ["bookings"] as const,
  lists: (filters?: BookingFilters) =>
    [...bookingKeys.all, "list", filters] as const,
  detail: (id: number) => [...bookingKeys.all, "detail", id] as const,
  myBookings: (filters?: BookingFilters) =>
    [...bookingKeys.all, "my", filters] as const,
};

// Hook to get current user's bookings
export const useMyBookings = (filters?: BookingFilters) => {
  return useQuery({
    queryKey: bookingKeys.myBookings(filters),
    queryFn: () => api.getMyBookings(filters),
  });
};

// Hook to create a new booking
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingInput) => api.createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      queryClient.invalidateQueries({ queryKey: bookingKeys.myBookings() });
    },
  });
};

// Hook to cancel a booking
export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.cancelBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      queryClient.invalidateQueries({ queryKey: bookingKeys.myBookings() });
    },
  });
};
