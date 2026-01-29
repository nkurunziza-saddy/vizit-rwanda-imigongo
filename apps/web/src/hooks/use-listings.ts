import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import type { ListingFilters, CreateListingInput } from "@/schemas";

// Query keys for listings
export const listingKeys = {
  all: ["listings"] as const,
  lists: (filters?: ListingFilters) =>
    [...listingKeys.all, "list", filters] as const,
  detail: (id: number) => [...listingKeys.all, "detail", id] as const,
  search: (query: string) => [...listingKeys.all, "search", query] as const,
};

// Hook to get all listings with optional filters
export const useListings = (filters?: ListingFilters) => {
  return useQuery({
    queryKey: listingKeys.lists(filters),
    queryFn: () => api.getListings(filters),
  });
};

// Hook to get a single listing by ID
export const useListing = (id: number) => {
  return useQuery({
    queryKey: listingKeys.detail(id),
    queryFn: () => api.getListing(id),
    enabled: !!id,
  });
};

// Hook to search listings
export const useSearchListings = (query: string) => {
  return useQuery({
    queryKey: listingKeys.search(query),
    queryFn: () => api.searchListings(query),
    enabled: query.length > 0,
  });
};

// Hook to create a new listing
export const useCreateListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateListingInput) => api.createListing(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listingKeys.all });
    },
  });
};
