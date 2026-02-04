import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import type { Vendor } from "@/types";

// Query keys for vendors
export const vendorKeys = {
	all: ["vendors"] as const,
	lists: () => [...vendorKeys.all, "list"] as const,
	detail: (id: number) => [...vendorKeys.all, "detail", id] as const,
	myVendor: () => [...vendorKeys.all, "me"] as const,
	myListings: () => [...vendorKeys.all, "my", "listings"] as const,
	myBookings: () => [...vendorKeys.all, "my", "bookings"] as const,
};

// Hook to get all vendors
export const useVendors = () => {
	return useQuery({
		queryKey: vendorKeys.lists(),
		queryFn: () => api.getVendors(),
	});
};

// Hook to get current user's vendor profile
export const useMyVendor = () => {
	return useQuery({
		queryKey: vendorKeys.myVendor(),
		queryFn: () => api.getMyVendor(),
	});
};

// Hook to register as a vendor
export const useRegisterVendor = () => {
	const queryClient = useQueryClient();

	return useMutation<
		Vendor,
		Error,
		{ businessName: string; vendorType: string; bio: string }
	>({
		mutationFn: (data) => api.registerVendor(data) as Promise<Vendor>,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: vendorKeys.myVendor() });
		},
	});
};

// Hook to get vendor's listings
export const useVendorListings = () => {
	return useQuery({
		queryKey: vendorKeys.myListings(),
		queryFn: () => api.getVendorListings(),
	});
};

// Hook to get vendor's bookings
export const useVendorBookings = () => {
	return useQuery({
		queryKey: vendorKeys.myBookings(),
		queryFn: () => api.getVendorBookings(),
	});
};
