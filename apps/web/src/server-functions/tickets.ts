import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateTicket, validateTicket } from "@/services/ticket";
import { bookingSchema } from "@/schemas/booking.schema";
import type { Ticket, TicketValidationResponse } from "@/schemas/ticket.schema";

/**
 * Ticket Server Functions
 *
 * Server-side functions for ticket generation and validation.
 * Uses TanStack Start's server functions for secure operations.
 */

// Input schema for generating tickets
const generateTicketInputSchema = z.object({
  booking: bookingSchema,
  userName: z.string(),
  userEmail: z.string().email(),
  vendorName: z.string(),
});

// Input schema for validating tickets
const validateTicketInputSchema = z.object({
  ticketId: z.string(),
  validationHash: z.string(),
  bookingId: z.string(),
  userId: z.string(),
  issuedAt: z.string(),
});

/**
 * Generate a digital ticket for a booking
 * This creates a PDF-ready ticket with QR code
 */
export const generateTicketFn = createServerFn({
  method: "POST",
}).handler(async (ctx: any) => {
  const body = (await ctx.request.json()) as z.infer<
    typeof generateTicketInputSchema
  >;

  try {
    const ticket = await generateTicket(
      body.booking,
      body.userName,
      body.userEmail,
      body.vendorName,
    );

    // In production, you would:
    // 1. Save ticket to database
    // 2. Send email with ticket PDF
    // 3. Store QR code validation hash

    return ticket;
  } catch (error) {
    console.error("Failed to generate ticket:", error);
    throw new Error("Failed to generate ticket");
  }
});

/**
 * Validate a ticket from QR code scan
 * Used by vendors/admin to verify ticket authenticity
 */
export const validateTicketFn = createServerFn({
  method: "POST",
}).handler(async (ctx: any) => {
  const body = (await ctx.request.json()) as z.infer<
    typeof validateTicketInputSchema
  >;

  try {
    const result = await validateTicket(
      body.ticketId,
      body.validationHash,
      body.bookingId,
      body.userId,
      body.issuedAt,
    );

    return {
      valid: result.valid,
      message: result.message,
    } as TicketValidationResponse;
  } catch (error) {
    console.error("Failed to validate ticket:", error);
    return {
      valid: false,
      message: "Validation failed",
    } as TicketValidationResponse;
  }
});

/**
 * Generate ticket PDF blob
 * Returns PDF as base64 string for download/email
 */
export const generateTicketPdfFn = createServerFn({
  method: "POST",
}).handler(async (ctx: any) => {
  const body = (await ctx.request.json()) as Ticket;

  try {
    // Dynamic import to avoid bundling @react-pdf/renderer on client
    const { renderToBuffer } = await import("@react-pdf/renderer");
    const { TicketPDF } = await import("@/components/ticket/ticket-pdf");

    const pdfBuffer = await renderToBuffer(TicketPDF({ ticket: body }));
    const pdfBase64 = pdfBuffer.toString("base64");

    return { pdfBase64 };
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    throw new Error("Failed to generate ticket PDF");
  }
});
