import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { Ticket } from "@/schemas/ticket.schema";

/**
 * Ticket PDF Component
 *
 * Generates a professional PDF ticket with QR code for validation.
 * Uses @react-pdf/renderer for server-side PDF generation.
 */

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: "2px solid #16a34a",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#16a34a",
  },
  ticketLabel: {
    fontSize: 14,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  mainContent: {
    flexDirection: "row",
    marginBottom: 30,
  },
  leftColumn: {
    flex: 2,
    paddingRight: 30,
  },
  rightColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listingTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1a1a1a",
  },
  listingType: {
    fontSize: 12,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  sectionValue: {
    fontSize: 14,
    color: "#1a1a1a",
    fontWeight: "medium",
  },
  dateRange: {
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "bold",
  },
  qrCode: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  qrLabel: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    paddingTop: 20,
    borderTop: "1px solid #e5e5e5",
  },
  detailItem: {
    width: "50%",
    marginBottom: 15,
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: "2px solid #16a34a",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    alignItems: "flex-end",
  },
  reference: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  referenceValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1a1a1a",
    fontFamily: "Courier",
  },
  totalSection: {
    alignItems: "flex-end",
  },
  totalLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16a34a",
  },
  terms: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#f9fafb",
    borderRadius: 4,
  },
  termsTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  termsText: {
    fontSize: 9,
    color: "#999",
    lineHeight: 1.5,
  },
  watermark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-45deg)",
    fontSize: 60,
    color: "rgba(22, 163, 74, 0.05)",
    fontWeight: "bold",
    letterSpacing: 10,
  },
});

interface TicketPDFProps {
  ticket: Ticket;
}

export function TicketPDF({ ticket }: TicketPDFProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Text style={styles.watermark}>VIZIT</Text>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Vizit Africa</Text>
          <Text style={styles.ticketLabel}>E-Ticket</Text>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Left Column - Details */}
          <View style={styles.leftColumn}>
            <Text style={styles.listingTitle}>{ticket.listingTitle}</Text>
            <Text style={styles.listingType}>
              {ticket.listingType.replace("_", " ")}
            </Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Guest</Text>
              <Text style={styles.sectionValue}>
                {ticket.userName} ({ticket.quantity}{" "}
                {ticket.quantity === 1 ? "guest" : "guests"})
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dates</Text>
              <Text style={styles.dateRange}>
                {formatDate(ticket.startDate)} - {formatDate(ticket.endDate)}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Vendor</Text>
              <Text style={styles.sectionValue}>{ticket.vendorName}</Text>
            </View>

            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.sectionTitle}>Ticket ID</Text>
                <Text style={styles.sectionValue}>{ticket.id}</Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.sectionTitle}>Issued</Text>
                <Text style={styles.sectionValue}>
                  {formatDateTime(ticket.issuedAt)}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.sectionTitle}>Status</Text>
                <Text
                  style={[
                    styles.sectionValue,
                    {
                      color: ticket.status === "active" ? "#16a34a" : "#dc2626",
                    },
                  ]}
                >
                  {ticket.status.toUpperCase()}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.sectionTitle}>Email</Text>
                <Text style={styles.sectionValue}>{ticket.userEmail}</Text>
              </View>
            </View>
          </View>

          {/* Right Column - QR Code */}
          <View style={styles.rightColumn}>
            {ticket.qrCodeImage && (
              <Image src={ticket.qrCodeImage} style={styles.qrCode} />
            )}
            <Text style={styles.qrLabel}>Scan to validate</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.reference}>Booking Reference</Text>
            <Text style={styles.referenceValue}>{ticket.bookingReference}</Text>
          </View>

          <View style={styles.footerRight}>
            <View style={styles.totalSection}>
              <Text style={styles.totalLabel}>Total Paid</Text>
              <Text style={styles.totalValue}>
                {ticket.currency} {ticket.totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Terms */}
        <View style={styles.terms}>
          <Text style={styles.termsTitle}>Important Information</Text>
          <Text style={styles.termsText}>
            This e-ticket is valid only for the named guest and specified dates.
            Please present this ticket along with a valid ID at check-in. The QR
            code can be scanned for verification. For assistance, contact
            support@vizit-africa.com or call +250 788 123 456. Cancellation
            policies apply as per booking terms.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default TicketPDF;
