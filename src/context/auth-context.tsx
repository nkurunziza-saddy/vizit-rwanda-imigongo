import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
	login as loginAction,
	register as registerAction,
} from "@/actions/auth.actions";
import type { RegisterInput, User } from "@/types";

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (data: RegisterInput) => Promise<void>;
	logout: () => void;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const storedUser = localStorage.getItem("vizit_current_user");
		if (storedUser) {
			try {
				setUser(JSON.parse(storedUser));
			} catch (e) {
				console.error("Failed to parse stored user", e);
				localStorage.removeItem("vizit_current_user");
			}
		}
		setIsLoading(false);
	}, []);

	const login = async (email: string, password: string) => {
		setIsLoading(true);
		try {
			const user = await loginAction(email, password);
			setUser(user);
			localStorage.setItem("vizit_current_user", JSON.stringify(user));
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (data: RegisterInput) => {
		setIsLoading(true);
		try {
			const user = await registerAction(data);
			setUser(user);
			localStorage.setItem("vizit_current_user", JSON.stringify(user));
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("vizit_current_user");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				login,
				register,
				logout,
				isAuthenticated: !!user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
