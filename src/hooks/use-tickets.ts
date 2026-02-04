import { useMutation, useQuery } from "@tanstack/react-query";
import type { Booking, Ticket, TicketValidationResponse } from "@/types";

/**
 * Ticket Hooks
 *
 * React Query hooks for ticket operations.
 * Provides ticket generation, validation, and PDF download functionality.
 */

interface GenerateTicketParams {
	booking: Booking;
	userName: string;
	userEmail: string;
	vendorName: string;
}

interface ValidateTicketParams {
	ticketId: string;
	validationHash: string;
	bookingId: string;
	userId: string;
	issuedAt: string;
}

/**
 * Hook to generate a digital ticket
 */
export function useGenerateTicket() {
	return useMutation<Ticket, Error, GenerateTicketParams>({
		mutationFn: async (params) => {
			const response = await fetch("/api/tickets/generate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(params),
			});

			if (!response.ok) {
				throw new Error("Failed to generate ticket");
			}

			return response.json();
		},
	});
}

/**
 * Hook to validate a ticket (for QR code scanning)
 */
export function useValidateTicket() {
	return useMutation<TicketValidationResponse, Error, ValidateTicketParams>({
		mutationFn: async (params) => {
			const response = await fetch("/api/tickets/validate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(params),
			});

			if (!response.ok) {
				throw new Error("Failed to validate ticket");
			}

			return response.json();
		},
	});
}

/**
 * Hook to download ticket as PDF
 */
export function useDownloadTicketPdf() {
	return useMutation<{ pdfBase64: string }, Error, Ticket>({
		mutationFn: async (ticket) => {
			const response = await fetch("/api/tickets/pdf", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(ticket),
			});

			if (!response.ok) {
				throw new Error("Failed to generate PDF");
			}

			return response.json();
		},
	});
}

/**
 * Hook to get user's tickets
 * Uses the API client to fetch from backend or mock
 */
export function useUserTickets(userId: string) {
	return useQuery({
		queryKey: ["tickets", "user", userId],
		queryFn: async (): Promise<Ticket[]> => {
			// For now, return empty array - will be implemented when backend is ready
			// In production, this would call the API client
			return [];
		},
		enabled: !!userId,
	});
}

/**
 * Helper function to trigger PDF download
 */
export function downloadTicketPdf(pdfBase64: string, filename: string) {
	const byteCharacters = atob(pdfBase64);
	const byteNumbers = new Array(byteCharacters.length);

	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}

	const byteArray = new Uint8Array(byteNumbers);
	const blob = new Blob([byteArray], { type: "application/pdf" });

	const url = window.URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	window.URL.revokeObjectURL(url);
}
