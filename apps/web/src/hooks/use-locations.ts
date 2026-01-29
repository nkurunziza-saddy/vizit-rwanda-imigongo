import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";

// Query keys for locations
export const locationKeys = {
  all: ["locations"] as const,
  lists: () => [...locationKeys.all, "list"] as const,
  detail: (id: number) => [...locationKeys.all, "detail", id] as const,
};

// Hook to get all locations
export const useLocations = () => {
  return useQuery({
    queryKey: locationKeys.lists(),
    queryFn: () => api.getLocations(),
  });
};

// Hook to get a single location by ID
export const useLocation = (id: number) => {
  return useQuery({
    queryKey: locationKeys.detail(id),
    queryFn: () => api.getLocation(id),
    enabled: !!id,
  });
};
