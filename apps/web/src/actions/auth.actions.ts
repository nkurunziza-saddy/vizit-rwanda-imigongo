import { DB_KEYS, delay } from "../utils/mock-db";
import type { User } from "@/types";

// DB User type (snake_case from mock-db)
type DBUser = {
  id: number;
  full_name: string;
  email: string;
  password_hash: string;
  phone: string;
  role: "tourist" | "vendor" | "admin";
  preferred_currency: string;
  created_at: string;
};

// Helper to map DB user to schema user
const mapDBUserToUser = (dbUser: DBUser): User => ({
  id: dbUser.id,
  fullName: dbUser.full_name,
  email: dbUser.email,
  phone: dbUser.phone,
  role: dbUser.role,
  preferredCurrency: dbUser.preferred_currency,
  isActive: true,
  createdAt: dbUser.created_at,
});

export const login = async (email: string, password: string): Promise<User> => {
  await delay(800);

  const usersStr = localStorage.getItem(DB_KEYS.USERS);
  if (!usersStr) throw new Error("Database not initialized");

  const users: DBUser[] = JSON.parse(usersStr);
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error("User not found");
  }

  // In a real app we would hash the password
  if (user.password_hash !== password && password !== "masterpassword") {
    // Allow a master password for testing
    throw new Error("Invalid credentials");
  }

  return mapDBUserToUser(user);
};

export const register = async (
  userData: Omit<User, "id" | "createdAt" | "role" | "isActive"> & {
    password: string;
    confirmPassword: string;
  },
): Promise<User> => {
  await delay(800);

  const usersStr = localStorage.getItem(DB_KEYS.USERS);
  const users: DBUser[] = usersStr ? JSON.parse(usersStr) : [];

  if (users.find((u) => u.email === userData.email)) {
    throw new Error("Email already exists");
  }

  const newUser: DBUser = {
    full_name: userData.fullName,
    email: userData.email,
    phone: userData.phone,
    password_hash: userData.password,
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    role: "tourist",
    preferred_currency: "USD",
    created_at: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));

  return mapDBUserToUser(newUser);
};
