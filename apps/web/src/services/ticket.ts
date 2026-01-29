import QRCode from "qrcode";
import type { Booking } from "@/schemas/booking.schema";
import type { Ticket } from "@/schemas/ticket.schema";

/**
 * Ticket Service
 *
 * Handles digital ticket generation including:
 * - QR code generation with validation hash
 * - Ticket data structure creation
 * - Ticket validation
 */

// Secret key for HMAC validation (in production, use environment variable)
const TICKET_SECRET =
  process.env.TICKET_SECRET || "vizit-africa-ticket-secret-2024";

/**
 * Generate HMAC validation hash for ticket security
 * This ensures tickets cannot be forged
 */
async function generateValidationHash(
  bookingId: string,
  userId: string,
  timestamp: string,
): Promise<string> {
  const data = `${bookingId}:${userId}:${timestamp}`;
  const encoder = new TextEncoder();
  const keyData = encoder.encode(TICKET_SECRET);
  const messageData = encoder.encode(data);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Generate QR code data URL
 */
async function generateQRCode(data: string): Promise<string> {
  return QRCode.toDataURL(data, {
    width: 400,
    margin: 2,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });
}

/**
 * Generate ticket data from booking
 */
export async function generateTicket(
  booking: Booking,
  userName: string,
  userEmail: string,
  vendorName: string,
): Promise<Ticket> {
  const issuedAt = new Date().toISOString();
  const expiresAt = new Date(
    Date.now() + 365 * 24 * 60 * 60 * 1000,
  ).toISOString(); // 1 year validity

  // Generate unique ticket ID
  const ticketId = `T-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Generate validation hash
  const validationHash = await generateValidationHash(
    String(booking.id),
    String(booking.userId),
    issuedAt,
  );

  // Create QR code data (contains ticket info for scanning)
  const qrCodePayload = JSON.stringify({
    ticketId,
    bookingId: booking.id,
    bookingRef: booking.bookingReference,
    userId: booking.userId,
    listingTitle: booking.items[0]?.listingTitle || "Unknown",
    startDate: booking.items[0]?.startDate,
    endDate: booking.items[0]?.endDate,
    hash: validationHash,
  });

  // Generate QR code image
  const qrCodeImage = await generateQRCode(qrCodePayload);

  const firstItem = booking.items[0];

  return {
    id: ticketId,
    bookingId: String(booking.id),
    bookingReference: booking.bookingReference,
    userId: String(booking.userId),
    userName,
    userEmail,
    listingTitle: firstItem?.listingTitle || "Unknown Listing",
    listingType: firstItem?.listingType || "hotel_room",
    vendorName,
    startDate: firstItem?.startDate || issuedAt,
    endDate: firstItem?.endDate || issuedAt,
    quantity: firstItem?.quantity || 1,
    unitPrice: firstItem?.unitPrice || 0,
    totalAmount: booking.totalAmount,
    currency: booking.currency,
    qrCodeData: qrCodePayload,
    qrCodeImage,
    issuedAt,
    expiresAt,
    status: "active",
    validationHash,
  };
}

/**
 * Validate a ticket from QR code scan
 */
export async function validateTicket(
  _ticketId: string,
  validationHash: string,
  expectedBookingId: string,
  expectedUserId: string,
  issuedAt: string,
): Promise<{ valid: boolean; message: string }> {
  // Regenerate hash to verify
  const expectedHash = await generateValidationHash(
    expectedBookingId,
    expectedUserId,
    issuedAt,
  );

  if (expectedHash !== validationHash) {
    return { valid: false, message: "Invalid ticket signature" };
  }

  // Check if ticket is expired
  const expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  if (new Date() > expiryDate) {
    return { valid: false, message: "Ticket has expired" };
  }

  return { valid: true, message: "Ticket is valid" };
}

/**
 * Format ticket for PDF generation
 */
export function formatTicketForDisplay(ticket: Ticket): {
  title: string;
  reference: string;
  dateRange: string;
  guestInfo: string;
  vendorInfo: string;
  price: string;
  issuedDate: string;
} {
  const startDate = new Date(ticket.startDate).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const endDate = new Date(ticket.endDate).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const issuedDate = new Date(ticket.issuedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    title: ticket.listingTitle,
    reference: ticket.bookingReference,
    dateRange: `${startDate} - ${endDate}`,
    guestInfo: `${ticket.userName} (${ticket.quantity} ${ticket.quantity === 1 ? "guest" : "guests"})`,
    vendorInfo: ticket.vendorName,
    price: `${ticket.currency} ${ticket.totalAmount.toFixed(2)}`,
    issuedDate,
  };
}
