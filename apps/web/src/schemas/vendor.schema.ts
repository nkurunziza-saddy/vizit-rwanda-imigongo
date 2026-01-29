import { z } from "zod";

/**
 * Vendor Schema
 *
 * Based on db-structure.md vendors table
 * Handles vendor registration, approval workflow, and management
 */

export const vendorTypeSchema = z.enum([
  "hotel",
  "bnb",
  "car_rental",
  "guide",
  "tour_operator",
]);

export const vendorStatusSchema = z.enum([
  "pending", // Application submitted, awaiting review
  "under_review", // Admin is reviewing documents
  "approved", // Approved and can list
  "rejected", // Rejected with reason
  "suspended", // Temporarily suspended
]);

export const vendorDocumentSchema = z.object({
  id: z.string(),
  vendorId: z.string(),
  documentType: z.enum([
    "business_registration",
    "tax_certificate",
    "identity_proof",
    "insurance",
    "license",
    "other",
  ]),
  fileName: z.string(),
  fileUrl: z.string(),
  uploadedAt: z.string(),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
  reviewedBy: z.string().optional(),
  reviewedAt: z.string().optional(),
  rejectionReason: z.string().optional(),
});

export const vendorSchema = z.object({
  id: z.string(),
  userId: z.string(),
  businessName: z.string().min(2, "Business name is required"),
  vendorType: vendorTypeSchema,
  bio: z.string().optional(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string().optional(),
  website: z.string().url().optional(),
  logoUrl: z.string().optional(),

  // Status and approval
  status: vendorStatusSchema.default("pending"),
  isApproved: z.boolean().default(false),
  approvedBy: z.string().optional(),
  approvedAt: z.string().optional(),
  rejectionReason: z.string().optional(),

  // Documents
  documents: z.array(vendorDocumentSchema).default([]),

  // Banking info for payouts
  bankAccountName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankName: z.string().optional(),
  bankSwiftCode: z.string().optional(),

  // Commission rate (set by admin)
  commissionRate: z.number().min(0).max(100).default(10),

  // Timestamps
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Schema for vendor registration
export const vendorRegistrationSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  vendorType: vendorTypeSchema,
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().optional(),
  website: z.string().url().optional(),
});

// Schema for vendor approval/rejection
export const vendorApprovalSchema = z.object({
  vendorId: z.string(),
  action: z.enum(["approve", "reject"]),
  reason: z.string().optional(),
  commissionRate: z.number().min(0).max(100).optional(),
});

// Schema for vendor document upload
export const vendorDocumentUploadSchema = z.object({
  vendorId: z.string(),
  documentType: vendorDocumentSchema.shape.documentType,
  file: z.instanceof(File),
});

// Schema for vendor bank details
export const vendorBankDetailsSchema = z.object({
  vendorId: z.string(),
  bankAccountName: z.string().min(2),
  bankAccountNumber: z.string().min(5),
  bankName: z.string().min(2),
  bankSwiftCode: z.string().optional(),
});

// Schema for vendor filters (admin)
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
export type VendorDocument = z.infer<typeof vendorDocumentSchema>;
export type VendorRegistrationInput = z.infer<typeof vendorRegistrationSchema>;
export type VendorApprovalInput = z.infer<typeof vendorApprovalSchema>;
export type VendorDocumentUploadInput = z.infer<
  typeof vendorDocumentUploadSchema
>;
export type VendorBankDetailsInput = z.infer<typeof vendorBankDetailsSchema>;
export type VendorFilters = z.infer<typeof vendorFiltersSchema>;
