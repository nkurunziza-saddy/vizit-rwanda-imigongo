import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, QrCode, Calendar, Users, CheckCircle } from "lucide-react";
import { useDownloadTicketPdf, downloadTicketPdf } from "@/hooks/use-tickets";
import type { Ticket } from "@/schemas/ticket.schema";

interface TicketCardProps {
  ticket: Ticket;
  showDownload?: boolean;
  showValidation?: boolean;
}

export function TicketCard({
  ticket,
  showDownload = true,
  showValidation = false,
}: TicketCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadMutation = useDownloadTicketPdf();

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const result = await downloadMutation.mutateAsync(ticket);
      downloadTicketPdf(
        result.pdfBase64,
        `ticket-${ticket.bookingReference}.pdf`,
      );
    } catch (error) {
      console.error("Failed to download ticket:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: Ticket["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "used":
        return "bg-blue-100 text-blue-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold">
              {ticket.listingTitle}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1 capitalize">
              {ticket.listingType.replace("_", " ")}
            </p>
          </div>
          <Badge className={getStatusColor(ticket.status)}>
            {ticket.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Dates</p>
                <p className="font-medium">
                  {formatDate(ticket.startDate)} - {formatDate(ticket.endDate)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Guests</p>
                <p className="font-medium">
                  {ticket.quantity} {ticket.quantity === 1 ? "guest" : "guests"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Booking Reference
                </p>
                <p className="font-medium font-mono">
                  {ticket.bookingReference}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">Total Paid</p>
              <p className="text-2xl font-bold text-primary">
                {ticket.currency} {ticket.totalAmount.toFixed(2)}
              </p>
            </div>

            {showDownload && (
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                {isDownloading ? "Generating PDF..." : "Download Ticket"}
              </Button>
            )}
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
            {ticket.qrCodeImage ? (
              <>
                <img
                  src={ticket.qrCodeImage}
                  alt="Ticket QR Code"
                  className="w-48 h-48 object-contain mb-4"
                />
                <p className="text-sm text-muted-foreground text-center">
                  Scan to validate
                </p>
              </>
            ) : (
              <div className="w-48 h-48 flex items-center justify-center bg-muted rounded-lg mb-4">
                <QrCode className="h-16 w-16 text-muted-foreground" />
              </div>
            )}

            {showValidation && (
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">Ticket ID</p>
                <p className="text-xs font-mono">{ticket.id}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TicketCard;
