import { useQuery } from "@tanstack/react-query";
import { getLocations } from "@/actions/location.actions";

export const useLocations = () => {
	return useQuery({
		queryKey: ["locations"],
		queryFn: getLocations,
	});
};
