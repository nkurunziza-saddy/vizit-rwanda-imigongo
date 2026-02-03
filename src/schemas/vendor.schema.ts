import { z } from "zod";

export const vendorTypeSchema = z.enum([
  "hotel",
  "bnb",
  "car_rental",
  "guide",
  "tour_operator",
]);

export const vendorStatusSchema = z.enum([
  "pending",
  "under_review",
  "approved",
  "rejected",
  "suspended",
]);

export const vendorSchema = z.object({
  id: z.string(),
  userId: z.string(),
  businessName: z.string().min(2, "Business name is required"),
  vendorType: vendorTypeSchema,
  bio: z.string().optional(),
  email: z.email(),
  phone: z.string(),
  address: z.string().optional(),
  website: z.string().url().optional(),
  logoUrl: z.string().optional(),

  status: vendorStatusSchema.default("pending"),
  isApproved: z.boolean().default(false),
  approvedBy: z.string().optional(),
  approvedAt: z.string().optional(),
  rejectionReason: z.string().optional(),

  bankAccountName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankName: z.string().optional(),
  bankSwiftCode: z.string().optional(),

  commissionRate: z.number().min(0).max(100).default(10),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export const vendorRegistrationSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  vendorType: vendorTypeSchema,
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  email: z.email("Valid email is required"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().optional(),
  website: z.url().optional(),
});

export const vendorApprovalSchema = z.object({
  vendorId: z.string(),
  action: z.enum(["approve", "reject"]),
  reason: z.string().optional(),
  commissionRate: z.number().min(0).max(100).optional(),
});

export const vendorBankDetailsSchema = z.object({
  vendorId: z.string(),
  bankAccountName: z.string().min(2),
  bankAccountNumber: z.string().min(5),
  bankName: z.string().min(2),
  bankSwiftCode: z.string().optional(),
});

export const vendorFiltersSchema = z.object({
  status: vendorStatusSchema.optional(),
  vendorType: vendorTypeSchema.optional(),
  search: z.string().optional(),
  page: z.number().default(1),
  perPage: z.number().default(10),
});

export type Vendor = z.infer<typeof vendorSchema>;
export type VendorType = z.infer<typeof vendorTypeSchema>;
export type VendorStatus = z.infer<typeof vendorStatusSchema>;
export type VendorRegistrationInput = z.infer<typeof vendorRegistrationSchema>;
export type VendorApprovalInput = z.infer<typeof vendorApprovalSchema>;
export type VendorBankDetailsInput = z.infer<typeof vendorBankDetailsSchema>;
export type VendorFilters = z.infer<typeof vendorFiltersSchema>;
