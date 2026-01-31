import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { useState } from "react";
import type { Vendor, VendorStatus } from "@/schemas/vendor.schema";

interface VendorApprovalCardProps {
  vendor: Vendor;
  onApprove: (vendorId: string, commissionRate: number) => void;
  onReject: (vendorId: string, reason: string) => void;
}

const statusColors: Record<VendorStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  under_review: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  suspended: "bg-gray-100 text-gray-800",
};

const statusIcons: Record<VendorStatus, React.ReactNode> = {
  pending: <Clock className="h-4 w-4" />,
  under_review: <FileText className="h-4 w-4" />,
  approved: <CheckCircle className="h-4 w-4" />,
  rejected: <XCircle className="h-4 w-4" />,
  suspended: <XCircle className="h-4 w-4" />,
};

export function VendorApprovalCard({
  vendor,
  onApprove,
  onReject,
}: VendorApprovalCardProps) {
  const [commissionRate, setCommissionRate] = useState(10);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const handleApprove = () => {
    onApprove(vendor.id, commissionRate);
    setIsApproveDialogOpen(false);
  };

  const handleReject = () => {
    onReject(vendor.id, rejectionReason);
    setIsRejectDialogOpen(false);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary">
                {vendor.businessName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{vendor.businessName}</CardTitle>
              <p className="text-sm text-muted-foreground capitalize">
                {vendor.vendorType.replace("_", " ")}
              </p>
            </div>
          </div>
          <Badge
            className={`${statusColors[vendor.status]} flex items-center gap-1`}
          >
            {statusIcons[vendor.status]}
            {vendor.status.replace("_", " ")}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{vendor.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{vendor.phone}</span>
          </div>
          {vendor.address && (
            <div className="flex items-center gap-2 text-sm md:col-span-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{vendor.address}</span>
            </div>
          )}
        </div>

        <Separator />

        {vendor.bio && (
          <div>
            <h4 className="text-sm font-medium mb-2">About</h4>
            <p className="text-sm text-muted-foreground">{vendor.bio}</p>
          </div>
        )}

        {vendor.bankAccountName && (
          <>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Bank Details</h4>
              <div className="text-sm space-y-1">
                <p>
                  <span className="text-muted-foreground">Account Name:</span>{" "}
                  {vendor.bankAccountName}
                </p>
                <p>
                  <span className="text-muted-foreground">Bank:</span>{" "}
                  {vendor.bankName}
                </p>
                <p>
                  <span className="text-muted-foreground">Account:</span> ****
                  {vendor.bankAccountNumber?.slice(-4)}
                </p>
              </div>
            </div>
          </>
        )}

        {vendor.status === "pending" || vendor.status === "under_review" ? (
          <div className="flex gap-3 pt-4">
            <Dialog
              open={isApproveDialogOpen}
              onOpenChange={setIsApproveDialogOpen}
            >
              <DialogTrigger>
                <Button className="flex-1" variant="default">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Approve Vendor</DialogTitle>
                  <DialogDescription>
                    Set the commission rate for this vendor before approving.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="commission">Commission Rate (%)</Label>
                  <Input
                    id="commission"
                    type="number"
                    min={0}
                    max={100}
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(Number(e.target.value))}
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsApproveDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleApprove}>Approve Vendor</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isRejectDialogOpen}
              onOpenChange={setIsRejectDialogOpen}
            >
              <DialogTrigger>
                <Button className="flex-1" variant="destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reject Vendor</DialogTitle>
                  <DialogDescription>
                    Please provide a reason for rejecting this vendor
                    application.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="reason">Rejection Reason</Label>
                  <Input
                    id="reason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="e.g., Incomplete documentation"
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsRejectDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleReject}>
                    Reject Vendor
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ) : vendor.status === "approved" ? (
          <div className="pt-4">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>
                Approved on{" "}
                {new Date(vendor.approvedAt || "").toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Commission Rate: {vendor.commissionRate}%
            </p>
          </div>
        ) : vendor.status === "rejected" ? (
          <div className="pt-4">
            <div className="flex items-center gap-2 text-sm text-red-600">
              <XCircle className="h-4 w-4" />
              <span>Rejected</span>
            </div>
            {vendor.rejectionReason && (
              <p className="text-sm text-muted-foreground mt-1">
                Reason: {vendor.rejectionReason}
              </p>
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default VendorApprovalCard;
