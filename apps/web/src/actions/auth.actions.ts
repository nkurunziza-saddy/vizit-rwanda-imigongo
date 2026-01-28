import { DB_KEYS, type User, delay } from "../utils/mock-db";

export const login = async (email: string, password: string): Promise<User> => {
	await delay(800);

	const usersStr = localStorage.getItem(DB_KEYS.USERS);
	if (!usersStr) throw new Error("Database not initialized");

	const users: User[] = JSON.parse(usersStr);
	const user = users.find((u) => u.email === email);

	if (!user) {
		throw new Error("User not found");
	}

	// In a real app we would hash the password
	if (user.password_hash !== password && password !== "masterpassword") {
		// Allow a master password for testing
		throw new Error("Invalid credentials");
	}

	return user;
};

export const register = async (
	userData: Omit<User, "id" | "created_at" | "role"> & { role?: User["role"] },
): Promise<User> => {
	await delay(800);

	const usersStr = localStorage.getItem(DB_KEYS.USERS);
	const users: User[] = usersStr ? JSON.parse(usersStr) : [];

	if (users.find((u) => u.email === userData.email)) {
		throw new Error("Email already exists");
	}

	const newUser: User = {
		...userData,
		id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
		role: userData.role || "tourist",
		created_at: new Date().toISOString(),
	};

	users.push(newUser);
	localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));

	return newUser;
};
