import { z } from "zod";

/**
 * Notification Schema
 *
 * Handles user notifications for various events
 */

export const notificationTypeSchema = z.enum([
  "booking_confirmed",
  "booking_cancelled",
  "payment_received",
  "payment_failed",
  "vendor_approved",
  "vendor_rejected",
  "new_message",
  "system",
]);

export const notificationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: notificationTypeSchema,
  title: z.string(),
  message: z.string(),
  data: z.record(z.string(), z.any()).optional(), // Additional data like bookingId, etc.
  isRead: z.boolean().default(false),
  createdAt: z.string(),
  readAt: z.string().optional(),
});

// Schema for creating a notification
export const createNotificationSchema = z.object({
  userId: z.string(),
  type: notificationTypeSchema,
  title: z.string().min(1),
  message: z.string().min(1),
  data: z.record(z.string(), z.any()).optional(),
});

// Schema for notification filters
export const notificationFiltersSchema = z.object({
  isRead: z.boolean().optional(),
  type: notificationTypeSchema.optional(),
  page: z.number().default(1),
  perPage: z.number().default(20),
});

export type Notification = z.infer<typeof notificationSchema>;
export type NotificationType = z.infer<typeof notificationTypeSchema>;
export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type NotificationFilters = z.infer<typeof notificationFiltersSchema>;
