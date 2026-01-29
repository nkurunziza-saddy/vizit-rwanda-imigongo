import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import type { LoginInput, RegisterInput, User } from "@/schemas";

// Query keys for auth
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

// Hook to get current user
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => api.me(),
    retry: false,
  });
};

// Hook to login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<{ user: User; token: string }, Error, LoginInput>({
    mutationFn: (data: LoginInput) =>
      api.login(data) as Promise<{ user: User; token: string }>,
    onSuccess: (data) => {
      // Store user in localStorage for persistence
      if (data.user) {
        localStorage.setItem("vizit_current_user", JSON.stringify(data.user));
      }
      queryClient.setQueryData(authKeys.user(), data.user);
    },
  });
};

// Hook to register
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation<{ user: User; token: string }, Error, RegisterInput>({
    mutationFn: (data: RegisterInput) =>
      api.register(data) as Promise<{ user: User; token: string }>,
    onSuccess: (data) => {
      if (data.user) {
        localStorage.setItem("vizit_current_user", JSON.stringify(data.user));
      }
      queryClient.setQueryData(authKeys.user(), data.user);
    },
  });
};

// Hook to logout
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.logout(),
    onSuccess: () => {
      localStorage.removeItem("vizit_current_user");
      localStorage.removeItem("vizit_auth_token");
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.invalidateQueries();
    },
  });
};
