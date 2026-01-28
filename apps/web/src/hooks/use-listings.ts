import { useQuery } from "@tanstack/react-query";
import {
	getListingById,
	getListings,
	searchListings,
} from "@/actions/listing.actions";

export const useListings = () => {
	return useQuery({
		queryKey: ["listings"],
		queryFn: getListings,
	});
};

export const useListing = (id?: number) => {
	return useQuery({
		queryKey: ["listings", id],
		queryFn: () => getListingById(id!),
		enabled: !!id,
	});
};

export const useSearchListings = (query: string) => {
	return useQuery({
		queryKey: ["listings", "search", query],
		queryFn: () => searchListings(query),
		enabled: !!query,
	});
};
