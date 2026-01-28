import { useMutation } from "@tanstack/react-query";
import { login, register } from "@/actions/auth.actions";
import { User } from "@/utils/mock-db";

export const useLogin = () => {
	return useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			login(email, password),
	});
};

export const useRegister = () => {
	return useMutation({
		mutationFn: (
			data: Omit<User, "id" | "created_at" | "role"> & { role?: User["role"] },
		) => register(data),
	});
};
