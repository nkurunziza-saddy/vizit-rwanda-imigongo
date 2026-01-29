import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import type { Vendor, User } from "@/utils/mock-db";

// Query keys for admin
export const adminKeys = {
  all: ["admin"] as const,
  dashboard: () => [...adminKeys.all, "dashboard"] as const,
  pendingVendors: () => [...adminKeys.all, "vendors", "pending"] as const,
  users: () => [...adminKeys.all, "users"] as const,
};

// Hook to get admin dashboard stats
export const useAdminDashboard = () => {
  return useQuery({
    queryKey: adminKeys.dashboard(),
    queryFn: () =>
      api.getAdminDashboard() as Promise<{
        totalUsers: number;
        totalVendors: number;
        totalBookings: number;
        pendingVendors: number;
      }>,
  });
};

// Hook to get pending vendors
export const usePendingVendors = () => {
  return useQuery({
    queryKey: adminKeys.pendingVendors(),
    queryFn: () => api.getPendingVendors() as Promise<Vendor[]>,
  });
};

// Hook to approve/reject a vendor
export const useApproveVendor = () => {
  const queryClient = useQueryClient();

  return useMutation<Vendor, Error, { vendorId: number; approved: boolean }>({
    mutationFn: ({ vendorId, approved }) =>
      api.approveVendor(vendorId, approved) as Promise<Vendor>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.pendingVendors() });
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() });
    },
  });
};

// Hook to get all users (admin only)
export const useAdminUsers = () => {
  return useQuery({
    queryKey: adminKeys.users(),
    queryFn: () => api.getAdminUsers() as Promise<User[]>,
  });
};
