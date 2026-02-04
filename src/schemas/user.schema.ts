import { z } from "zod";

export const userRoleSchema = z.enum(["tourist", "vendor", "admin"]);

export const userSchema = z.object({
	id: z.number(),
	fullName: z.string(),
	email: z.string().email(),
	phone: z.string(),
	role: userRoleSchema,
	preferredCurrency: z.string().default("USD"),
	isActive: z.boolean().default(true),
	createdAt: z.string().datetime(),
});

export const loginSchema = z.object({
	email: z.string().email("Please enter a valid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
	.object({
		fullName: z.string().min(2, "Name must be at least 2 characters"),
		email: z.string().email("Please enter a valid email"),
		phone: z.string().min(10, "Please enter a valid phone number"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string(),
		role: userRoleSchema.default("tourist"),
		preferredCurrency: z.string().default("USD"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const updateProfileSchema = z.object({
	fullName: z.string().min(2).optional(),
	email: z.string().email().optional(),
	phone: z.string().optional(),
	preferredCurrency: z.string().optional(),
});

export const changePasswordSchema = z
	.object({
		currentPassword: z.string(),
		newPassword: z.string().min(6, "Password must be at least 6 characters"),
		confirmNewPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "Passwords do not match",
		path: ["confirmNewPassword"],
	});

export type UserRole = z.infer<typeof userRoleSchema>;
export type User = z.infer<typeof userSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
